import type { MetadataRoute } from 'next'
import { products, bundles, collections } from '@/lib/mock-data'
import { siteConfig } from '@/lib/site-config'

const BASE_URL = siteConfig.url

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes = [
    '',
    '/loja',
    '/loja/homem',
    '/loja/mulher',
    '/novidades',
    '/sale',
    '/destaques',
    '/packs',
    '/packs/build-your-own',
    '/lions-circle',
    '/sobre',
    '/craft',
    '/guide',
    '/contacto',
    '/envios',
    '/devolucoes',
    '/cuidados',
    '/guia-tamanhos',
    '/faq',
    '/privacidade',
    '/termos',
    '/cookies',
    '/pesquisa',
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1.0 : path.startsWith('/loja') || path.startsWith('/packs') ? 0.9 : 0.7,
  }))

  const productRoutes = products.map((p) => ({
    url: `${BASE_URL}/loja/${p.handle}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const bundleRoutes = bundles.map((b) => ({
    url: `${BASE_URL}/packs/${b.handle}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const collectionRoutes = collections.map((c) => ({
    url: `${BASE_URL}/colecoes/${c.handle}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const materialRoutes = ['seda', 'fil-d-ecosse', 'la-merino', 'cashmere', 'algodao-penteado'].map((handle) => ({
    url: `${BASE_URL}/materiais/${handle}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    ...staticRoutes,
    ...productRoutes,
    ...bundleRoutes,
    ...collectionRoutes,
    ...materialRoutes,
  ]
}
