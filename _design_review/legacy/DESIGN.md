# DESIGN.md — Lion Socks

Brand identity reference. Ler antes de qualquer implementação visual.

---

## Brand

Nome: Lion Socks
Origem: Portugal
Posicionamento: Meias premium clássicas. Luxo discreto. Para quem repara nos detalhes.
Tom: Elegante, confiante, minimal. Nunca excessivo.

---

## Cores

--color-black:        #0A0A0A   (fundo principal, nav, announcement bar)
--color-off-white:    #F5F3EE   (fundo de página, secções claras)
--color-gold:         #B8960C   (acento, CTAs, badges, links, texto destaque)
--color-gold-light:   #D4AF37   (hover de elementos dourados)
--color-navy:         #0D1B2A   (fundo dos cards de produto — estilo padrão)
--color-charcoal:     #2C2C2C   (superfícies dark secundárias)
--color-muted:        #6B6B6B   (texto secundário, metadata)
--color-border:       #E8E5DF   (divisores em fundos claros)
--color-border-dark:  #2A2A2A   (divisores em fundos escuros)

---

## Tipografia

Headings:  'Playfair Display', Georgia, serif
Body:      'Inter', system-ui, sans-serif
Labels:    'Inter', uppercase, letter-spacing: 0.08em

Tamanhos:
  11px — labels, badges, metadata, notas legais
  13px — body small, captions, links secundários
  14px — body padrão em componentes
  15px — body default de página
  18px — subheadings, preços em destaque
  24px — títulos de secção small
  28px — títulos de secção medium
  36px — títulos de secção
  42px — títulos grandes, manifesto
  52px — hero headline

Pesos: 400 regular, 500 medium, 600 semibold (só headings)
Itálico: Playfair Display italic — usado no manifesto e citações

---

## Transições

Token global aplicado a todos os elementos interativos:
  transition: all 200ms ease

Usar em: cards, botões, links, swatches, acordeão, seletores de tamanho, hover states.
Nunca usar transições acima de 300ms.

---

## Layout

Max-width conteúdo: 1280px
Padding secções: 80px vertical desktop, 48px mobile
Grid produtos: 4 colunas desktop, 2 tablet, 1 mobile
Gap cards: 24px
Border radius: 4px (brand é sharp, não rounded)

---

## Componentes

### Announcement Bar
- Fundo: #0A0A0A
- Texto: dourado #B8960C, 10px uppercase tracked (0.08em), centrado, weight 500
- Conteúdo: "ENVIO GRATUITO EM COMPRAS ACIMA DE €45"
- Altura: 24px, posição fixa no topo acima da nav
- Botão fechar: X 11px à direita (right 12px), off-white, estado guardado em localStorage
- Scroll: esconde quando scrollY > 20px (transform translateY(-100%) + opacity 0, transition 300ms)
- Actualiza CSS var --announcement-height de 24px → 0px ao esconder

### Header (layout empilhado)

Estrutura vertical em 3 linhas, abaixo da announcement bar:

┌─────────────────────────────────────────────────────────┐
│  [ENVIO GRATUITO ACIMA DE €45]                   ✕     │  24px   announcement (fora do header)
├─────────────────────────────────────────────────────────┤
│  👤 INICIAR SESSÃO                      🛒 CARRINHO   │  36px   utility row
├─────────────────────────────────────────────────────────┤
│                                                         │
│                  [ LION SOCKS logo ]                    │  100px  logo row
│                                                         │
├─────────────────────────────────────────────────────────┤
│   NOVIDADES  HOMEM  MULHER  PACKS  SALE        🔍      │  56px   nav row (sticky)
└─────────────────────────────────────────────────────────┘

Fundo: todas as linhas em #0A0A0A sólido (nunca transparente, nunca blur)
Z-index: 30

