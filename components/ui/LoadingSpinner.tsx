import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'dark' | 'light'
  className?: string
}

export default function LoadingSpinner({ size = 'md', variant = 'dark', className }: LoadingSpinnerProps) {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-[3px]',
  }

  const variants = {
    dark: 'border-black/20 border-t-black',
    light: 'border-off-white/20 border-t-off-white',
  }

  return (
    <div
      className={cn('animate-spin rounded-full', sizes[size], variants[variant], className)}
      role="status"
      aria-label="A carregar..."
    />
  )
}
