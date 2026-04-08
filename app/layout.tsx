import type { Metadata, Viewport } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'

export const metadata: Metadata = {
  title: {
    default: 'Lion Socks — Meias Premium Portuguesas',
    template: '%s | Lion Socks',
  },
  description:
    'Meias premium em seda, fil d\'Écosse e lã merino. Elegância clássica, conforto excepcional. Feitas para quem repara nos detalhes.',
  keywords: ['meias premium', 'meias seda', 'fil d\'écosse', 'lã merino', 'meias homem', 'meias luxo Portugal'],
  authors: [{ name: 'Lion Socks' }],
  creator: 'Lion Socks',
  openGraph: {
    type: 'website',
    locale: 'pt_PT',
    url: 'https://lionsocks.pt',
    siteName: 'Lion Socks',
    title: 'Lion Socks — Meias Premium Portuguesas',
    description: 'Seda, fil d\'Écosse e lã merino. Conforto que se sente. Elegância que se nota.',
    images: [{ url: '/og-image.jpg', width: 1080, height: 1080, alt: 'Lion Socks' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lion Socks — Meias Premium',
    description: 'Seda, fil d\'Écosse e lã merino. Conforto que se sente. Elegância que se nota.',
  },
  robots: {
    index: true,
    follow: true,
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
        <CartProvider>
          {/* Announcement bar — fixed at very top */}
          <div id="announcement-bar">
            <AnnouncementBar />
          </div>

          {/* Header — fixed below announcement bar */}
          <Header />

          {/* Cart drawer — global */}
          <CartDrawer />

          {/* Main content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
