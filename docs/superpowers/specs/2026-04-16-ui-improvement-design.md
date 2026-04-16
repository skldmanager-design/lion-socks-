# Lion Socks UI Improvement — Design Spec

**Data:** 2026-04-16
**Abordagem:** Hybrid Sprint (Fase 1 + 2 + 3)

---

## Fase 1 — Fundacao (Correcoes Criticas)

### 1.1 Tipografia
- **Antes:** `--font-display: Cormorant Garamond`, `--font-body: Outfit`
- **Depois:** `--font-display: Playfair Display`, `--font-body: Inter`
- **Ficheiro:** `app/globals.css`

### 1.2 Header — Dimensoes DESIGN.md
- Utility row: 28px → 36px
- Logo row: 72px → 100px, logo 60px → 90px
- Scroll behavior: announcement + utility + logo colapsa com `max-height` transition, nav row fica sticky
- **Ficheiro:** `components/layout/Header.tsx`

### 1.3 Imagem partida
- `pack_editorial_desktop.png.png` → renomeado para `pack_editorial_desktop.png`
- Path corrigido no `HomeSections.tsx`

### 1.4 Tamanhos minimos de texto
- Badges/labels: 10px → 11px (ProductCard, AnnouncementBar, AddToCart)
- Eyebrow text: 11px → 12px (HomeSections, Testimonials, Packs page, Loja page)
- Privacy text: 11px → 12px
- **Regra:** Nenhum texto abaixo de 11px (exceto watermark decorativo)

### 1.5 Footer hover
- Links hover: `text-white` → `text-gold` (alinhado com brand guidelines)
- **Ficheiro:** `components/layout/Footer.tsx`

---

## Fase 2 — Elevacao Visual

### 2.1 ProductCard
- Badge border-radius: 2px → 4px (consistencia DESIGN.md)
- Material/type labels: 10px → 11px
- LION SOCKS watermark: reduzido para 9px com opacity 0.4 (mais subtil)

### 2.2 Page spacing padronizado
- Loja: `pt-32 lg:pt-40` → `pt-12 lg:pt-16` (sem header fixo gigante)
- Packs: `paddingTop: 60px` → `48px`, `paddingBottom: 80px` → `64px`
- Eyebrow tracking padronizado para `0.1em`-`0.15em`

### 2.3 Loading states
- AddToCart: estado `loading` com spinner animado + texto "A adicionar..."
- Botao desativado durante loading e apos adicao
- Cursor `wait` durante loading

### 2.4 Search button
- Adicionado `transition-colors duration-200` ao botao de pesquisa no header

---

## Fase 3 — Features em Falta

### 3.1 Pagina 404 customizada
- **Ficheiro novo:** `app/not-found.tsx`
- Escudo Lion Socks com opacity 0.3
- Eyebrow "404" em dourado
- Titulo serif: "Pagina nao encontrada"
- Dois CTAs: "Voltar ao Inicio" + "Explorar Loja"
- Background preto, consistente com brand

### 3.2 Testimonials ativados
- Componente `Testimonials.tsx` importado via `React.lazy()` no `HomeSections.tsx`
- Posicionado entre PacksSection e ManifestoSection
- Lazy loaded com `Suspense` (sem loading fallback visivel)

### 3.3 Lazy loading
- `Testimonials` carregado com `React.lazy()` + `Suspense`
- Abaixo do fold, so carrega quando necessario

---

## Ficheiros modificados

| Ficheiro | Tipo |
|----------|------|
| `app/globals.css` | Fonts corrigidas |
| `components/layout/Header.tsx` | Dimensoes + scroll behavior |
| `components/layout/Footer.tsx` | Hover dourado |
| `components/layout/AnnouncementBar.tsx` | Font size 11px |
| `components/home/HomeSections.tsx` | Eyebrow sizes + Testimonials import + image fix |
| `components/home/Testimonials.tsx` | Font sizes |
| `components/product/ProductCard.tsx` | Badge/label sizes + border-radius |
| `components/product/AddToCart.tsx` | Loading state |
| `app/loja/page.tsx` | Spacing + eyebrow size |
| `app/packs/page.tsx` | Spacing + eyebrow size |
| `app/not-found.tsx` | Novo — pagina 404 |
| `public/.../pack_editorial_desktop.png` | Renomeado (removido .png.png) |

---

## Validacao

- TypeScript: 0 erros
- Dev server: todas as paginas 200
- 404 page: respondendo corretamente
