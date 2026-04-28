import type { Metadata, Viewport } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { AuthProvider } from '@/context/AuthContext'
import { ToastProvider } from '@/context/ToastContext'
import { RecentlyViewedProvider } from '@/context/RecentlyViewedContext'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import ScrollToTop from '@/components/ui/ScrollToTop'
import CookieConsent from '@/components/ui/CookieConsent'
import OrganizationJsonLd from '@/components/seo/OrganizationJsonLd'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Lion Socks — Meias Premium Feitas em Portugal',
    template: '%s | Lion Socks',
  },
  description:
    'Meias de manufactura portuguesa em merino, fio de escócia, seda e cashmere. Portes grátis acima de €49.',
  keywords: [
    'meias premium portugal',
    'meias fio de escócia',
    'meias merino portugal',
    'meias seda homem',
    'meias cashmere',
    'meias portuguesas premium',
    'premium socks portugal',
    'lisle cotton socks',
    'merino socks',
    'silk socks men',
    'cashmere socks',
  ],
  authors: [{ name: 'Lion Socks' }],
  creator: 'Lion Socks',
  openGraph: {
    type: 'website',
    locale: 'pt_PT',
    alternateLocale: ['en_US', 'es_ES'],
    url: siteConfig.url,
    siteName: 'Lion Socks',
    title: 'Lion Socks — Meias Premium Feitas em Portugal',
    description: 'Feitas para quem repara nos detalhes. Fio de escócia, merino, seda, cashmere. Linha dourada no punho.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Lion Socks — Meias Premium' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lion Socks — Meias Premium Feitas em Portugal',
    description: 'Para quem repara nos detalhes. Fabrico português, linha dourada no punho.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      'pt-PT': siteConfig.url,
      'en': `${siteConfig.url}/en`,
    },
  },
  manifest: '/manifest.webmanifest',
  // SVG favicon (scales perfectly at any size) + PNG fallbacks for older browsers/Apple touch.
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/lion-shield-256.png', type: 'image/png', sizes: '256x256' },
    ],
    apple: [
      { url: '/lion-shield-256.png', sizes: '256x256' },
    ],
    shortcut: '/favicon.svg',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-PT" className="h-full">
      <body className="min-h-full flex flex-col">
        {/* Skip to content link — a11y, visível com Tab */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-gray-900 focus:text-white focus:px-4 focus:py-2 focus:rounded"
        >
          Saltar para o conteúdo
        </a>
        <OrganizationJsonLd />
        <ToastProvider>
        <AuthProvider>
        <CartProvider>
          <WishlistProvider>
          <RecentlyViewedProvider>
          {/* Announcement bar — fixed at very top */}
          <div id="announcement-bar">
            <AnnouncementBar />
          </div>

          {/* Header — fixed below announcement bar */}
          <Header />

          {/* Cart drawer — global */}
          <CartDrawer />

          {/* Main content */}
          <main id="main" className="flex-1">
            {children}
          </main>

          {/* Footer */}
          <Footer />

          {/* Scroll to top button */}
          <ScrollToTop />

          {/* Cookie consent */}
          <CookieConsent />
          </RecentlyViewedProvider>
          </WishlistProvider>
        </CartProvider>
        </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
