# AI Chat Widget — Design Spec

**Data:** 2026-04-30
**Componente:** `components/ai/AiChatWidget.tsx`
**Estado:** design aprovado, pronto a implementar

---

## Objectivo

Definir a apresentação visual e o comportamento do widget de assistente Lion Socks que abre quando o utilizador clica no botão circular "Ajuda" (canto inferior esquerdo, alinhado com o ScrollToTop à direita). O widget esclarece dúvidas sobre tamanhos, materiais, encomendas e devoluções, com tom premium PT-PT consistente com a marca.

## Contexto

- **Stack:** Next.js 16 + Tailwind v4 + TypeScript
- **Backend:** Product-Pilot (PL) coordena auth/catálogo/checkout/email
- **Marca:** old-money premium PT-PT — referências Pantherella, Loro Piana, Hermès
- **Paleta:** Preto `#0A0A0A` + Dourado `#B8960C` + Creme `#F5F3EE`
- **Tipografia:** Playfair Display (display) + Inter (body)
- **Componente actual:** já existe stub em `components/ai/AiChatWidget.tsx` com botão circular. Painel precisa redesign.

## Decisões consolidadas

| # | Decisão | Razão |
|---|---|---|
| 1 | **Popover bottom-left** (não drawer, não modal, não bottom-sheet) | Padrão consistente desktop+mobile. Respeita contexto, não invade. Igual a Pantherella/Hermès |
| 2 | **Welcome state com greeting + 5 quick reply chips** | Reduz fricção em utilizador premium. Cada chip lança resposta inicial específica |
| 3 | **Estética "light editorial"** — fundo creme `#F5F3EE`, header preto, mensagens em pílulas | Combina com paleta da homepage. Não força contraste agressivo |
| 4 | **Mobile = popover pequeno consistente** (`min(380px, 90vw) × min(540px, 75vh)`) | Coerência visual com desktop. Bottom-sheet seria iOS-feel, não premium |
| 5 | **Persistência via localStorage entre sessões** (50 mensagens FIFO) | Continuidade quando user volta dias depois. User é dono do device |
| 6 | **Saudação dinâmica por hora** (Bom dia / Boa tarde / Boa noite) | Sinal humano subtil sem afectação |
| 7 | **Identidade "LION SOCKS · CONCIERGE"** — sem nome fictício | Marcas premium PT não usam personas. "Henrique" criaria expectativa de pessoa real |

## Anatomia visual

```
┌───────────────────────────────────────┐  Painel:
│ Lion Socks                       ✕    │  bg #F5F3EE
│ CONCIERGE                             │  border 1px rgba(184,150,12,0.18)
├───────────────────────────────────────┤  border-radius 8px
│                                       │  shadow 0 12px 40px rgba(10,10,10,0.12)
│   Boa tarde.                          │
│   Em que podemos ajudar?              │
│                                       │
│   [Tamanhos] [Materiais]              │
│   [Encomenda] [Devolução]             │
│   [Falar com a equipa]                │
│                                       │
│   Para questões mais sensíveis,       │
│   escreva-nos para info@lionsocks.pt  │
│                                       │
├───────────────────────────────────────┤
│ Escreva uma mensagem…           →     │
└───────────────────────────────────────┘
   380×540 desktop · 90vw×75vh mobile
   bottom 24px · left 24px
```

### Painel raíz

| Propriedade | Valor |
|---|---|
| Position | `fixed`, bottom 24px, left 24px |
| Largura | `min(380px, 90vw)` |
| Altura | `min(540px, 75vh)` |
| Background | `#F5F3EE` |
| Border | `1px solid rgba(184,150,12,0.18)` |
| Border-radius | `8px` |
| Box-shadow | `0 12px 40px rgba(10,10,10,0.12)` |
| Z-index | 40 |
| Animação abrir | `opacity 0→1 + translateY(8px→0)` em 280ms `cubic-bezier(0.22, 1, 0.36, 1)` |
| Animação fechar | inverso + scale 0.97 em 200ms |

### Header (64px, sticky topo)

- Background: `#0A0A0A`
- Padding: `16px 18px`
- **Esquerda**:
  - Title: "Lion Socks" — Playfair Display 18px / 500 / `#F5F3EE`
  - Eyebrow: "CONCIERGE" — Inter 9px / 500 / tracking 0.32em / `#B8960C` / uppercase
- **Direita**:
  - Botão "Iniciar nova conversa" (texto Inter 10px tracking 0.18em dourado) — só visível se houver histórico
  - Separador `|` cinza 1px
  - Botão fechar (✕) — `lucide:X` 16px / hover dourado
- Border-bottom: `1px solid rgba(184,150,12,0.25)`

### Body (scroll vertical)

- Padding: `20px 16px`
- Background: `#F5F3EE` (herdado do painel)
- Scroll-behavior: `smooth`
- Auto-scroll para fim quando nova mensagem chega

