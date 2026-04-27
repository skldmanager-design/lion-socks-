/**
 * Formata um preço em EUR.
 * Exemplo: 15 → "€15" | 15.5 → "€15,50"
 */
export function formatPrice(amount: number): string {
  if (Number.isInteger(amount)) {
    return `€${amount}`
  }
  return `€${amount.toFixed(2).replace('.', ',')}`
}

/**
 * Calcula o preço com desconto.
 */
export function applyDiscount(price: number, discountPercent: number): number {
  return Math.round(price * (1 - discountPercent / 100) * 100) / 100
}

/**
 * Calcula a poupança total de um pack.
 */
export function calculateSavings(original: number, discounted: number): number {
  return Math.round((original - discounted) * 100) / 100
}

/**
 * Converte um handle/slug para texto legível.
 * Exemplo: "fil-d-ecosse" → "Fil d'Écosse"
 */
export function handleToLabel(handle: string): string {
  const map: Record<string, string> = {
    'fil-d-ecosse': "Fil d'Écosse",
    'la-merino': 'Lã Merino',
    seda: 'Seda',
  }
  return map[handle] ?? handle.replace(/-/g, ' ')
}

/**
 * Classnames helper simples.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export const FREE_SHIPPING_THRESHOLD = 49
