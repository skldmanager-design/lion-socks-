// Brand copy centralized — all user-facing text lives here.
// Structure ready for i18n: flip locale to 'en' later.

export type Locale = 'pt' | 'en'

export const brandCopy = {
  // ─── Announcement bar ────────────────────────────────────────
  announcement: {
    pt: 'Portes grátis acima de €49  ·  Feitas em Portugal',
    en: 'Free shipping over €49  ·  Made in Portugal',
  },

  // ─── Hero ────────────────────────────────────────────────────
  hero: {
    homem: {
      label: { pt: 'COLECÇÃO HOMEM', en: "MEN'S COLLECTION" },
      title: {
        pt: 'Para quem repara\nnos detalhes.',
        en: 'For those who notice\nthe details.',
      },
      subtitle: {
        pt: 'Meias de manufactura portuguesa. Do fio de escócia à seda. Acabamento artesanal. Linha dourada.',
        en: 'Portuguese-made socks. From lisle cotton to silk. Artisan finish. Golden line.',
      },
      cta: { pt: 'Descobrir a colecção', en: 'Discover the collection' },
    },
    mulher: {
      label: { pt: 'COLECÇÃO MULHER', en: "WOMEN'S COLLECTION" },
      title: {
        pt: 'Elegância em\ncada detalhe.',
        en: 'Elegance in\nevery detail.',
      },
      subtitle: {
        pt: 'Conforto que se veste. Classe que se sente.',
        en: 'Comfort you wear. Class you feel.',
      },
      cta: { pt: 'Descobrir a colecção', en: 'Discover the collection' },
    },
  },

  // ─── Signature Detail (linha dourada) ────────────────────────
  signature: {
    title: { pt: 'A Linha Dourada', en: 'The Golden Line' },
    body: {
      pt: 'Cada par Lion Socks carrega uma linha dourada no punho. Não é decoração — é assinatura. O detalhe que se vê quando a calça sobe, quando cruzas as pernas, quando alguém repara. Discreto para quem veste. Inconfundível para quem conhece.',
      en: 'Every Lion Socks pair carries a golden line at the cuff. Not decoration — a signature. The detail that shows when your trousers rise, when you cross your legs, when someone notices. Subtle for the wearer. Unmistakable for those who know.',
    },
  },

  // ─── Materials section ───────────────────────────────────────
  materials: {
    eyebrow: { pt: 'OS NOSSOS MATERIAIS', en: 'OUR MATERIALS' },
    headline: {
      pt: 'O que não se vê é o que importa.',
      en: "What you don't see is what matters.",
    },
    body: {
      pt: 'Cinco materiais. Uma exigência. Do algodão penteado ao cashmere puro, cada fio é escolhido pelo que faz — não pelo que parece.',
      en: 'Five materials. One standard. From combed cotton to pure cashmere, every thread is chosen for what it does — not what it looks like.',
    },
    list: [
      {
        slug: 'merino',
        handle: 'la-merino',
        name: { pt: 'Merino', en: 'Merino' },
        short: {
          pt: 'Fibra que se adapta. Quente no inverno, fresca no verão — por estrutura, não por marketing.',
          en: 'The fiber that adapts. Warm in winter, cool in summer — by structure, not marketing.',
        },
        long: {
          pt: 'A fibra que se adapta. A lã merino vem de ovelhas criadas em altitudes elevadas na Austrália e Nova Zelândia — um ambiente extremo que produziu uma fibra extremamente fina. Tão fina que não pica. Tão técnica que regula a temperatura sozinha: absorve até 30% do seu peso em humidade antes de te sentires molhado, liberta-a como vapor enquanto te moves. Quente no inverno, fresca no verão — não por marketing, mas por estrutura molecular. O merino Lion é extra-fino, anti-odor natural, e melhora com cada uso.',
          en: 'The fiber that adapts. Merino wool comes from sheep raised at high altitude in Australia and New Zealand — an extreme environment that produced an exceptionally fine fiber. So fine it doesn\'t itch. So technical it regulates temperature on its own: absorbs up to 30% of its weight in moisture before you feel wet, releases it as vapor as you move. Warm in winter, cool in summer — not marketing, but molecular structure. Lion\'s merino is extra-fine, naturally odor-resistant, and improves with each wear.',
        },
      },
      {
        slug: 'fil-d-ecosse',
        handle: 'fil-d-ecosse',
        name: { pt: 'Fio de Escócia', en: "Fil d'Écosse" },
        short: {
          pt: 'Algodão egípcio mercerizado. Brilho subtil, cor profunda, zero pilling.',
          en: 'Mercerized Egyptian cotton. Subtle sheen, deep color, zero pilling.',
        },
        long: {
          pt: 'Algodão transformado pelo fogo. O fio de escócia começa como algodão egípcio de fibra extra-longa — a variedade mais rara, cultivada no Delta do Nilo. Depois é mercerizado: passado por uma chama a alta velocidade que elimina todas as fibras soltas da superfície. O resultado é um fio que não existia na natureza — perfeitamente liso, com um brilho subtil, resistente ao pilling, com uma afinidade para cor que nenhum algodão normal consegue.',
          en: 'Cotton transformed by flame. Fil d\'Écosse starts as extra-long staple Egyptian cotton — the rarest variety, grown in the Nile Delta. Then it\'s mercerized: passed through a flame at high speed to eliminate every loose surface fiber. The result is a thread that doesn\'t exist in nature — perfectly smooth, with a subtle sheen, pill-resistant, with a dye affinity no ordinary cotton achieves.',
        },
      },
      {
        slug: 'seda',
        handle: 'seda',
        name: { pt: 'Seda', en: 'Silk' },
        short: {
          pt: 'O toque que desliza. Para os dias que importam.',
          en: 'The glide. For the days that matter.',
        },
        long: {
          pt: 'O material que não precisava de existir numa meia. Mas existe. A seda traz o que nenhuma outra fibra consegue: um brilho natural que nenhum acabamento sintético replica, uma leveza quase imperceptível, e um toque que desliza. Hipoalergénica, absorvente, termorreguladora — mas ninguém escolhe seda pelas propriedades técnicas. Escolhe-se pelo que se sente.',
          en: 'A material that didn\'t need to exist in a sock. But it does. Silk delivers what no other fiber can: a natural sheen no synthetic finish replicates, a weight you barely notice, and a touch that glides. Hypoallergenic, absorbent, thermoregulating — but no one chooses silk for technical specs. You choose it for what it feels like.',
        },
      },
      {
        slug: 'cashmere',
        handle: 'cashmere',
        name: { pt: 'Cashmere', en: 'Cashmere' },
        short: {
          pt: 'A fibra mais fina do mundo. Oito vezes mais isolante que a lã.',
          en: 'The finest fiber in the world. Eight times more insulating than wool.',
        },
        long: {
          pt: 'A fibra mais fina do mundo. O cashmere vem do subpêlo das cabras criadas nos planaltos da Mongólia e do norte da China — onde os invernos chegam a -40°C. Cada cabra produz apenas 150 a 200 gramas de cashmere por ano. Esta escassez não é artificial — é física. O resultado é uma fibra oito vezes mais isolante que a lã de ovelha e incomparavelmente mais suave.',
          en: 'The finest fiber in the world. Cashmere comes from the undercoat of goats raised on the plateaus of Mongolia and northern China — where winters reach -40°C. Each goat produces just 150 to 200 grams of cashmere per year. This scarcity isn\'t manufactured — it\'s physical. The result is a fiber eight times more insulating than sheep\'s wool and incomparably softer.',
        },
      },
      {
        slug: 'algodao-penteado',
        handle: 'algodao-penteado',
        name: { pt: 'Algodão Penteado', en: 'Combed Cotton' },
        short: {
          pt: 'A base honesta. Macio, durável, sem dramas.',
          en: 'The honest foundation. Soft, durable, no drama.',
        },
        long: {
          pt: 'A base honesta. Algodão de fibra longa, penteado — um processo que passa cada fibra por pentes finos que removem as fibras curtas e imperfeições. O que fica é um fio mais uniforme, mais macio, mais durável. Não tem o glamour do merino nem o brilho da seda, mas é o material que vestes sem pensar e que nunca te desilude.',
          en: 'The honest foundation. Long-staple cotton, combed — a process that passes each fiber through fine combs to remove short fibers and impurities. What remains is a more uniform, softer, more durable thread. It doesn\'t have merino\'s glamour or silk\'s sheen, but it\'s the material you wear without thinking and that never lets you down.',
        },
      },
    ],
  },

  // ─── Packs section ───────────────────────────────────────────
  packs: {
    headline: { pt: 'Para oferecer. Ou para ficar.', en: 'To give. Or to keep.' },
  },

  // ─── Manifesto ───────────────────────────────────────────────
  manifesto: {
    headline: { pt: 'A nossa história', en: 'Our story' },
    body: {
      pt: 'Não fazemos meias para impressionar. Fazemos meias para quem sabe a diferença. A Lion Socks nasce numa fábrica no Porto — a mesma fábrica, as mesmas máquinas, os mesmos mestres que servem marcas que nunca saberás o nome. A diferença é que agora, o que fazemos melhor tem a nossa assinatura. Uma linha dourada no punho. Fabrico português. Materiais sem compromisso. Para quem repara nos detalhes.',
      en: "We don't make socks to impress. We make socks for those who know the difference. Lion Socks is born in a Porto factory — the same factory, the same machines, the same masters that serve brands whose names you'll never know. The difference is that now, our best work carries our signature. A golden line at the cuff. Portuguese craft. Uncompromised materials. For those who notice the details.",
    },
  },

  // ─── Collections ─────────────────────────────────────────────
  collections: {
    atlantico: {
      name: { pt: 'Atlântico', en: 'Atlantic' },
      season: { pt: 'Primavera/Verão 2026', en: 'Spring/Summer 2026' },
      body: {
        pt: 'A costa que nos define. O azul profundo do mar ao largo do Porto. A areia molhada da Foz ao fim do dia. O verde escuro das algas nos rochedos da Praia da Luz. Cores que não precisam de explicação — bastam. A colecção Atlântico não é inspirada no oceano. É o oceano, traduzido em fio.',
        en: "The coast that defines us. The deep blue of the sea off Porto. The wet sand of Foz at day's end. The dark green of algae on the rocks at Praia da Luz. Colors that need no explanation — they're enough. The Atlantic collection isn't inspired by the ocean. It is the ocean, translated into thread.",
      },
      colors: ['Oceano Profundo', 'Horizonte', 'Areia', 'Alga', 'Espuma', 'Rocha'],
    },
    granito: {
      name: { pt: 'Granito', en: 'Granite' },
      season: { pt: 'Outono/Inverno 2026', en: 'Autumn/Winter 2026' },
      body: {
        pt: 'A pedra que construiu o Porto. O cinza denso do granito nas fachadas da Ribeira. O bordeaux do vinho do Porto nos armazéns de Gaia. O preto das noites de chuva na Baixa. A madeira escura das barricas centenárias. O musgo que cresce nas pedras junto ao Douro. Matéria bruta, acabamento nobre. A colecção Granito é o Porto no inverno — sem filtro.',
        en: 'The stone that built Porto. The dense gray of granite on the Ribeira facades. The bordeaux of Port wine in the Gaia cellars. The black of rainy nights in the Baixa. The dark wood of century-old barrels. The moss growing on the stones along the Douro. Raw material, noble finish. The Granite collection is Porto in winter — unfiltered.',
      },
      colors: ['Granito', 'Vinho do Porto', 'Noite', 'Barrica', 'Musgo', 'Pedra Clara'],
    },
  },

  // ─── SEO ─────────────────────────────────────────────────────
  seo: {
    title: {
      pt: 'Lion Socks — Meias Premium Feitas em Portugal',
      en: 'Lion Socks — Premium Socks Made in Portugal',
    },
    description: {
      pt: 'Meias de manufactura portuguesa em merino, fio de escócia, seda e cashmere. Portes grátis acima de €49.',
      en: 'Portuguese-made socks in merino, lisle cotton, silk and cashmere. Free shipping over €49.',
    },
  },

  // ─── Common strings ──────────────────────────────────────────
  common: {
    freeShipping: { pt: 'Portes grátis acima de €49', en: 'Free shipping over €49' },
    madeInPortugal: { pt: 'Feitas em Portugal', en: 'Made in Portugal' },
    returns: { pt: 'Devoluções em 30 dias', en: '30-day returns' },
    secure: { pt: 'Pagamento seguro', en: 'Secure payment' },
  },
}

// Helper for locale-aware strings
export function t<T extends { pt: string; en: string }>(obj: T, locale: Locale = 'pt'): string {
  return obj[locale]
}
