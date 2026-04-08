'use client'

import { type Material, type SockType, type Pattern } from '@/lib/mock-data'

export interface FilterState {
  materials: Material[]
  types: SockType[]
  patterns: Pattern[]
  sortBy: 'relevance' | 'price-asc' | 'price-desc'
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
  { value: 'price-asc', label: 'Preço: menor primeiro' },
  { value: 'price-desc', label: 'Preço: maior primeiro' },
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
    filters.patterns.length > 0

  const clearAll = () =>
    onChange({ materials: [], types: [], patterns: [], sortBy: filters.sortBy })

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

      {/* Sort — mobile only top-bar style */}
      <div className="lg:hidden mb-6">
        <select
          value={filters.sortBy}
          onChange={(e) =>
            onChange({ ...filters, sortBy: e.target.value as FilterState['sortBy'] })
          }
          className="w-full border border-gray-200 text-sm font-body text-gray-700 px-3 py-2.5 focus:outline-none focus:border-primary"
          aria-label="Ordenar por"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop sidebar filters */}
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
      </div>
    </aside>
  )
}
