/**
 * Editorial section header — single source of truth for the
 * "eyebrow + h2 + gold rule + intro" pattern repeated across the site.
 *
 * Theme:
 *   • light → ink h2, muted intro (use on cream backgrounds)
 *   • dark  → cream h2, faded intro  (use on #0A0A0A backgrounds)
 *
 * Align:
 *   • center (default) → centered with horizontal gold rule
 *   • left            → left-aligned with anchor-left rule
 */

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  intro?: string
  theme?: 'light' | 'dark'
  align?: 'center' | 'left'
  /** Render as h1 (page-level) instead of the default h2 (section-level). */
  as?: 'h1' | 'h2'
}

export default function SectionHeader({
  eyebrow,
  title,
  intro,
  theme = 'light',
  align = 'center',
  as = 'h2',
}: SectionHeaderProps) {
  const Heading = as
  const isDark = theme === 'dark'
  const isCenter = align === 'center'

  const titleColor = isDark ? '#F5F3EE' : '#0A0A0A'
  const introColor = isDark ? '#999' : '#6B6B6B'
  const ruleMargin = isCenter ? '20px auto 0' : '20px 0 0'

  return (
    <div className={isCenter ? 'text-center mx-auto' : ''} style={{ maxWidth: isCenter ? '640px' : 'none' }}>
      {eyebrow && (
        <p
          className="font-body uppercase mb-3"
          style={{
            fontSize: '11px',
            letterSpacing: '0.18em',
            color: '#B8960C',
            fontWeight: 500,
          }}
        >
          {eyebrow}
        </p>
      )}

      <Heading
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: as === 'h1' ? 'clamp(36px, 5vw, 52px)' : 'clamp(28px, 4vw, 40px)',
          fontWeight: 400,
          color: titleColor,
          lineHeight: 1.15,
          letterSpacing: '-0.01em',
          margin: 0,
        }}
      >
        {title}
      </Heading>

      {/* Gold rule — 40×1px */}
      <div
        aria-hidden
        style={{
          width: '40px',
          height: '1px',
          background: '#B8960C',
          margin: ruleMargin,
        }}
      />

      {intro && (
        <p
          className="font-body"
          style={{
            fontSize: '14px',
            lineHeight: 1.75,
            color: introColor,
            maxWidth: '520px',
            margin: isCenter ? '24px auto 0' : '24px 0 0',
            fontWeight: 300,
          }}
        >
          {intro}
        </p>
      )}
    </div>
  )
}
