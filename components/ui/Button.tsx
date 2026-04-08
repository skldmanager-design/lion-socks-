import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, className, children, disabled, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center font-body font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      primary:
        'bg-primary text-white border border-primary hover:bg-transparent hover:text-primary focus-visible:ring-primary',
      secondary:
        'bg-transparent text-primary border border-primary hover:bg-primary hover:text-white focus-visible:ring-primary',
      ghost:
        'bg-transparent text-gray-700 border border-transparent hover:border-primary hover:text-primary focus-visible:ring-primary',
      gold:
        'bg-transparent text-primary border border-gold hover:bg-primary hover:text-gold focus-visible:ring-gold',
    }

    const sizes = {
      sm: 'px-4 py-2 text-xs tracking-widest uppercase',
      md: 'px-6 py-3 text-sm tracking-widest uppercase',
      lg: 'px-8 py-4 text-sm tracking-widest uppercase',
    }

    return (
      <button
        ref={ref}
        disabled={disabled ?? loading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            {children}
          </span>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
