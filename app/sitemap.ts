import type { MetadataRoute } from 'next'
import { products, bundles, collections } from '@/lib/mock-data'

const BASE_URL = 'https://lionsocks.pt'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes = [
    '',
    '/loja',
    '/loja/homem',
    '/loja/mulher',
    '/novidades',
    '/sale',
    '/packs',
    '/lions-circle',
    '/sobre',
    '/contacto',
    '/envios',
    '/guia-tamanhos',
    '/faq',
    '/privacidade',
    '/pesquisa',
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1.0 : 0.8,
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

  const materialRoutes = ['seda', 'fil-d-ecosse', 'la-merino'].map((handle) => ({
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
