# Lion Socks

E-commerce de meias premium portuguesas — manufactura no Porto, paleta preto + dourado, estética old-money discreta.

## Stack

- **Next.js 16.2.1** (App Router, Turbopack, RSC)
- **Tailwind CSS v4** (via `@tailwindcss/postcss`)
- **TypeScript 5**
- **framer-motion** (animações localizadas)
- **lucide-react** (ícones)
- **sharp** (compressão de imagens)
- **Product-Pilot** ERP para auth, catálogo, checkout, email, inventory e facturação certificada AT (Portugal)

## Decisões fixas

| Tópico | Decisão |
|---|---|
| Identidade | Lion Socks — fabricado no Porto |
| Paleta | Preto `#0A0A0A` + Dourado `#B8960C` + Creme `#F5F3EE` |
| Tipografia | Playfair Display + Inter |
| Materiais | Fio da Escócia, Lã Merino, Seda, Cashmere, Algodão Penteado |
| Famílias | Ofício / Ribeira / Lello / Reserva / Alma |
| Packs metálicos | 2/3/5 pares |
| Pack gaveta | 12 pares (Gentleman's Collection) |
| Envio grátis | acima de €49 |
| Devolução | 30 dias |
| Backend | Product-Pilot (sem Shopify) |
| Pagamento | gateway PT integrado via PL (Stripe ou EuPago/IfThenPay) |

## Estrutura

```
app/                  Routes (App Router)
  (homepage)/         /
  loja/               /loja, /loja/[handle], /loja/homem, /loja/mulher
  packs/              /packs, /packs/[handle], /packs/build-your-own
  materiais/[handle]  Storytelling pages (5 materiais)
  colecoes/[handle]   Pages por família
  checkout/           Checkout flow + success
  conta/              Login / registo / encomendas / morada
  api/                checkout / contact / newsletter (proxies para PL)
components/
  layout/             Header, Footer, MobileMenu, MegaMenuPanel, AnnouncementBar
  home/               Hero, HomeSections, ListaPrivadaSection
  product/            ProductCard, ProductInfo, ProductGallery, AddToCart
  packs/              PackCard, BuildYourBox
  cart/               CartDrawer, CartItem, CartSummary
  collection/         CollectionGrid, CollectionFilters
  ui/                 Drawer, Badge, Breadcrumbs, CookieConsent, ScrollToTop, …
  seo/                OrganizationJsonLd
context/              CartContext, AuthContext, WishlistContext, ToastContext, RecentlyViewedContext
lib/
  mock-data.ts        Catálogo (placeholder até PL estar online)
  site-config.ts      Single source of truth para URL, emails, redes
  utils.ts            Helpers (formatPrice, FREE_SHIPPING_THRESHOLD)
  api.ts              Wrapper REST para Product-Pilot
public/               Assets (imagens, ícones, payment SVGs)
scripts/              compress-hero-images.mjs (sharp pipeline)
_design_review/       Auditoria visual (49 prints + INDEX.md + legacy docs)
```

## Setup local

```bash
npm install
npm run dev   # http://localhost:3000
```

## Build de produção

```bash
npm run build
npm start
```

Build atual: ✓ 106 páginas estáticas geradas, 0 erros.

## Variáveis de ambiente

Copia `.env.production.example` → `.env.production.local` e preenche. Em produção, define:

| Variável | Para quê |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL canónico (`https://lionsocks.pt`) |
| `NEXT_PUBLIC_API_BASE` | Endpoint Product-Pilot |
| `NEXT_PUBLIC_PL_API_URL` | Storefront PL (newsletter, checkout) |

Sem PL configurado, newsletter e auth caem em stubs em memória (não enviam email).

## Performance

Após cleanup pré-launch:

- Imagens hero: 74 MB → 1 MB (-98.5%)
- Material icons: 4.6 MB → 36 KB (-99%)
- Pack editorial: 22 MB → 664 KB (-97%)
- Brand kit: 28 MB → 3.7 MB
- Total assets servidos pelo site: ~6 MB

Re-comprimir a qualquer momento:

```bash
node scripts/compress-hero-images.mjs
```

(Os originais ficam em `public/home/_originals/` — gitignored.)

## Auditoria de design

Ver `_design_review/INDEX.md` — 49 screenshots (38 desktop + 11 mobile) com mapa completo de páginas e recomendações.

## Roadmap pré-launch

Ver tabela actualizada na PR mais recente. Bloqueadores absolutos:

1. NIF + morada Valsport, Lda em `app/termos/page.tsx:51`
2. Endpoints Product-Pilot deployados em produção
3. Gateway pagamento PT integrado em PL
4. Domínio `lionsocks.pt` configurado no host
5. Sistema facturação certificado AT ligado a PL

## Licença

Privado. Lion Socks é propriedade de Valsport, Lda.
