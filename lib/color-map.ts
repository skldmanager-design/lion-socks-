// Color name → hex mapping. The Product-Pilot sends color names (variant.optionValues.Cor);
// the site maps them to hex for swatches. Add new colors here as they appear in the catalog.

export const colorHexMap: Record<string, string> = {
  // Neutros
  Black: '#1A1A1A',
  Anthracite: '#3A3A4A',
  'Anthracite Melange': '#3A3A4A',
  'Grey Melange': '#4A4A4A',
  Charcoal: '#3D3D3D',

  // Azuis
  Marine: '#1B2838',
  'Marine Melange': '#2A4A3E',
  'Light Blue': '#5B8FA8',
  'Blue Melange': '#4A6A8A',

  // Castanhos / Bege
  Brown: '#5C3A2E',
  Bege: '#C4B8A8',
  'Light Bege': '#D4C8B8',
  Camel: '#C4A87A',

  // Vermelhos
  Bordeaux: '#5A1E2A',
  'Vinho do Porto': '#5A1E2A',

  // Verdes
  'Green Melange': '#2A3A2E',
  'Olive Green': '#4A5A2E',
  'Dark Green': '#2A4A2E',
  'Sage Green': '#7A9A7E',

  // Brancos / Creme
  Creme: '#D5C9B1',
  Cream: '#D5C9B1',
  'Off White': '#F5F3EE',
}

export function getColorHex(colorName: string): string {
  // Exact match first
  if (colorHexMap[colorName]) return colorHexMap[colorName]
  // Case-insensitive fallback
  const lower = colorName.toLowerCase()
  const match = Object.entries(colorHexMap).find(([k]) => k.toLowerCase() === lower)
  if (match) return match[1]
  // Fallback: neutral gray for unknown colors
  return '#808080'
}
