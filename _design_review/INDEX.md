# Lion Socks — Design Review (estado actual)

Site Next.js 16 e-commerce de meias premium portuguesas. Stack: Tailwind, Shopify Storefront API (futuro), Product-Pilot ERP. Paleta: preto `#0A0A0A` + dourado `#B8960C` + creme `#F5F3EE`. Tipografia: Playfair Display + Inter.

Ainda não foi feito deploy — estes prints mostram o estado actual do site em local. Capturados a 26 Abr 2026.

---

## Desktop (1440 × 900)

| # | Página | URL | Print |
|---|---|---|---|
| 01 | Homepage | `/` | `desktop/01-home.png` |
| 02 | Loja (lista geral) | `/loja` | `desktop/02-loja.png` |
| 03 | Loja Homem | `/loja/homem` | `desktop/03-loja-homem.png` |
| 04 | Loja Mulher (sem produtos) | `/loja/mulher` | `desktop/04-loja-mulher.png` |
| 05 | PDP — produto individual | `/loja/fil-ecosse-classic-preto` | `desktop/05-pdp-fil-ecosse-classic-preto.png` |
| 06 | Packs (Lion Box) | `/packs` | `desktop/06-packs.png` |
| 07 | Pack individual | `/packs/lion-essentials` | `desktop/07-pack-lion-essentials.png` |
| 08 | Build Your Own Box | `/packs/build-your-own` | `desktop/08-pack-build-your-own.png` |
| 09 | Material — Seda (Lello) | `/materiais/seda` | `desktop/09-materiais-seda.png` |
| 10 | Material — Fil d'Écosse (Ofício) | `/materiais/fil-d-ecosse` | `desktop/10-materiais-fil-decosse.png` |
| 11 | Material — Lã Merino (Ribeira) | `/materiais/la-merino` | `desktop/11-materiais-la-merino.png` |
| 12 | Material — Cashmere (Reserva) | `/materiais/cashmere` | `desktop/12-materiais-cashmere.png` |
| 13 | Material — Algodão Penteado (Alma) | `/materiais/algodao-penteado` | `desktop/13-materiais-algodao-penteado.png` |
| 14 | Carrinho (vazio) | `/carrinho` | `desktop/14-carrinho.png` |
| 15 | Checkout (vazio) | `/checkout` | `desktop/15-checkout.png` |
| 16 | Checkout success | `/checkout/success` | `desktop/16-checkout-success.png` |
| 17 | Sobre Nós | `/sobre-nos` (alias de `/sobre`) | `desktop/17-sobre-nos.png` |
| 18 | FAQ | `/faq` | `desktop/18-faq.png` |
| 19 | Contacto | `/contacto` | `desktop/19-contacto.png` |
| 20 | Lion's Circle (waitlist) | `/lions-circle` | `desktop/20-lions-circle.png` |
| 21 | Pesquisa | `/pesquisa` | `desktop/21-pesquisa.png` |
| 22 | Favoritos | `/favoritos` | `desktop/22-favoritos.png` |
| 23 | Conta — Iniciar sessão | `/conta` | `desktop/23-conta.png` |
| 24 | Conta — Registar | `/conta/registar` | `desktop/24-conta-registar.png` |
| 25 | Guia de Tamanhos | `/guia-tamanhos` | `desktop/25-guia-tamanhos.png` |
| 26 | Envios & Devoluções | `/envios` | `desktop/26-envios.png` |
| 27 | Política de Devoluções | `/devolucoes` | `desktop/27-devolucoes.png` |
| 28 | Política de Privacidade | `/privacidade` | `desktop/28-privacidade.png` |
| 29 | Termos & Condições | `/termos` | `desktop/29-termos.png` |
| 30 | Política de Cookies | `/cookies` | `desktop/30-cookies.png` |
| 31 | O Nosso Processo (Craft) | `/craft` | `desktop/31-craft.png` |
| 32 | Guia de Cuidados | `/cuidados` | `desktop/32-cuidados.png` |
| 33 | Destaques | `/destaques` | `desktop/33-destaques.png` |
| 34 | Sale | `/sale` | `desktop/34-sale.png` |
| 35 | Novidades | `/novidades` | `desktop/35-novidades.png` |
| 36 | Guia de Materiais | `/guide` | `desktop/36-guide-materiais.png` |
| 37 | Colecção — Ofício | `/colecoes/oficio` | `desktop/37-colecao-oficio.png` |
| 38 | 404 (página não existente) | `/<qualquer>` | `desktop/38-404.png` |

