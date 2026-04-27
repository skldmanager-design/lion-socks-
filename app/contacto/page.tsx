import type { Metadata } from 'next'
import ContactoClient from './ContactoClient'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Entre em contacto com a Lion Socks.',
}

export default function ContactoPage() {
  return <ContactoClient />
}
