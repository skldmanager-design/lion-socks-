import type { Metadata } from 'next'
import FaqClient from './FaqClient'

export const metadata: Metadata = {
  title: 'FAQ — Perguntas Frequentes',
  description:
    'Respostas às perguntas mais comuns sobre Lion Socks: prazos de entrega, devoluções, materiais, cuidados, packs e encomendas corporativas.',
}

export default function FaqPage() {
  return <FaqClient />
}
