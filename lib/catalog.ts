// Catalog service: tries Product-Pilot API, falls back to mock-data if unavailable.
// This lets the site keep working if backend is down, during dev, or before full migration.

import { apiGetSafe } from './api'
import type { PLProduct, PLBundle } from './api-types'
import { products as mockProducts, bundles as mockBundles, type Product, type Bundle } from './mock-data'
import { getFamilyByTag, type FamilySlug } from './families'
import { getColorHex } from './color-map'

// ─── Adapters: PL shape → existing site shape ──────────────────────────
// Keep existing components working by mapping the API response to the legacy shape.

// Type tag → pattern mapping (Product-Pilot uses type tags like 'rib', 'plain', 'padrao-classico')
const TYPE_TAG_TO_PATTERN: Record<string, Product['pattern']> = {
  plain: 'solid',
  liso: 'solid',
  rib: 'ribbed',
  canelado: 'ribbed',
  dots: 'pin-dot',
  'pin-check': 'pin-dot',
  argyle: 'argyle',
  paisley: 'riscas',
  herringbone: 'herringbone',
}

function extractPattern(tags: string[]): Product['pattern'] {
  for (const t of tags) {
    if (TYPE_TAG_TO_PATTERN[t]) return TYPE_TAG_TO_PATTERN[t]
  }
  return 'solid'
}

function extractType(tags: string[]): Product['type'] {
  if (tags.includes('high-knee') || tags.includes('over-calf') || tags.includes('cano-alto')) return 'over-the-calf'
  if (tags.includes('no-show') || tags.includes('invisivel')) return 'no-show'
  return 'mid-calf'
}

function adaptPLProduct(p: PLProduct): Product {
  const firstVariant = p.variants[0]
  const sizes = Array.from(new Set(p.variants.map((v) => v.optionValues.Tamanho || v.optionValues.size || '')))
    .filter(Boolean) as Array<'39-42' | '42-45' | '45-48'>

  const color = firstVariant?.optionValues.Cor || firstVariant?.optionValues.color || ''
  const pattern = extractPattern(p.tags)
  const type = extractType(p.tags)

  // Prefer family-derived material over p.material (for consistency with new naming)
  const family = getFamilyByTag(p.tags)
  const material = (family?.materialHandle || p.material || 'fil-d-ecosse') as Product['material']
  const materialLabel = family?.material || (material === 'seda' ? 'Seda' : material === 'la-merino' ? 'Lã Merino' : "Fil d'Écosse")

  return {
    id: `pl-${p.id}`,
    handle: p.slug,
    name: p.title,
    description: p.description || '',
    price: firstVariant ? firstVariant.priceCents / 100 : 0,
    material,
    materialLabel,
    type,
    typeLabel: type === 'over-the-calf' ? 'Cano Alto' : type === 'no-show' ? 'Invisível' : 'Mid-calf',
    color,
    colorHex: getColorHex(color),
    pattern,
    patternLabel: pattern === 'solid' ? 'Liso' : pattern === 'ribbed' ? 'Canelado' : pattern,
    images: p.images.length ? p.images : [`/products/${p.slug}.svg`, `/products/${p.slug}.svg`],
    sizes: sizes.length ? sizes as any : ['39-42','42-45','45-48'],
    inStock: p.variants.some((v) => v.available),
    collections: p.tags,
    badge: p.flashSale ? 'Destaque' : undefined,
    gender: (p.tags.includes('mulher') ? 'mulher' : 'homem') as Product['gender'],
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

// ─── Public API ─────────────────────────────────────────────────────────

export async function getCatalog(): Promise<Product[]> {
  const pl = await apiGetSafe<PLProduct[]>('/catalog', { revalidate: 60 })
  if (pl && pl.length > 0) return pl.map(adaptPLProduct)
  return mockProducts
}

export async function getProduct(slug: string): Promise<Product | null> {
  const pl = await apiGetSafe<PLProduct>(`/catalog/${slug}`, { revalidate: 60 })
  if (pl) return adaptPLProduct(pl)
  return mockProducts.find((p) => p.handle === slug) ?? null
}

export async function getBundles(): Promise<Bundle[]> {
  const pl = await apiGetSafe<PLBundle[]>('/bundles', { revalidate: 60 })
  if (pl && pl.length > 0) return pl.map(adaptPLBundle)
  return mockBundles
}

export async function getCatalogByFamily(familySlug: FamilySlug): Promise<Product[]> {
  const all = await getCatalog()
  const tag = `familia:${familySlug}`
  return all.filter((p) => p.collections.includes(tag))
}

export async function searchCatalog(query: string): Promise<Product[]> {
  if (!query.trim()) return []
  const pl = await apiGetSafe<PLProduct[]>(`/search?q=${encodeURIComponent(query)}`)
  if (pl) return pl.map(adaptPLProduct)
  // Fallback: local search
  const q = query.toLowerCase()
  return mockProducts.filter((p) =>
    p.name.toLowerCase().includes(q) ||
    p.color.toLowerCase().includes(q) ||
    p.materialLabel.toLowerCase().includes(q) ||
    p.patternLabel.toLowerCase().includes(q)
  )
}
