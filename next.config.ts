import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Em dev, salta optimização — alguns backends locais devolvem PNGs grandes que o
    // optimizer falha em buscar e a imagem fica vazia. Em produção mantém optimização.
    unoptimized: process.env.NODE_ENV !== 'production',
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'http', hostname: 'localhost', port: '3002' },
      { protocol: 'https', hostname: '*.vercel-blob.com' },
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
    ],
  },
  // Dev indicator (o "N" do Next + dev tools): mover para canto inferior esquerdo
  devIndicators: {
    position: 'bottom-left',
  },
}

export default nextConfig