### Welcome state

Quando `messages.length === 0`:

```
{greeting}.                                  ← Playfair italic 22px / 400 / #0A0A0A
Em que podemos ajudar?                        ← Inter 14px / 400 / #424242

[chip] [chip] [chip] [chip]                   ← grid wrap, gap 8px
[chip largo: Falar com a equipa]

—————————————————                            ← divisor 24px gold rule
Para questões mais sensíveis,                 ← Inter 11px italic / #6B6B6B
escreva-nos para info@lionsocks.pt
```

`{greeting}` é `Bom dia` / `Boa tarde` / `Boa noite` calculado por `new Date().getHours()`.

### Quick reply chips

| Propriedade | Valor |
|---|---|
| Background | `transparent` |
| Border | `1px solid #0A0A0A` |
| Color | `#0A0A0A` |
| Padding | `8px 14px` |
| Font | Inter 12px uppercase tracking 0.14em / weight 500 |
| Border-radius | `999px` (pílula) |
| Hover | bg `#0A0A0A` + color `#F5F3EE` (invert) — transition 200ms |
| Click | dispara `handleQuickReply(label)` que adiciona mensagem user + invoca AI com prompt |

### Mensagens

**Mensagem do utilizador (user):**
- Alinhada à direita (`align-self: flex-end`)
- Pílula `#0A0A0A` / texto `#F5F3EE`
- Padding `10px 14px`
- Border-radius `12px` excepto canto inferior direito = `4px` (speech bubble)
- Inter 14px / 400 / lineHeight 1.5
- Max-width `80%`

**Mensagem do concierge (assistant):**
- Alinhada à esquerda
- Pílula `#FFFFFF` / border `1px solid rgba(10,10,10,0.06)` / texto `#1F1F1F`
- Padding `12px 16px`
- Border-radius `12px` excepto canto inferior esquerdo = `4px`
- Inter 14px / 400 / lineHeight 1.55
- Max-width `85%`

**Typing indicator** (enquanto AI responde):
- Pílula assistente com 3 dots dourados (`#B8960C`) 6px diâmetro
- Animação: `opacity 0.3→1` staggered (0ms / 180ms / 360ms), loop 1.4s
- Respeita `prefers-reduced-motion`

### Footer (input, 64px)

- Background: `#FFFFFF`
- Border-top: `1px solid rgba(10,10,10,0.06)`
- Padding: `12px 16px`
- Input: `flex: 1`, transparent, Inter 14px, placeholder `#9E9E9E` "Escreva uma mensagem…"
- Botão enviar: `lucide:ArrowRight` 18px dourado, disabled enquanto input vazio
- Enter envia, Shift+Enter quebra linha

## Fluxos de interacção

### F1 — Primeira abertura (sem histórico)
1. User clica botão circular "Ajuda" (bottom-left)
2. Botão fade-out (opacity + scale 0.92) 200ms
3. Painel fade-in + translateY 280ms
4. Welcome state visível: greeting dinâmico + 5 chips + disclaimer

### F2 — Click num quick reply
1. Chip vira mensagem user (slide-in)
2. Welcome state desaparece (chips + disclaimer)
3. Typing indicator aparece (300ms delay)
4. Resposta inicial específica do concierge aparece
5. Conversa continua em texto livre

**Quick replies — respostas iniciais (texto fixo):**

| Chip | Resposta |
|---|---|
| Tamanhos | "Os tamanhos Lion Socks são em 3 cortes — 39–42, 42–45, 45–48. Se estiver entre dois, recomendamos sempre o maior. Quer-me dizer o seu número?" |
| Materiais | "Trabalhamos cinco fibras: Fio de Escócia, Lã Merino, Seda, Cashmere, Algodão Penteado. Quer saber qual lhe convém para uma ocasião em particular?" |
| Encomenda | "Posso ajudar a localizar uma encomenda. Tem o número de encomenda à mão? (Aparece no email de confirmação.)" |
| Devolução | "Aceitamos devoluções até 30 dias após a entrega, sem custos para Portugal Continental. Quer iniciar uma devolução?" |
| Falar com a equipa | "Com todo o gosto. Escreva-nos para info@lionsocks.pt — respondemos em 24h úteis." |

### F3 — Mensagem de texto livre
1. User escreve no input + Enter
2. Mensagem user aparece, input limpa
3. Typing indicator
4. POST → backend AI (PL endpoint TBD)
5. Resposta streaming ou completa aparece
6. Auto-scroll para fim

### F4 — Reabrir com histórico
1. User clica botão "Ajuda"
2. Painel abre directamente em modo conversa (skip welcome)
3. Carrega `localStorage[lion_socks_chat_history]`
4. Mostra últimas N mensagens (50 max)
5. Botão "Iniciar nova conversa" visível no header

