'use client'

import { useState, useRef, useEffect, useMemo, Fragment } from 'react'
import { MessageCircle, X, ArrowRight, Mail } from 'lucide-react'
import { apiPost, getToken } from '@/lib/api'

interface Message {
  role: 'user' | 'assistant'
  content: string
  /** chips de follow-up para mostrar SOB esta mensagem (assistente apenas) */
  followUps?: FollowUp[]
}

interface FollowUp {
  label: string
  reply: string
  followUps?: FollowUp[]
}

const STORAGE_KEY = 'lion-socks-cs-history'
const HISTORY_LIMIT = 50
const ESCALATION_THRESHOLD = 4 // após 4+ trocas, mostra CTA email permanente no fundo

/* ─── Quick replies (welcome state) — todas com follow-ups contextuais ──── */

const QUICK_REPLIES: FollowUp[] = [
  {
    label: 'Tamanhos',
    reply:
      'Os tamanhos Lion Socks são em três cortes — 39–42, 42–45, 45–48. Se estiver entre dois, recomendamos sempre o maior. Pode também consultar a [tabela de tamanhos completa](/guia-tamanhos).',
    followUps: [
      {
        label: 'Como medir o pé?',
        reply:
          'Coloque o pé descalço sobre uma folha A4, marque a ponta do dedo maior e o calcanhar, e meça a distância em cm. Some 0,5 cm para folga natural. O nosso [guia de tamanhos](/guia-tamanhos) inclui tabela de conversão EU/UK/US.',
      },
      {
        label: 'Estou entre dois tamanhos',
        reply:
          'Recomendamos sempre o tamanho maior — as nossas meias têm elasticidade natural e adaptam-se ao pé. O risco é uma meia ligeiramente folgada, nunca apertada (que seria desconfortável e degrada o tecido).',
      },
      {
        label: 'Não me adapta — posso trocar?',
        reply:
          'Claro. Tem 30 dias para troca gratuita por outro tamanho. A meia tem de estar por usar e na embalagem original. Pode iniciar em [Devoluções](/conta/devolucoes) ou escrever para info@lionsocks.pt.',
      },
    ],
  },
  {
    label: 'Materiais',
    reply:
      'Trabalhamos cinco fibras — Fio de Escócia, Lã Merino, Seda, Cashmere e Algodão Penteado. Cada uma tem o seu lugar. Pode ler a história de cada material em [Materiais](/guide).',
    followUps: [
      {
        label: 'Qual material para o Inverno?',
        reply:
          'Para Inverno recomendamos a [Lã Merino](/materiais/la-merino) (fibra termorreguladora — quente sem sobreaquecer) ou o [Cashmere](/materiais/cashmere) (oito vezes mais isolante que lã comum, topo da colecção).',
      },
      {
        label: 'Diferença entre Merino e Cashmere',
        reply:
          'Lã Merino: fibra ultra-fina (18,5 microns), termorreguladora, durável, ideal para uso diário no Inverno. Cashmere: subpêlo de cabra recolhido à mão, oito vezes mais isolante, suavidade superior — material de excepção. Pode ver os pares em [Reserva — Cashmere](/colecoes/reserva).',
      },
      {
        label: 'O que é Fio de Escócia?',
        reply:
          'Algodão egípcio de fibra longa, mercerizado duas vezes — processo que cria brilho subtil e durabilidade excepcional. Leve, respirável, próprio para todas as estações. Veja a colecção em [Ofício — Fio de Escócia](/materiais/fil-d-ecosse).',
      },
    ],
  },
  {
    label: 'Encomenda',
    reply:
      'Posso ajudar a localizar uma encomenda. Tem o número à mão? Aparece no email de confirmação. Pode também ver o estado em tempo real na [sua conta](/conta/encomendas).',
    followUps: [
      {
        label: 'Não recebi confirmação',
        reply:
          'Verifique a pasta de spam — o email vem de info@lionsocks.pt. Se passaram mais de 30 minutos sem chegar, escreva-nos para info@lionsocks.pt com o nome e morada usados na compra que recuperamos a encomenda.',
      },
      {
        label: 'Quero alterar a morada',
        reply:
          'Se a encomenda ainda não foi expedida, conseguimos alterar. Escreva imediatamente para info@lionsocks.pt com o número de encomenda e a nova morada. Após expedição (24h após confirmação), só os CTT podem redireccionar.',
      },
      {
        label: 'Onde está a minha encomenda?',
        reply:
          'Acompanhe em tempo real em [As minhas encomendas](/conta/encomendas) — vai ter o link de tracking dos CTT assim que sair do Porto. Prazo médio: 1–3 dias úteis para Continente, 3–5 para Ilhas.',
      },
    ],
  },
  {
    label: 'Devolução',
    reply:
      'Aceitamos devoluções até 30 dias após a entrega, sem custos para Portugal Continental. A meia tem de estar por usar e na embalagem original. Pode iniciar em [Devoluções](/conta/devolucoes).',
    followUps: [
      {
        label: 'Como funciona o reembolso?',
        reply:
          'Após recebermos a devolução e validarmos as condições (24–48h), o reembolso é processado no método de pagamento original em até 14 dias úteis. Pode optar por crédito de loja (processo imediato, 5% bónus) — ver [Crédito](/conta/credito).',
      },
      {
        label: 'Posso trocar por outro tamanho?',
        reply:
          'Pode. A troca por tamanho é gratuita e prioritária — enviamos o novo par antes mesmo de recebermos o original (mediante autorização de cartão). Inicie em [Devoluções → Troca de tamanho](/conta/devolucoes).',
      },
      {
        label: 'Política completa',
        reply:
          'A política integral está em [Devoluções & Reembolsos](/devolucoes). Resumo: 30 dias, sem custos em Continente, troca gratuita por tamanho, reembolso em 14 dias úteis.',
      },
    ],
  },
  {
    label: 'Falar com a equipa',
    reply:
      'Com todo o gosto. Escreva-nos para [info@lionsocks.pt](mailto:info@lionsocks.pt) — respondemos em 24 horas úteis. Se preferir, pode usar também o [formulário de contacto](/contacto).',
  },
]

