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
        background: '#0A0A0A',
        border: '1px solid #2A2A2A',
        borderRadius: '4px',
        width: '320px',
        aspectRatio: '4 / 5',
        padding: '40px 32px',
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
          fontSize: '42px',
          fontWeight: 400,
          color: '#F5F3EE',
          lineHeight: 1,
          marginBottom: '4px',
        }}
      >
        {data.headline}
      </h3>

      {/* Sublinha */}
      <span
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '11px',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: '#B8960C',
          marginBottom: '24px',
        }}
      >
        {data.sublinha}
      </span>

      {/* Divisor dourado */}
      <div
        style={{
          width: '40px',
          height: '1px',
          background: '#B8960C',
          marginBottom: '20px',
        }}
      />

      {/* Body */}
      <p
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '13px',
          color: '#6B6B6B',
          lineHeight: 1.5,
          marginBottom: '24px',
          maxWidth: '240px',
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
