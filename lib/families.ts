// Family metadata — maps to tag `familia:<slug>` in Product-Pilot.
// The site reads this to build the mega menu, collection pages, and filters.

export type FamilySlug = 'ribeira' | 'oficio' | 'lello' | 'reserva' | 'alma'

export interface Family {
  slug: FamilySlug
  name: string
  material: string
  materialHandle: string     // matches /materiais/<handle>
  tagline: { pt: string; en: string }
  description: { pt: string; en: string }
  tag: `familia:${FamilySlug}`
}

export const families: Family[] = [
  {
    slug: 'ribeira',
    name: 'Ribeira',
    material: 'Merino',
    materialHandle: 'la-merino',
    tagline: {
      pt: 'A fibra que se adapta.',
      en: 'The fiber that adapts.',
    },
    description: {
      pt: 'Lã merino extra-fina. Termorreguladora, anti-odor, não pica. Melhora com o uso.',
      en: 'Extra-fine merino wool. Thermoregulating, odor-resistant, non-itchy. Gets better with wear.',
    },
    tag: 'familia:ribeira',
  },
  {
    slug: 'oficio',
    name: 'Ofício',
    material: 'Fio de Escócia',
    materialHandle: 'fil-d-ecosse',
    tagline: {
      pt: 'Algodão transformado pelo fogo.',
      en: 'Cotton transformed by flame.',
    },
    description: {
      pt: 'Algodão egípcio mercerizado. Brilho subtil, cor profunda, zero pilling. Máquinas de 200 agulhas, biqueira hand-linked.',
      en: 'Mercerized Egyptian cotton. Subtle sheen, deep color, zero pilling. 200-needle machines, hand-linked toe.',
    },
    tag: 'familia:oficio',
  },
  {
    slug: 'lello',
    name: 'Lello',
    material: 'Seda',
    materialHandle: 'seda',
    tagline: {
      pt: 'O toque que desliza.',
      en: 'The glide.',
    },
    description: {
      pt: 'Seda natural com brilho único. Hipoalergénica, termorreguladora. Para os dias que importam.',
      en: 'Natural silk with unique sheen. Hypoallergenic, thermoregulating. For the days that matter.',
    },
    tag: 'familia:lello',
  },
  {
    slug: 'reserva',
    name: 'Reserva',
    material: 'Cashmere',
    materialHandle: 'cashmere',
    tagline: {
      pt: 'A fibra mais fina do mundo.',
      en: 'The finest fiber in the world.',
    },
    description: {
      pt: 'Cashmere da Mongólia — 8× mais isolante que lã. Blend ou puro. Luxo absoluto.',
      en: 'Mongolian cashmere — 8× more insulating than wool. Blended or pure. Absolute luxury.',
    },
    tag: 'familia:reserva',
  },
  {
    slug: 'alma',
    name: 'Alma',
    material: 'Algodão Penteado',
    materialHandle: 'algodao-penteado',
    tagline: {
      pt: 'A base honesta.',
      en: 'The honest foundation.',
    },
    description: {
      pt: 'Algodão de fibra longa, penteado. Macio, durável, sem dramas. Não encolhe, não deforma.',
      en: 'Long-staple combed cotton. Soft, durable, no drama. Doesn\'t shrink, doesn\'t deform.',
    },
    tag: 'familia:alma',
  },
]

export function getFamilyBySlug(slug: string): Family | undefined {
  return families.find((f) => f.slug === slug)
}

export function getFamilyByTag(tags: string[]): Family | undefined {
  for (const tag of tags) {
    if (tag.startsWith('familia:')) {
      const slug = tag.slice('familia:'.length) as FamilySlug
      return getFamilyBySlug(slug)
    }
  }
  return undefined
}

export function getFamilyByMaterialHandle(handle: string): Family | undefined {
  return families.find((f) => f.materialHandle === handle)
}
