import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'gold' | 'material' | 'outline'
  className?: string
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  const base = 'inline-block text-[9px] font-body font-medium tracking-[0.1em] uppercase'

  if (variant === 'gold') {
    return (
      <span
        className={cn(base, className)}
        style={{ background: '#C5A55A', color: '#ffffff', padding: '4px 10px' }}
      >
        {children}
      </span>
    )
  }

  // material + default + outline → subtle ghost badge
  return (
    <span
      className={cn(base, className)}
      style={{
        background: 'transparent',
        border: '1px solid rgba(0,0,0,0.12)',
        color: '#888',
        padding: '3px 8px',
        borderRadius: 0,
      }}
    >
      {children}
    </span>
  )
}
