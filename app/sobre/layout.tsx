import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre Nós',
  description: 'A Lion Socks nasce numa fábrica no Porto. Meias premium para quem repara nos detalhes.',
}

export default function SobreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
