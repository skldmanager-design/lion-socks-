# CLAUDE.md — Lion Socks (Estado a 16 Abr 2026)

## 1. Quem sou eu (Pedro)
- Empreendedor em Porto, Portugal
- Comunico em PT-PT
- Stack: VS Code, Claude Code (Pro)
- Claude.ai = arquitecto, Claude Code = pedreiro
- Trabalho iterativo: testo visualmente, dou feedback
- Sou directo, PT informal

## 2. O projecto — Lion Socks
- Website e-commerce de meias clássicas premium
- Stack: Next.js 16.2.1 + Turbopack + Tailwind CSS + TypeScript
- Porta dev: 3000
- E-commerce: Shopify Storefront API (decidido)
- DESIGN.md é a referência visual — ler SEMPRE antes de implementar
- Brand kit: `public/lion_socks_brand_kit/` (8 pastas numeradas, 08_site/ para imagens exclusivas do site)
- Skills em `.claude/skills/`: brand-guidelines, component-patterns, shopify-integration, copywriting

## 3. Identidade da Marca
- Posicionamento: premium, old money, elegância clássica, luxo discreto
- Cores: Dourado #B8960C (unificado) + Preto #0A0A0A
- CTA: "DESCOBRIR COLECÇÃO" (vocabulário luxo, nunca "comprar agora")
- SALE em dourado (não vermelho)
- 3 pilares de marca: POR DEFINIR (sugestão: Origem / Matéria / Discrição)
- Público: Homem, 25-60 anos (só homem no lançamento, feminina para depois)
- Referências: Falke, Pantherella, Westminster, Ameias

## 4. Catálogo
- Materiais lançamento: Fio da Escócia (€13-18), Lã Merino (€19-22), Cashmere (topo). Silk adiada.
- Paleta: máximo 8 cores rotativas (Preto, Cinza carvão, Azul marinho, Castanho chocolate, Cinza médio + 3 accent sazonais)
- Comprimentos: Mid-calf, Over-the-calf/Knee-high (+€2-3), No-show (só fil d'Écosse)
- 10 designs base: 5 padrões (Houndstooth, Pin dots, Argyle, Riscas finas, Mini chevron) + 5 sólidas/texturas (Lisa, Canelada, Jacquard, Micro-relevo, Mélange)
- Total estimado: ~276 SKUs (96 fil d'Écosse + 140 merino + 40 cashmere)
- 21 produtos detalhados + 4 bundles definidos
- Produto-bandeira: "Silk Riscas Finas Preto/Dourado"

## 5. Packs e Embalagens
- Pack 3 e 5: Caixa de metal (logo embossed)
- Pack 12: Caixa gaveta (drawer box, tipo Apple)
- Packs fixos: "The Essentials" (3), "The Connoisseur" (5), "The Gentleman's Collection" (12, -19%)
- Build Your Box: 3 (-10%), 5 (-12%), 12 (-17%)
- Envio gratuito: acima de €49

## 6. Estado do Site (última sessão: 9 Abril)

### Header (DEFINITIVO — Ronda 3.3)
- Arquitectura: relative (não fixed) → Nav sticky top:0 → zero gap
- Alturas: Announcement 24px + Utility 36px + Logo 100px + Nav 56px = 216px total, 56px scrolled
- Logo: logo_completo_transparente_1000h.png a 90px
- Mega-menu: absolute top:100%
- Body background: #0A0A0A

### Páginas implementadas
- Homepage (hero 640px), /loja, /packs, /materiais/seda, /materiais/fil-d-ecosse, /materiais/la-merino, /sobre, /lions-circle (waitlist)

### Bugs resolvidos (9 Abril)
- 3 dourados → #B8960C, 3 refs fantasmas /logo.png, white flash, faixa preta ao scroll, mega-menu posição, logo 90px, manifesto responsive

### Bugs PENDENTES
1. Imagens na Loja — placeholders genéricos com logos Nike/Gucci → substituir
2. Alt text partido em alguns cards
3. Badges vermelho/verde → tons neutros (preto, dourado, cinza)
4. "o Seda" → "a Seda" (erro gramatical)
5. AnnouncementBar — mensagem mudou para materiais, devia ser envio gratuito
6. Header sobrepõe logo em algumas situações

## 7. Ficheiros-chave
- `components/layout/Header.tsx`
- `components/layout/AnnouncementBar.tsx`
- `components/layout/MegaMenuPanel.tsx`
- `components/home/Hero.tsx`
- `components/home/HomeSections.tsx`
- `app/globals.css`
- `app/layout.tsx`
- `DESIGN.md`

## 8. Decisões fixas — não reabrir
- Nome: Lion Socks
- Só homem no lançamento
- Materiais: Fio da Escócia + Merino + Cashmere (Silk depois)
- Max 8 cores
- Metal (3,5) + Gaveta (12)
- Next.js + Tailwind + Shopify Storefront API
- Envio gratuito €49
- Dourado #B8960C, fundo #0A0A0A
- Header relative+sticky (não fixed), 56px scrolled

## 9. Próximos passos
1. Decisão fundo branco vs preto + 3 pilares de marca
2. Corrigir bugs visuais pendentes (imagens, badges, gramatical)
3. Hover zoom no slot Packs
4. Conteúdo visual — 60% produtos sem fotos (gerar com IA)
5. Hero mobile + afinação
6. Páginas produto (/loja/[slug])
7. Build Your Box interactivo

## 10. Conexões com outros projetos
- **Valsport/SOCKLAND** — empresa que produz as meias (71 produtos, 208 variações, Product-Pilot como ERP)
- **Sock-Converter** — conversão imagens → BMP para máquinas Wei Huan, partilha recursos visuais

## 11. Como interagir comigo
- Ler DESIGN.md SEMPRE antes de implementar
- Ler skills em .claude/skills/ antes de código novo
- Prompt completo para Claude Code (não comandos)
- Sou directo, PT informal
- Não me digas para descansar
