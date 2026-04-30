'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { MessageCircle, X, ArrowRight } from 'lucide-react'
import { apiPost, getToken } from '@/lib/api'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const STORAGE_KEY = 'lion-socks-cs-history'
const HISTORY_LIMIT = 50

/* ─── Quick replies (welcome state) ───────────────────────────────────────── */

const QUICK_REPLIES: Array<{ label: string; reply: string }> = [
  {
    label: 'Tamanhos',
    reply:
      'Os tamanhos Lion Socks são em três cortes — 39–42, 42–45, 45–48. Se estiver entre dois, recomendamos sempre o maior. Quer-me dizer o seu número?',
  },
  {
    label: 'Materiais',
    reply:
      'Trabalhamos cinco fibras: Fio de Escócia, Lã Merino, Seda, Cashmere, Algodão Penteado. Quer saber qual lhe convém para uma ocasião em particular?',
  },
  {
    label: 'Encomenda',
    reply:
      'Posso ajudar a localizar uma encomenda. Tem o número de encomenda à mão? (Aparece no email de confirmação.)',
  },
  {
    label: 'Devolução',
    reply:
      'Aceitamos devoluções até 30 dias após a entrega, sem custos para Portugal Continental. Quer iniciar uma devolução?',
  },
  {
    label: 'Falar com a equipa',
    reply:
      'Com todo o gosto. Escreva-nos para info@lionsocks.pt — respondemos em 24h úteis.',
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(h.slice(-HISTORY_LIMIT)))
  } catch {}
}

function getGreeting(): string {
  const h = new Date().getHours()
  if (h < 6) return 'Boa noite'
  if (h < 12) return 'Bom dia'
  if (h < 20) return 'Boa tarde'
  return 'Boa noite'
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

  // Hidratar histórico do localStorage
  useEffect(() => {
    setMessages(loadHistory())
    setHydrated(true)
  }, [])

  // Persistir + auto-scroll para fundo
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

  // ESC fecha
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Focus no input quando abre
  useEffect(() => {
    if (open && messages.length > 0) {
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open, messages.length])

  const greeting = useMemo(() => getGreeting(), [open])

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
        { message: userMsg.content, history: next.slice(0, -1).slice(-8) },
        { token: token ?? undefined },
      )
      setMessages([...next, { role: 'assistant', content: r.answer }])
    } catch (err) {
      const msg =
        err instanceof Error && err.message.includes('503')
          ? 'Estamos em modo limitado. Para questões urgentes, escreva-nos para info@lionsocks.pt.'
          : 'Não consegui responder agora. Tente de novo dentro de momentos.'
      setMessages([...next, { role: 'assistant', content: msg }])
    } finally {
      setLoading(false)
    }
  }

  const handleQuickReply = (qr: typeof QUICK_REPLIES[number]) => {
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: qr.label },
      { role: 'assistant', content: qr.reply },
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
        aria-label="Falar com o concierge Lion Socks"
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
      aria-label="Conversa com o concierge Lion Socks"
      aria-modal="false"
      className="fixed z-40 flex flex-col chat-panel"
      style={{
        bottom: '24px',
        left: '24px',
        width: 'min(380px, 90vw)',
        height: 'min(540px, 75vh)',
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
            Concierge
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
                <button key={qr.label} onClick={() => handleQuickReply(qr)} className="chat-chip">
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
              <ChatBubble key={i} role={m.role} content={m.content} />
            ))}
            {loading && <TypingIndicator />}
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
        {content}
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
