'use client'

import { type Material, type SockType, type Pattern, type Size } from '@/lib/mock-data'

export interface FilterState {
  materials: Material[]
  types: SockType[]
  patterns: Pattern[]
  sizes: Size[]
  colors: string[]
  priceMax: number | null
  sortBy: 'relevance' | 'price-asc' | 'price-desc' | 'newest'
}

interface CollectionFiltersProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
  productCount: number
}

const materialOptions: { value: Material; label: string }[] = [
  { value: 'fil-d-ecosse', label: "Fil d'Écosse" },
  { value: 'la-merino', label: 'Lã Merino' },
  { value: 'seda', label: 'Seda' },
]

const typeOptions: { value: SockType; label: string }[] = [
  { value: 'mid-calf', label: 'Mid-calf' },
  { value: 'over-the-calf', label: 'Over-the-calf' },
  { value: 'no-show', label: 'No-show' },
]

const patternOptions: { value: Pattern; label: string }[] = [
  { value: 'solid', label: 'Liso' },
  { value: 'ribbed', label: 'Texturado' },
  { value: 'pin-dot', label: 'Pin Dot' },
  { value: 'riscas', label: 'Riscas Finas' },
  { value: 'herringbone', label: 'Herringbone' },
  { value: 'argyle', label: 'Argyle' },
]

const sortOptions: { value: FilterState['sortBy']; label: string }[] = [
  { value: 'relevance', label: 'Relevância' },
  { value: 'newest', label: 'Mais recente' },
  { value: 'price-asc', label: 'Preço: menor primeiro' },
  { value: 'price-desc', label: 'Preço: maior primeiro' },
]

const sizeOptions: { value: Size; label: string }[] = [
  { value: '39-42', label: 'S (39-42)' },
  { value: '42-45', label: 'M (42-45)' },
  { value: '45-48', label: 'L (45-48)' },
]

const colorGroups: { label: string; hex: string; matches: string[] }[] = [
  { label: 'Preto', hex: '#1A1A1A', matches: ['preto'] },
  { label: 'Azul', hex: '#1B2A4A', matches: ['azul', 'marinho'] },
  { label: 'Charcoal', hex: '#3D3D3D', matches: ['charcoal'] },
  { label: 'Castanho', hex: '#6B4423', matches: ['castanho', 'bordeaux'] },
  { label: 'Creme', hex: '#D5C9B1', matches: ['creme', 'beige'] },
  { label: 'Verde', hex: '#1F3A28', matches: ['verde'] },
  { label: 'Cinza', hex: '#808080', matches: ['cinza'] },
]

function toggle<T>(arr: T[], val: T): T[] {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]
}

function FilterSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="border-b border-gray-100 pb-5 mb-5 last:border-0 last:mb-0 last:pb-0">
      <p className="text-[10px] tracking-widest uppercase font-body font-medium text-gray-400 mb-3">
        {title}
      </p>
      {children}
    </div>
  )
}