Utility row (36px):
  Padding: 0 40px
  Layout: justify-between
  Esquerda: "INICIAR SESSÃO" (icon User + label)
  Direita: "CARRINHO" (icon ShoppingBag + label + badge)
  Estilo links: Inter 11px uppercase tracking 0.08em, color #F5F3EE
  Hover: color #B8960C, transition 200ms
  Cart badge (se totalItems > 0): círculo dourado 6px top-right do ícone

Logo row (100px):
  Logo completo transparente: 90px altura, centrado
  Imagem: /lion_socks_brand_kit/01_logo_principal/logo_completo_transparente_1000h.png (528×1000)

Nav row (56px):
  Padding: 0 40px
  Layout: items centrados, search absolute à direita
  Nav items: NOVIDADES · HOMEM · MULHER · PACKS · SALE
  Gap entre items: 40px
  Estilo: Inter 13px uppercase tracking 0.08em, color #F5F3EE, weight 500
  Hover: color #B8960C, transition 200ms
  Highlight (SALE): color #B8960C por defeito
  Search icon: 20px, absolute right 40px, top 50%
  Altura total do header (sem announcement): 192px (36 + 100 + 56)
  Altura total com announcement: 216px (24 + 192)

Arquitectura sticky:
  <header> é position: relative (não fixed)
  AnnouncementBar é position: relative (não fixed), fora do <header>
  Nav row é position: sticky; top: 0 — agarra-se ao topo ao scrollar
  Main não tem paddingTop reservado — header ocupa espaço natural no fluxo

scrollY > 20px:
  AnnouncementBar: max-height 24 → 0, transition 300ms
  Utility + logo rows: max-height 136 → 0, transition 350ms
  Nav row: sticky, permanece fixa no topo (56px)
  
Resultado: apenas 56px de nav visível ao scrollar, zero gaps, 
conteúdo sobe suavemente para debaixo da nav sticky.
  Mobile scrolled: mini-logo completo 38px aparece ao centro da nav row

Hover dos nav items:
  Underline dourada 1px animada do centro para fora
  Transition: left 300ms ease, right 300ms ease
  Sem chevrons — feedback visual é só a underline

Triggers do mega-menu:
  hover: abre com 150ms delay
  mouse-out: fecha com 200ms delay
  click link: fecha imediato

### Mega-Menu

Posição:      absolute, full-width, top = height da nav + announcement bar
Fundo:        #0A0A0A sólido
Border:       top/bottom 1px #2A2A2A
Max-width:    1280px, centrado
Padding:      60px vertical, 40px horizontal
Z-index:      25 (abaixo do header)

Colunas:
  gap 60px entre colunas
  min-width 180px por coluna
  
Título de coluna:
  Playfair Display, 11px, uppercase, tracking 0.12em
  color: #B8960C
  margin-bottom: 20px

Links:
  Inter 14px, weight 400
  color: #F5F3EE
  hover: #B8960C, transition 200ms
  padding 8px 0 entre linhas

Preços inline (packs):
  Inter 14px weight 500
  color: #B8960C
  margin-left 8px do label

Editorial slot (typographic still-life):
  width 320px, aspect-ratio 4/5
  fundo #0A0A0A, border 1px #2A2A2A
  Overline: Playfair 14px dourado
  Headline: Playfair italic 42px off-white
  Sublinha: Inter 11px uppercase tracked dourado
  Divisor: 40px x 1px dourado
  Body: Inter 13px muted, max 240px
  CTA: Inter 11px uppercase tracked dourado, hover aumenta tracking

Triggers:
  hover: abre com 150ms delay
  mouse-out: fecha com 200ms delay

Dropdown simples (Novidades, Sale):
  position absolute, min-width 240px
  Mesmo fundo e border que mega-menu
  Padding 20px vertical, 0 horizontal
  Links 14px, padding 10px 28px

### Product Card — Estilo Padrão (sem fotografia)
Este é o estilo intencional actual. Não é um fallback.

