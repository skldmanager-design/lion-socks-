import type { Metadata } from 'next'
import LionsCircleClient from './LionsCircleClient'

export const metadata: Metadata = {
  title: "The Lion's Circle — Em Breve",
  description:
    "Uma selecção curada de meias premium, entregue à sua porta. Junte-se à lista de espera do programa de subscrição exclusivo da Lion Socks.",
}

export default function LionsCirclePage() {
  return <LionsCircleClient />
}
