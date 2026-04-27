/**
 * Schema.org Organization JSON-LD — render uma vez no root layout.
 * Ajuda Google a perceber a entidade da marca, sede, contacto e logo.
 */
export default function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Lion Socks',
    legalName: 'Valsport, Lda',
    url: 'https://lionsocks.pt',
    logo: 'https://lionsocks.pt/lion-shield-256.png',
    description:
      'Meias premium fabricadas no Porto, Portugal. Fio de Escócia, lã merino, seda e cashmere com linha dourada no punho.',
    foundingLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'PT',
        addressLocality: 'Porto',
      },
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'info@lionsocks.pt',
        areaServed: ['PT', 'EU'],
        availableLanguage: ['Portuguese'],
      },
    ],
    sameAs: ['https://instagram.com/lionsocks'],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