Zona superior (65%):
- Fundo: #0D1B2A
- Nome: Playfair Display, dourado, centrado, 16px
- Sub-linha cor/padrão: Inter 12px muted, centrado
- "LION SOCKS": Inter 10px uppercase tracked muted, fundo da zona

Zona inferior (35%):
- Fundo: #F5F3EE
- Badge material: 10px uppercase tracked dourado (ex: "FIL D'ÉCOSSE")
- Sub-badge corte: 10px uppercase tracked muted (ex: "MID-CALF")
- Preço: Inter 15px medium, direita
- Nome completo: Inter 14px preto
- Cor: Inter 13px muted
- Swatches: círculos 10px cor real, esquerda

Hover: translateY(-2px), border 1px solid #B8960C, transition 200ms

Badges DESTAQUE / EXECUTIVE: top-left zona superior, fundo #B8960C, texto preto, 10px uppercase, padding 4px 8px

Product Card com Fotografia (futuro):
- Zona superior: fotografia object-fit cover
- Zona inferior: igual ao padrão
- Hover: igual

### Seletor de Tamanho
Normal:    fundo branco, border 1px #E8E5DF, Inter 14px preto, padding 12px 20px, radius 4px
Hover:     border 1px #B8960C, transition 200ms
Selecionado: fundo #0A0A0A, border #0A0A0A, texto off-white
Indisponível: texto muted, linha diagonal cinzenta, cursor not-allowed

### Acordeão
Fechado:  Inter 15px preto, "+" à direita, border-bottom 1px #E8E5DF, padding 16px 0
Hover:    texto dourado, transition 200ms
Aberto:   Inter 15px medium, "−", conteúdo Inter 14px muted, padding 12px 0 20px
Animação: max-height transition 200ms ease

### Botões
CTA outline:         transparente, border 1px #B8960C, 12px uppercase tracked, padding 14px 28px
                     Hover: fundo #B8960C, texto preto
Adicionar Carrinho:  fundo #0A0A0A, off-white 13px uppercase, 100% largura, padding 16px 24px
                     Hover: fundo #B8960C, texto preto
Link textual:        dourado #B8960C, 13px, hover underline

---

### Hero (home)

Band contido de 640px altura (não full-viewport).
Slider horizontal com 2 slides: HOMEM + MULHER.

Imagens:
  HOMEM desktop: /lion_socks_brand_kit/05_hero_banner/hero_meias_desktop_clean.jpg
  HOMEM mobile:  /lion_socks_brand_kit/05_hero_banner/hero_meias_mobile.jpg
  MULHER desktop: /lion_socks_brand_kit/05_hero_banner/hero-mulher-desktop.jpg
  MULHER mobile:  /lion_socks_brand_kit/05_hero_banner/hero-mulher-mobile.jpg

Background-position:
  HOMEM: center (assunto do lado esquerdo na imagem)
  MULHER: left center (dar espaço ao texto à direita)

Overlay:
  linear-gradient(90deg, transparent 0%, transparent 35%, 
  rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.75) 100%)
  
  Escurece só o terço direito onde está o texto. Lado esquerdo
  fica limpo para mostrar a fotografia.

Content layout:
  Max-width 1280px, margin auto, padding 0 60px
  Flex, items-center, justify-end (texto à direita)
  Largura do bloco de texto: 480px
  Alinhamento do texto interno: right

Tipografia:
  Overline: Inter 11px uppercase tracking 0.12em, color #B8960C
  Headline: Playfair Display clamp(36px, 5vw, 56px), weight 500, off-white,
            lineHeight 1.15, pre-line (\n respeitado)
  Subtitle: Inter 14px, weight 300, color rgba(245,243,238,0.85), max 420px
  CTA: border 1.5px #B8960C, background rgba(10,10,10,0.55) + backdrop-blur 4px,
       texto off-white, hover fundo dourado + texto preto

