import { siteConfig } from '@/lib/site-config'

/**
 * Schema.org Organization JSON-LD — render uma vez no root layout.
 * Ajuda Google a perceber a entidade da marca, sede, contacto e logo.
 */
export default function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/lion-shield-256.png`,
    description: siteConfig.description,
    foundingLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressCountry: siteConfig.location.country,
        addressLocality: siteConfig.location.city,
      },
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: siteConfig.email.general,
        areaServed: ['PT', 'EU'],
        availableLanguage: ['Portuguese'],
      },
    ],
    sameAs: [siteConfig.social.instagram],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