export default function CollectionFilters({
  filters,
  onChange,
  productCount,
}: CollectionFiltersProps) {
  const hasActiveFilters =
    filters.materials.length > 0 ||
    filters.types.length > 0 ||
    filters.patterns.length > 0 ||
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.priceMax !== null

  const clearAll = () =>
    onChange({
      materials: [], types: [], patterns: [],
      sizes: [], colors: [], priceMax: null,
      sortBy: filters.sortBy,
    })

  return (
    <aside className="w-full lg:w-56 flex-shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs font-body text-gray-400">{productCount} produto{productCount !== 1 ? 's' : ''}</p>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="text-xs font-body text-gold hover:text-gold-dark transition-colors underline underline-offset-2"
          >
            Limpar filtros
          </button>
        )}
      </div>

      {/* Filters */}
      <div>
        {/* Sort — desktop */}
        <FilterSection title="Ordenar">
          <div className="space-y-2">
            {sortOptions.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="radio"
                  name="sort"
                  checked={filters.sortBy === opt.value}
                  onChange={() => onChange({ ...filters, sortBy: opt.value })}
                  className="sr-only"
                />
                <span
                  className={`h-3.5 w-3.5 rounded-full border flex-shrink-0 transition-all ${
                    filters.sortBy === opt.value
                      ? 'border-primary bg-primary'
                      : 'border-gray-300 group-hover:border-primary'
                  }`}
                />
                <span className="text-sm font-body text-gray-700 group-hover:text-primary transition-colors">
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Material */}
        <FilterSection title="Material">
          <div className="space-y-2">
            {materialOptions.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.materials.includes(opt.value)}
                  onChange={() =>
                    onChange({ ...filters, materials: toggle(filters.materials, opt.value) })
                  }
                  className="sr-only"
                />
                <span
                  className={`h-3.5 w-3.5 border flex-shrink-0 transition-all flex items-center justify-center ${
                    filters.materials.includes(opt.value)
                      ? 'border-primary bg-primary'
                      : 'border-gray-300 group-hover:border-primary'
                  }`}
                >
                  {filters.materials.includes(opt.value) && (
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </span>
                <span className="text-sm font-body text-gray-700 group-hover:text-primary transition-colors">
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Type */}
        <FilterSection title="Corte">
          <div className="space-y-2">
            {typeOptions.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.types.includes(opt.value)}
                  onChange={() =>
                    onChange({ ...filters, types: toggle(filters.types, opt.value) })
                  }
                  className="sr-only"
                />
                <span
                  className={`h-3.5 w-3.5 border flex-shrink-0 transition-all flex items-center justify-center ${
                    filters.types.includes(opt.value)
                      ? 'border-primary bg-primary'
                      : 'border-gray-300 group-hover:border-primary'
                  }`}
                >
                  {filters.types.includes(opt.value) && (
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </span>
                <span className="text-sm font-body text-gray-700 group-hover:text-primary transition-colors">
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Pattern */}
        <FilterSection title="Padrão">
          <div className="space-y-2">
            {patternOptions.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.patterns.includes(opt.value)}
                  onChange={() =>
                    onChange({ ...filters, patterns: toggle(filters.patterns, opt.value) })
                  }
                  className="sr-only"
                />
                <span
                  className={`h-3.5 w-3.5 border flex-shrink-0 transition-all flex items-center justify-center ${
                    filters.patterns.includes(opt.value)
                      ? 'border-primary bg-primary'
                      : 'border-gray-300 group-hover:border-primary'
                  }`}
                >
                  {filters.patterns.includes(opt.value) && (
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </span>
                <span className="text-sm font-body text-gray-700 group-hover:text-primary transition-colors">
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Size */}
        <FilterSection title="Tamanho">
          <div className="flex flex-wrap gap-2">
            {sizeOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onChange({ ...filters, sizes: toggle(filters.sizes, opt.value) })}
                className="font-body transition-all"
                style={{
                  fontSize: '12px',
                  padding: '6px 12px',
                  border: filters.sizes.includes(opt.value) ? '1px solid #0A0A0A' : '1px solid #E0E0E0',
                  background: filters.sizes.includes(opt.value) ? '#0A0A0A' : 'transparent',
                  color: filters.sizes.includes(opt.value) ? '#FFFFFF' : '#424242',
                  cursor: 'pointer',
                  borderRadius: '3px',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Color */}
        <FilterSection title="Cor">
          <div className="flex flex-wrap gap-2">
            {colorGroups.map((c) => {
              const active = filters.colors.includes(c.label)
              return (
                <button
                  key={c.label}
                  onClick={() => onChange({ ...filters, colors: toggle(filters.colors, c.label) })}
                  title={c.label}
                  aria-label={c.label}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: c.hex,
                    border: active ? '2px solid #B8960C' : '1px solid rgba(0,0,0,0.15)',
                    outline: active ? '1px solid #B8960C' : 'none',
                    outlineOffset: '2px',
                    cursor: 'pointer',
                    transition: 'all 150ms ease',
                  }}
                />
              )
            })}
          </div>
        </FilterSection>

        {/* Price */}
        <FilterSection title="Preço Máx.">
          <div className="space-y-2">
            <input
              type="range"
              min="10"
              max="200"
              step="5"
              value={filters.priceMax ?? 200}
              onChange={(e) => onChange({ ...filters, priceMax: Number(e.target.value) })}
              className="w-full accent-[#B8960C]"
            />
            <div className="flex items-center justify-between font-body text-xs text-gray-500">
              <span>€10</span>
              <span className="text-gray-900 font-medium">
                {filters.priceMax ? `Até €${filters.priceMax}` : 'Todos'}
              </span>
              <span>€200</span>
            </div>
            {filters.priceMax !== null && (
              <button
                onClick={() => onChange({ ...filters, priceMax: null })}
                className="font-body text-xs text-gold underline underline-offset-2"
              >
                Limpar preço
              </button>
            )}
          </div>
        </FilterSection>
      </div>
    </aside>
  )
}
