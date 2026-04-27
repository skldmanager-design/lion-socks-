import Link from 'next/link'
import type { EditorialSlot as EditorialSlotData } from '@/lib/navigation'

interface EditorialSlotProps {
  data: EditorialSlotData
}

export default function EditorialSlot({ data }: EditorialSlotProps) {
  return (
    <Link
      href={data.ctaHref}
      className="group block relative overflow-hidden"
      style={{
        background: 'rgba(184,150,12,0.05)',
        border: '1px solid rgba(184,150,12,0.2)',
        borderRadius: '6px',
        width: '100%',
        padding: '24px 22px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        transition: 'all 200ms ease',
      }}
    >
      {/* Overline */}
      <span
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '14px',
          fontWeight: 400,
          color: '#B8960C',
          letterSpacing: '0.05em',
          marginBottom: '4px',
        }}
      >
        {data.overline}
      </span>

      {/* Headline italic */}
      <h3
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontStyle: 'italic',
          fontSize: '26px',
          fontWeight: 400,
          color: '#F5F3EE',
          lineHeight: 1.1,
          marginBottom: '4px',
        }}
      >
        {data.headline}
      </h3>

      {/* Sublinha */}
      <span
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '10px',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: '#B8960C',
          marginBottom: '14px',
        }}
      >
        {data.sublinha}
      </span>

      {/* Body */}
      <p
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '12px',
          color: '#CCCCCC',
          lineHeight: 1.55,
          marginBottom: '14px',
        }}
      >
        {data.body}
      </p>

      {/* CTA */}
      <span
        className="group-hover:tracking-[0.15em]"
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '11px',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: '#B8960C',
          transition: 'all 200ms ease',
        }}
      >
        {data.ctaLabel} →
      </span>
    </Link>
  )
}
