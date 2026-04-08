import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'gold' | 'outline'
  className?: string
}

export default function Badge({ children, variant = 'gold', className }: BadgeProps) {
  const base = 'inline-block text-[10px] font-body font-medium uppercase tracking-[0.08em]'

  if (variant === 'gold') {
    return (
      <span
        className={cn(base, 'bg-gold text-black', className)}
        style={{ padding: '4px 8px', borderRadius: '2px' }}
      >
        {children}
      </span>
    )
  }

  return (
    <span
      className={cn(base, 'text-muted', className)}
      style={{
        background: 'transparent',
        border: '1px solid #E8E5DF',
        padding: '3px 8px',
        borderRadius: '2px',
      }}
    >
      {children}
    </span>
  )
}
