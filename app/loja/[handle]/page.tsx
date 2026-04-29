import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { products, getProductByHandle, getProductsByCollection } from '@/lib/catalog'
import { formatPrice } from '@/lib/utils'
import ProductGallery from '@/components/product/ProductGallery'
import ProductInfo from '@/components/product/ProductInfo'
import ProductCard from '@/components/product/ProductCard'
import RecentlyViewed from '@/components/product/RecentlyViewed'
import StickyMobileCart from '@/components/product/StickyMobileCart'

interface Props {
  params: Promise<{ handle: string }>
}

// Generate static params for all products
export async function generateStaticParams() {
  return products.map((p) => ({ handle: p.handle }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params
  const product = await getProductByHandle(handle)
  if (!product) return {}

  return {
    title: `${product.name} — ${product.color}`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} | Lion Socks`,
      description: product.description.slice(0, 160),
      images: product.images[0] ? [{ url: product.images[0] }] : [],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params
  const product = await getProductByHandle(handle)

  if (!product) notFound()

  // Related products: same material, exclude current
  const related = (await getProductsByCollection(product.material))
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    brand: { '@type': 'Brand', name: 'Lion Socks' },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'EUR',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div style={{ background: '#F5F3EE', minHeight: '100vh' }} className="pt-28 lg:pt-36 pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          {/* Product main section */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 xl:gap-20 mb-20 lg:mb-28">
            {/* Gallery */}
            <div>
              <ProductGallery images={product.images} productName={product.name} />
            </div>

            {/* Info */}
            <div className="lg:pt-4">
              <ProductInfo product={product} />
            </div>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <section>
              <div className="flex items-baseline justify-between mb-8">
                <div>
                  <p className="text-gold text-[10px] tracking-[0.4em] uppercase font-body mb-1">
                    Também pode gostar
                  </p>
                  <h2 className="font-display text-2xl lg:text-3xl text-gray-900">
                    Mais em {product.materialLabel}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}

          <RecentlyViewed currentProductId={product.id} registerOnMount />
        </div>
      </div>

      <StickyMobileCart product={product} />
    </>
  )
}
