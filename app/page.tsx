import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import HomeSections from '@/components/HomeSections'

export const metadata: Metadata = {
  title: 'Meias Premium Portuguesas — Lion Socks',
  description:
    "Descubra a nossa colecção de meias premium em seda, fil d'Écosse e lã merino. Elegância clássica para o homem que repara nos detalhes.",
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeSections />
    </>
  )
}