### F5 — Iniciar nova conversa
1. Click no botão "Iniciar nova conversa" no header
2. Confirm dialog inline: "Limpar histórico de conversa?" [Sim] [Cancelar]
3. Se sim: limpa `localStorage`, volta a welcome state

## Estados especiais

### Erro de rede
- Pílula assistente em `#EDE9DF` (creme escurecido)
- Texto "Não consegui responder agora." + botão dourado pequeno "Tentar de novo →"

### Backend offline (PL down)
- Banner subtil no topo do body
- Background `rgba(184,150,12,0.08)`
- Inter 11px / `#0A0A0A`
- Texto: "A funcionar em modo limitado. Para questões urgentes, info@lionsocks.pt"

### Mensagem com link
- Texto sublinhado dourado, `text-underline-offset: 2px`
- Abre em nova aba (`target="_blank"`, `rel="noopener noreferrer"`)

## Persistência

- **Storage:** `localStorage["lion_socks_chat_history"]`
- **Schema:** `Array<{ role: 'user' | 'assistant', content: string, ts: number }>`
- **Limite:** 50 mensagens (rotação FIFO se exceder — `slice(-50)` ao guardar)
- **Privacy:** **não ofuscar** dados localmente (user é dono do device). Ofuscar emails/telefones **apenas** se backend PL fizer logging de conversas (regex client-side antes de POST).
- **Reset:** botão "Iniciar nova conversa" no header → `localStorage.removeItem(...)` + `setMessages([])`

## Acessibilidade (a11y)

- `role="dialog"` `aria-label="Chat com concierge Lion Socks"` `aria-modal="false"` (popover, não bloqueia)
- Focus trap dentro do painel quando aberto
- **ESC** fecha
- **Enter** envia, **Shift+Enter** quebra linha
- Tab: ciclo entre chips → input → botão enviar → "Iniciar nova conversa" → fechar
- `prefers-reduced-motion`: desliga typing dots animation e suaviza transitions para 100ms
- Contraste verificado: pílula user (`#0A0A0A` bg / `#F5F3EE` text) = 16.8:1 ✓ AAA. Pílula assistente (`#FFFFFF` bg / `#1F1F1F` text) = 16:1 ✓ AAA

## Performance

- **Lazy-load:** widget é dynamic import via `next/dynamic` no `app/layout.tsx` — só carrega bundle quando user clica em "Ajuda"
  ```tsx
  const AiChatWidget = dynamic(() => import('@/components/ai/AiChatWidget'), { ssr: false })
  ```
- localStorage só lido client-side (`useEffect`)
- `prefers-reduced-motion` desliga animações pesadas
- Typing indicator usa CSS keyframes (não JS)

## Estrutura de ficheiros

```
components/ai/
  ├── AiChatWidget.tsx          # componente principal (dynamic import target)
  ├── ChatMessage.tsx           # render de uma mensagem (user/assistant)
  ├── QuickReplies.tsx          # array de chips do welcome state
  ├── TypingIndicator.tsx       # 3 dots animados
  └── useChatHistory.ts         # hook para localStorage + estado
```

## Open questions / TODOs (não bloqueadores do design)

1. **AI provider:** OpenAI / Anthropic / outro? PL coordena ou widget chama directamente? — decisão de PL
2. **Streaming vs request-response:** se backend suporta SSE, preferir streaming para latência percebida menor
3. **Rate limiting client-side:** evitar spam — máx 30 mensagens / 5 minutos por session
4. **Telemetria:** quantas conversas iniciadas, quantas resolvidas no chat, quantas escalam para email — definir com PL
5. **Persistência pode reset entre redeploys?** Não — localStorage é client-side, sobrevive

## Não-objectivos

- ❌ Atendimento humano síncrono (live chat) — fora de scope V1
- ❌ Avatar/persona com nome fictício (decidido contra) — "Lion Socks · Concierge"
- ❌ Voice input — fora de scope V1
- ❌ File upload — fora de scope V1
- ❌ Multi-language — site é PT-PT only no launch

## Critérios de aceitação

- [ ] Painel abre com animação 280ms ao clicar no botão circular
- [ ] Welcome state mostra greeting dinâmico correcto para hora do dia
- [ ] 5 quick reply chips com hover invert visualmente correctos
- [ ] Click em chip dispara resposta inicial específica do texto definido
- [ ] Mensagens user/assistant com pílulas e cantos correctos (4px no canto inferior do lado de origem)
- [ ] Typing indicator com 3 dots dourados pulsantes
- [ ] localStorage persiste entre F5 reload
- [ ] Botão "Iniciar nova conversa" só aparece com histórico
- [ ] ESC fecha o painel
- [ ] Mobile (≤640px): painel é `90vw × 75vh` com bottom 16px / left 16px
- [ ] Lighthouse a11y ≥ 95 com painel aberto
