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
- Texto: dourado #B8960C, 11px uppercase tracked, centrado
- Conteúdo: "ENVIO GRATUITO EM COMPRAS ACIMA DE €45"
- Altura: 36px, posição fixa no topo acima da nav
- Botão fechar: X à direita, off-white, estado guardado em localStorage

### Navegação
- Fundo: #0A0A0A, altura: 72px
- Esquerda: links LOJA / PACKS / MATERIAIS (dropdown) / SOBRE
- Centro: logo SVG branco, 48px largura
- Direita: ícones lupa, conta, carrinho — off-white 20px
- Links: Inter 13px uppercase tracked, off-white, hover → dourado, transition 200ms
- Dropdown MATERIAIS: fundo preto, links Fil d'Écosse / Lã Merino / Seda
- Nav sticky, fundo preto sólido no scroll (sem blur, sem transparência)

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

Última actualização: 2026-04-08