/* ─── Helpers ──────────────────────────────────────────────────────────────── */

function loadHistory(): Message[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

function saveHistory(h: Message[]) {
  if (typeof window === 'undefined') return
  try {
    // Não persistimos os followUps no storage — recriam-se ao falar com o assistente
    const stripped = h.map(({ role, content }) => ({ role, content }))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stripped.slice(-HISTORY_LIMIT)))
  } catch {}
}

function getGreeting(): string {
  const h = new Date().getHours()
  if (h < 6) return 'Boa noite'
  if (h < 12) return 'Bom dia'
  if (h < 20) return 'Boa tarde'
  return 'Boa noite'
}

/**
 * Render mínimo de markdown links: `[texto](url)` ou `[texto](mailto:...)`.
 * Tudo o resto fica plain text. Para evitar XSS, não permitimos HTML.
 */
function renderInlineMarkdown(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  let key = 0

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<Fragment key={key++}>{text.slice(lastIndex, match.index)}</Fragment>)
    }
    const [, label, href] = match
    const isExternal = href.startsWith('http')
    const isMail = href.startsWith('mailto:')
    parts.push(
      <a
        key={key++}
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        style={{
          color: '#B8960C',
          textDecoration: 'underline',
          textUnderlineOffset: '2px',
          fontWeight: 500,
        }}
      >
        {label}
        {isExternal && ' ↗'}
        {isMail && ''}
      </a>,
    )
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) {
    parts.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>)
  }
  return parts
}

/* ─── Component ────────────────────────────────────────────────────────────── */

