/* Portuguese flag — proper 2:3 ratio, 2/5 green + 3/5 red, escudo armilar centrado na divisão */
export default function PortugalFlag({ width = 24, height = 16 }: { width?: number; height?: number }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 20"
      xmlns="http://www.w3.org/2000/svg"
      style={{ borderRadius: '1px', overflow: 'hidden', flexShrink: 0 }}
      aria-label="Bandeira de Portugal"
    >
      {/* Verde — 2/5 */}
      <rect x="0" y="0" width="12" height="20" fill="#006233" />
      {/* Vermelho — 3/5 */}
      <rect x="12" y="0" width="18" height="20" fill="#D52B1E" />
      {/* Esfera armilar centrada na divisão (simplificada) */}
      <circle cx="12" cy="10" r="4" fill="none" stroke="#FFD100" strokeWidth="0.6" />
      <circle cx="12" cy="10" r="2.2" fill="#FFF" stroke="#D52B1E" strokeWidth="0.5" />
      <rect x="10.6" y="8.4" width="2.8" height="3.2" fill="#D52B1E" />
    </svg>
  )
}
