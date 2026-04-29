/**
 * Catalog service: chama o backend Product-Pilot e adapta para a shape do site.
 * Fallback para mock-data quando a API falha (dev sem backend, etc.).
 *
 * Re-exporta tipos e dados legacy de mock-data para minimizar churn nas páginas.
 * Páginas novas devem usar as funções async (getCatalog, getProduct, ...).
 */

import { apiGetSafe } from './api'
import type { PLProduct, PLBundle } from './api-types'
import {
  products as mockProducts,
  bundles as mockBundles,
  collections as mockCollections,
  type Product,
  type Bundle,
  type Material,
  type SockType,
  type Pattern,
  type Size,
  type Gender,
} from './mock-data'
import { getFamilyByTag, type FamilySlug } from './families'
import { getColorHex } from './color-map'

// ─── Re-exports de tipos / constantes (compat com pages legacy) ──────────
export type { Product, Bundle, Material, SockType, Pattern, Size, Gender }
export const collections = mockCollections

// ─── Adapters: PL shape → site shape ──────────────────────────

const TYPE_TAG_TO_PATTERN: Record<string, Product['pattern']> = {
  plain: 'solid', liso: 'solid',
  rib: 'ribbed', canelado: 'ribbed',
  dots: 'pin-dot', 'pin-check': 'pin-dot',
  argyle: 'argyle',
  paisley: 'riscas',
  herringbone: 'herringbone',
}

function extractPattern(tags: string[]): Product['pattern'] {
  for (const t of tags) if (TYPE_TAG_TO_PATTERN[t]) return TYPE_TAG_TO_PATTERN[t]
  return 'solid'
}

function extractType(tags: string[]): Product['type'] {
  if (tags.includes('high-knee') || tags.includes('over-calf') || tags.includes('cano-alto')) return 'over-the-calf'
  if (tags.includes('no-show') || tags.includes('invisivel')) return 'no-show'
  return 'mid-calf'
}

function stripHtml(html: string | null): string {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}

function adaptPLProduct(p: PLProduct): Product {
  const sizes = Array.from(new Set((p.variants || []).map((v) => v.size).filter(Boolean))) as Size[]
  const firstVariant = p.variants?.[0]
  const color = firstVariant?.color ?? ''
  const pattern = extractPattern(p.tags)
  const type = extractType(p.tags)
  const family = getFamilyByTag(p.tags)
  const material = (family?.materialHandle || 'fil-d-ecosse') as Product['material']
  const materialLabel = family?.material || (material === 'seda' ? 'Seda' : material === 'la-merino' ? 'Lã Merino' : "Fil d'Écosse")
  const description = p.shortDescription || stripHtml(p.descriptionHtml)
  return {
    id: `pl-${p.id}`,
    handle: p.slug,
    name: p.name.trim(),
    description,
    price: p.priceCents / 100,
    material, materialLabel,
    type,
    typeLabel: type === 'over-the-calf' ? 'Cano Alto' : type === 'no-show' ? 'Invisível' : 'Mid-calf',
    color, colorHex: getColorHex(color),
    pattern,
    patternLabel: pattern === 'solid' ? 'Liso' : pattern === 'ribbed' ? 'Canelado' : pattern,
    images: p.images?.length ? p.images : [`/products/${p.slug}.svg`, `/products/${p.slug}.svg`],
    sizes: sizes.length ? sizes : ['39-42','42-45','45-48'],
    inStock: (p.variants || []).some((v) => (v.stockQuantity ?? 0) > 0),
    collections: p.tags,
    badge: p.flashSale ? 'Destaque' : undefined,
    gender: (p.tags?.includes('mulher') ? 'mulher' : 'homem') as Product['gender'],
  }
}

function adaptPLBundle(b: PLBundle): Bundle {
  return {
    id: `pl-bundle-${b.id}`,
    handle: b.slug,
    name: b.title,
    tagline: `${b.pairCount} pares`,
    description: b.description || '',
    packaging: b.pairCount >= 12 ? 'drawer-box' : 'metal-box',
    packagingLabel: b.pairCount >= 12 ? 'Caixa Gaveta' : 'Caixa de Metal',
    pairCount: b.pairCount,
    productIds: b.items.map((i) => `pl-${i.productId}`),
    originalPrice: b.compareAtPriceCents / 100,
    price: b.priceCents / 100,
    discountPercent: b.discountPercent,
    image: b.image,
    featured: true,
  }
}

// ─── API pública (async) ─────────────────────────────────────────────

export async function getCatalog(): Promise<Product[]> {
  const pl = await apiGetSafe<PLProduct[]>('/products', { revalidate: 60 })
  if (pl && pl.length > 0) return pl.map(adaptPLProduct)
  return mockProducts
}

export async function getProduct(slug: string): Promise<Product | null> {
  const pl = await apiGetSafe<PLProduct>(`/products/${slug}`, { revalidate: 60 })
  if (pl) return adaptPLProduct(pl)
  return mockProducts.find((p) => p.handle === slug) ?? null
}

export const getProductByHandle = getProduct

export async function getBundles(): Promise<Bundle[]> {
  const pl = await apiGetSafe<PLBundle[]>('/bundles', { revalidate: 60 })
  if (pl && pl.length > 0) return pl.map(adaptPLBundle)
  return mockBundles
}

export async function getFeaturedBundles(): Promise<Bundle[]> {
  const all = await getBundles()
  return all.filter((b) => b.featured)
}

export async function getBundleByHandle(handle: string): Promise<Bundle | null> {
  const all = await getBundles()
  return all.find((b) => b.handle === handle) ?? null
}

export async function getProductsByCollection(handle: string): Promise<Product[]> {
  const all = await getCatalog()
  return all.filter((p) => p.collections.includes(handle))
}

export async function getProductsByGender(gender: Gender): Promise<Product[]> {
  const all = await getCatalog()
  if (gender === 'unisex') return all
  return all.filter((p) => p.gender === gender || p.gender === 'unisex')
}

export async function getCatalogByFamily(familySlug: FamilySlug): Promise<Product[]> {
  const all = await getCatalog()
  const tag = `familia:${familySlug}`
  return all.filter((p) => p.collections.includes(tag))
}

export async function searchCatalog(query: string): Promise<Product[]> {
  if (!query.trim()) return []
  const pl = await apiGetSafe<PLProduct[]>(`/products?q=${encodeURIComponent(query)}`)
  if (pl) return pl.map(adaptPLProduct)
  const q = query.toLowerCase()
  return mockProducts.filter((p) =>
    p.name.toLowerCase().includes(q) ||
    p.color.toLowerCase().includes(q) ||
    p.materialLabel.toLowerCase().includes(q) ||
    p.patternLabel.toLowerCase().includes(q)
  )
}

// ─── Legacy: arrays directos (deprecated — preferir funções async) ──────
// Usado por componentes client + páginas legacy que não foram migradas.
// Quando todas as páginas estiverem migradas, podemos remover estes exports
// e o ficheiro mock-data.ts pode ser apagado.
export const products = mockProducts
export const bundles = mockBundles