export default function AiChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMessages(loadHistory())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    saveHistory(messages)
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      })
    })
  }, [messages, hydrated])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    if (open && messages.length > 0) {
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open, messages.length])

  const greeting = useMemo(() => getGreeting(), [open])
  const exchanges = messages.filter((m) => m.role === 'user').length
  const showEscalation = exchanges >= ESCALATION_THRESHOLD

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return
    const userMsg: Message = { role: 'user', content: text.trim() }
    const next = [...messages, userMsg]
    setMessages(next)
    setInput('')
    setLoading(true)
    try {
      const token = getToken()
      const r = await apiPost<{ answer: string }>(
        '/ai/cs-chat',
        {
          message: userMsg.content,
          history: next.slice(0, -1).slice(-8).map(({ role, content }) => ({ role, content })),
        },
        { token: token ?? undefined },
      )
      setMessages([...next, { role: 'assistant', content: r.answer }])
    } catch (err) {
      const msg =
        err instanceof Error && err.message.includes('503')
          ? 'Estamos em modo limitado. Para questões urgentes, escreva-nos para [info@lionsocks.pt](mailto:info@lionsocks.pt).'
          : 'Não consegui responder agora. Tente de novo dentro de momentos, ou escreva-nos para [info@lionsocks.pt](mailto:info@lionsocks.pt).'
      setMessages([...next, { role: 'assistant', content: msg }])
    } finally {
      setLoading(false)
    }
  }

  const handleFollowUp = (fu: FollowUp) => {
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: fu.label },
      { role: 'assistant', content: fu.reply, followUps: fu.followUps },
    ])
  }

  const handleResetConversation = () => {
    if (!window.confirm('Limpar histórico de conversa?')) return
    setMessages([])
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  /* ─── Botão fechado (FAB circular) ────────────────────────────────────── */

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="Falar com o assistente Lion Socks"
        title="Ajuda"
        className="fixed z-40 flex items-center justify-center transition-all"
        style={{
          bottom: '24px',
          left: '24px',
          width: '44px',
          height: '44px',
          background: '#0A0A0A',
          color: '#B8960C',
          border: '1px solid #B8960C',
          borderRadius: '50%',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#B8960C'
          e.currentTarget.style.color = '#0A0A0A'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#0A0A0A'
          e.currentTarget.style.color = '#B8960C'
        }}
      >
        <MessageCircle size={18} strokeWidth={1.5} />
      </button>
    )
  }

  /* ─── Painel aberto ───────────────────────────────────────────────────── */

  const showWelcome = messages.length === 0

  return (
    <div
      role="dialog"
      aria-label="Conversa com o assistente Lion Socks"
      aria-modal="false"
      className="fixed z-40 flex flex-col chat-panel"
      style={{
        bottom: '24px',
        left: '24px',
        width: 'min(380px, 90vw)',
        height: 'min(560px, 78vh)',
        background: '#F5F3EE',
        border: '1px solid rgba(184,150,12,0.18)',
        borderRadius: '8px',
        boxShadow: '0 12px 40px rgba(10,10,10,0.12)',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes chatPanelIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes typingDot {
          0%, 60%, 100% { opacity: 0.25; transform: translateY(0); }
          30%           { opacity: 1;    transform: translateY(-2px); }
        }
        .chat-panel { animation: chatPanelIn 280ms cubic-bezier(0.22, 1, 0.36, 1); }
        .typing-dot { animation: typingDot 1.4s ease-in-out infinite; }
        .typing-dot:nth-child(2) { animation-delay: 0.18s; }
        .typing-dot:nth-child(3) { animation-delay: 0.36s; }
        @media (prefers-reduced-motion: reduce) {
          .chat-panel, .typing-dot { animation: none !important; }
        }
        .chat-chip {
          display: inline-flex;
          align-items: center;
          padding: 8px 14px;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #0A0A0A;
          background: transparent;
          border: 1px solid #0A0A0A;
          border-radius: 999px;
          cursor: pointer;
          transition: background 200ms ease, color 200ms ease;
        }
        .chat-chip:hover { background: #0A0A0A; color: #F5F3EE; }
        .chat-chip:focus-visible { outline: 2px solid #B8960C; outline-offset: 2px; }
        .chat-chip-followup {
          padding: 6px 12px;
          font-size: 10px;
          letter-spacing: 0.12em;
          color: #424242;
          border-color: rgba(10,10,10,0.20);
          text-transform: none;
          font-weight: 400;
        }
        .chat-chip-followup:hover {
          background: #0A0A0A;
          color: #F5F3EE;
          border-color: #0A0A0A;
        }
      `}</style>

      {/* Header preto sólido */}
      <header
        className="flex items-center justify-between"
        style={{
          background: '#0A0A0A',
          padding: '14px 18px',
          borderBottom: '1px solid rgba(184,150,12,0.25)',
          flexShrink: 0,
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '17px',
              fontWeight: 500,
              color: '#F5F3EE',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Lion Socks
          </p>
          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '9px',
              fontWeight: 500,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: '#B8960C',
              marginTop: '3px',
            }}
          >
            Assistente
          </p>
        </div>

        <div className="flex items-center" style={{ gap: '12px' }}>
          {!showWelcome && (
            <button
              onClick={handleResetConversation}
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#B8960C',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 0',
              }}
              title="Limpar conversa"
            >
              Nova conversa
            </button>
          )}
          <button
            onClick={() => setOpen(false)}
            aria-label="Fechar"
            style={{
              color: '#F5F3EE',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'inline-flex',
              transition: 'color 200ms ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#B8960C')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#F5F3EE')}
          >
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Body — scroll vertical */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto"
        style={{ padding: '20px 16px', background: '#F5F3EE' }}
      >
        {showWelcome ? (
          <div>
            <p
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: 'italic',
                fontSize: '22px',
                fontWeight: 400,
                color: '#0A0A0A',
                lineHeight: 1.2,
                margin: '4px 0 6px',
              }}
            >
              {greeting}.
            </p>
            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '14px',
                fontWeight: 400,
                color: '#424242',
                lineHeight: 1.5,
                marginBottom: '20px',
              }}
            >
              Em que podemos ajudar?
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: '24px',
              }}
            >
              {QUICK_REPLIES.map((qr) => (
                <button key={qr.label} onClick={() => handleFollowUp(qr)} className="chat-chip">
                  {qr.label}
                </button>
              ))}
            </div>

            <div
              style={{
                width: '40px',
                height: '1px',
                background: '#B8960C',
                margin: '0 0 12px',
              }}
            />
            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontStyle: 'italic',
                fontSize: '11px',
                color: '#6B6B6B',
                lineHeight: 1.5,
              }}
            >
              Para questões mais sensíveis, escreva-nos directamente para{' '}
              <a
                href="mailto:info@lionsocks.pt"
                style={{ color: '#B8960C', textDecoration: 'underline', textUnderlineOffset: '2px' }}
              >
                info@lionsocks.pt
              </a>
              .
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.map((m, i) => (
              <Fragment key={i}>
                <ChatBubble role={m.role} content={m.content} />
                {m.role === 'assistant' && m.followUps && i === messages.length - 1 && !loading && (
                  <FollowUpRow followUps={m.followUps} onPick={handleFollowUp} />
                )}
              </Fragment>
            ))}
            {loading && <TypingIndicator />}
            {showEscalation && !loading && <EscalationCard />}
          </div>
        )}
      </div>

      {/* Footer input */}
      <form
        className="flex items-center"
        onSubmit={(e) => {
          e.preventDefault()
          sendMessage(input)
        }}
        style={{
          background: '#FFFFFF',
          borderTop: '1px solid rgba(10,10,10,0.06)',
          padding: '12px 16px',
          gap: '8px',
          flexShrink: 0,
        }}
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escreva uma mensagem…"
          maxLength={500}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '14px',
            color: '#0A0A0A',
            padding: '8px 0',
          }}
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          aria-label="Enviar"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
            color: input.trim() && !loading ? '#B8960C' : '#9E9E9E',
            padding: '8px',
            display: 'inline-flex',
            transition: 'color 200ms ease',
          }}
        >
          <ArrowRight size={18} strokeWidth={1.5} />
        </button>
      </form>
    </div>
  )
}

/* ─── Sub-components ──────────────────────────────────────────────────────── */

function ChatBubble({ role, content }: { role: 'user' | 'assistant'; content: string }) {
  const isUser = role === 'user'
  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      <div
        style={{
          maxWidth: isUser ? '80%' : '85%',
          padding: isUser ? '10px 14px' : '12px 16px',
          background: isUser ? '#0A0A0A' : '#FFFFFF',
          color: isUser ? '#F5F3EE' : '#1F1F1F',
          border: isUser ? 'none' : '1px solid rgba(10,10,10,0.06)',
          borderRadius: '12px',
          borderBottomRightRadius: isUser ? '4px' : '12px',
          borderBottomLeftRadius: isUser ? '12px' : '4px',
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: 1.55,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {isUser ? content : renderInlineMarkdown(content)}
      </div>
    </div>
  )
}

function FollowUpRow({
  followUps,
  onPick,
}: {
  followUps: FollowUp[]
  onPick: (fu: FollowUp) => void
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px',
        marginTop: '4px',
        marginLeft: '4px',
      }}
    >
      {followUps.map((fu) => (
        <button
          key={fu.label}
          onClick={() => onPick(fu)}
          className="chat-chip chat-chip-followup"
        >
          {fu.label}
        </button>
      ))}
    </div>
  )
}

function EscalationCard() {
  return (
    <div
      style={{
        marginTop: '8px',
        padding: '14px 16px',
        background: 'rgba(184,150,12,0.08)',
        border: '1px solid rgba(184,150,12,0.25)',
        borderRadius: '8px',
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start',
      }}
    >
      <Mail size={16} strokeWidth={1.5} style={{ color: '#B8960C', marginTop: '2px', flexShrink: 0 }} />
      <div>
        <p
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '12px',
            fontWeight: 500,
            color: '#0A0A0A',
            margin: 0,
            marginBottom: '4px',
          }}
        >
          Não está a encontrar o que procura?
        </p>
        <p
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '12px',
            color: '#424242',
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          Escreva-nos para{' '}
          <a
            href="mailto:info@lionsocks.pt"
            style={{
              color: '#B8960C',
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
              fontWeight: 500,
            }}
          >
            info@lionsocks.pt
          </a>
          {' '}— respondemos em 24h úteis.
        </p>
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
      <div
        style={{
          padding: '12px 16px',
          background: '#FFFFFF',
          border: '1px solid rgba(10,10,10,0.06)',
          borderRadius: '12px',
          borderBottomLeftRadius: '4px',
          display: 'inline-flex',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="typing-dot"
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#B8960C',
              display: 'inline-block',
            }}
          />
        ))}
      </div>
    </div>
  )
}
