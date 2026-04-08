import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'cta' | 'cart' | 'text'
  fullWidth?: boolean
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'cta', fullWidth = false, loading = false, className, children, disabled, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center font-body font-medium uppercase tracking-[0.08em] transition-all duration-200 ease focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed'

    // CTA outline: transparente, border dourada, texto dourado
    // Hover: fundo dourado, texto preto
    const cta =
      'bg-transparent border border-gold text-gold text-[12px] px-7 py-[14px] rounded-[4px] hover:bg-gold hover:text-black'

    // Adicionar carrinho: fundo preto, texto off-white
    // Hover: fundo dourado, texto preto
    const cart =
      'bg-black text-off-white text-[13px] px-6 py-4 rounded-[4px] hover:bg-gold hover:text-black'

    // Link textual: dourado, hover underline
    const text =
      'bg-transparent text-gold text-[13px] px-0 py-0 hover:underline normal-case tracking-normal'

    const variants = { cta, cart, text }

    return (
      <button
        ref={ref}
        disabled={disabled ?? loading}
        className={cn(base, variants[variant], fullWidth && 'w-full', className)}
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