## Mobile (390 × 844 — iPhone 14)

| # | Página | URL | Print |
|---|---|---|---|
| 01 | Homepage | `/` | `mobile/01-home.png` |
| 02 | Loja | `/loja` | `mobile/02-loja.png` |
| 03 | PDP — produto | `/loja/fil-ecosse-classic-preto` | `mobile/03-pdp-product.png` |
| 04 | Packs (Lion Box) | `/packs` | `mobile/04-packs.png` |
| 05 | Carrinho | `/carrinho` | `mobile/05-carrinho.png` |
| 06 | Sobre | `/sobre` | `mobile/06-sobre.png` |
| 07 | Material — Seda | `/materiais/seda` | `mobile/07-materiais-seda.png` |
| 08 | FAQ | `/faq` | `mobile/08-faq.png` |
| 09 | Contacto | `/contacto` | `mobile/09-contacto.png` |
| 10 | Checkout success | `/checkout/success` | `mobile/10-checkout-success.png` |
| 11 | Lion's Circle | `/lions-circle` | `mobile/11-lions-circle.png` |

---

## Notas para a review

- **Sprint actual**: optimização mobile (header sticky, hero 4:3, materiais 2-col com 5º centrado, Lion Box stack vertical com imagem 320px centrada e CTA centrada por baixo, footer 3-row com Brand inline + Coleções/Informação/Contacto+Newsletter + email + pledge).
- **Header desktop**: relative+sticky, transparente sobre o hero, preto sólido ao scrollar (>200px com hysteresis 80px).
- **Header mobile**: 64px sólido `#0A0A0A`, transparente em cima do hero, preto ao scrollar (threshold 20px instantâneo).
- **Hero mobile**: aspect-ratio 4:3, header sobrepõe a imagem (`margin-top: -64px`), tipografia clean (h1 22px, eyebrow 9px, sem subtítulo, CTA 10px).
- **Lion Box mobile**: stack vertical, imagem 320px centrada (4:3), CTA "Ver todas as Caixas →" centrada por baixo de tudo.
- **Materiais mobile**: 2-col com 5º card "Alma" centrado sozinho via `:last-child:nth-child(odd)` + `grid-column: 1/-1` + `max-width: calc(50% - 10px)`.
- **Bestsellers**: 4 cards em 2-col mobile / 4-col desktop, escalado via clamp.
- **Footer mobile**: Brand row inline (full-width) → Coleções | Informação+Legal → Newsletter | Contacto (lado-a-lado) → email full → pledge → payments → bottom bar.
- **Materiais lançamento**: Fio da Escócia (Ofício) €13–18, Lã Merino (Ribeira) €19–22, Seda (Lello) €23+, Cashmere (Reserva), Algodão Penteado (Alma).
- **Packs**: Lion Entry Box (2 pares €24,90), Essentials (3 pares €34,90), Connoisseur (5 pares €69,90), Gentleman's Collection (12 pares €169). + Build Your Own (3/5/12 com -10/-12/-17%).
- **Decisões fixas**: só Homem no lançamento (Mulher para depois), envio grátis +€49, dourado unificado #B8960C.

## Pendentes / a melhorar

1. Imagens de produto reais (60% dos cards usam SVG placeholders genéricos).
2. Página `/loja/mulher` está vazia (sem produtos ainda).
3. Bug gramatical: alguns sítios dizem "o Seda" → devia ser "a Seda".
4. Algumas badges em vermelho/verde (em PDPs) — deviam ser tons neutros (preto, dourado, cinza).
5. AnnouncementBar varia entre "Portes grátis +€49" e mensagem de materiais — fixar mensagem definitiva.
6. Hero mobile: o utilizador sente que a imagem ainda fica meio cortada em alguns telemóveis — possível ajuste de `object-position` no futuro.