Slider controls:
  Setas: 28px, off-white, absolute left/right 32px, top 50%, opacity 0.6, hover 1
  Dots: bottom 32px, centered, active 28x4px dourado, inactive 6x4px off-white/40

Auto-advance: 6000ms, pausa no hover

Altura mobile: 560px (mantém)
Text block em mobile: full-width, text-left, padding 24px
Overlay em mobile: mais forte (rgba 0.6 de 0% a 100%) para legibilidade

## Páginas existentes

Homepage    /                Hero slider funcional. Secções abaixo em falta.
Loja        /loja            Grid com filtros sidebar. Cards estilo padrão navy.
Packs       /packs           Packs curados + build-your-own funcional.
Materiais   /materiais/*     Páginas editoriais por material.
Produto     /loja/[slug]     Layout split, seletor tamanho, acordeão, stock indicator.
Sobre       /sobre           Brand story.

---

## Regras

DO:
- Serif em todos os headings e nomes de produto
- Dourado só como acento — nunca fundo em áreas grandes
- Whitespace generoso entre secções
- Transition 200ms ease em tudo interactivo
- Copy concisa e confiante

DON'T:
- Border radius acima de 4px
- Branco puro — usar sempre #F5F3EE
- Misturar mais de 2 fontes
- Texto dourado em fundo dourado
- Placeholders cinzentos genéricos
- Transições acima de 300ms
- Nav com blur ou transparência no scroll

## Changelog

- 2026-04-08: Logo altura 48px → 90px. Nav altura 72px → 120px. Decisão do Pedro para dar mais presença à marca.
- 2026-04-08 (Ronda 2): Mega-menu adicionado. Nav passa a ter NOVIDADES · HOMEM · MULHER · PACKS · SALE. Materiais integrado dentro de Homem/Mulher como coluna "Por Material". Editorial slots usam typographic still-lifes até haver fotografia real.
- 2026-04-08 (Ronda 3): Header passa a layout empilhado estilo Pantherella 
  (utility row + logo row + nav row). Hero reduzido de full-viewport para 
  band 560px com texto à direita. Logo muda para escudo + tipografia "LION SOCKS" 
  separada (preparado para substituir a tipografia por Solaris no futuro).

- 2026-04-08 (Ronda 3.1): Header sem separadores visuais (fluido). 
  Sticky scroll: utility + logo escondem, nav permanece. 
  Chevrons removidos, underline dourado animado no hover. 
  Texto "LION SOCKS" removido, escudo aumentado 70 → 85px.
  Hero: imagem HOMEM corrigida (hero_meias_desktop_clean.jpg). 
  Altura 560 → 640px. Overlay/headline/CTA reforçados.

- 2026-04-08 (Ronda 3.2): 
  Logo Header: escudo sozinho → logo completo transparente (528×1000), 85 → 110px.
  Announcement bar: 36px → 24px, font 11 → 10px.
  Announcement bar passa a esconder ao scrollar junto com utility + logo.
  Body background: branco (bug) → preto #0A0A0A (fix white flash).
  Substituídas 3 referências fantasmas a /logo.png em HomeSections.tsx e Footer.tsx.
  Header ganha transition top 300ms ease para reposicionamento suave.

- 2026-04-08 (Ronda 3.3): 
  Refactor estrutural: header e announcement bar deixam de ser fixed, 
  passam a fluxo normal. Nav row passa a position: sticky — resolve 
  definitivamente o problema da "faixa preta" visível ao scrollar.
  Mega-menu passa de fixed para absolute (ancorado à nav sticky).
  Header comprimido: logo row 140 → 100px, logo 110 → 90px, total 
  inicial 256 → 216px.
  Utility row: "Sign In" → "Iniciar Sessão" (esquerda), 
  "Cart" → "Carrinho" (direita).
  Removido paddingTop 256px do <main> em layout.tsx.
  Removida CSS var --announcement-height (já não necessária).

Última actualização: 2026-04-08 (Ronda 3.3)
