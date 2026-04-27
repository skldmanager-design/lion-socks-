import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Guia de Tamanhos',
  description: 'Encontre o tamanho perfeito para as suas meias Lion Socks.',
}

export default function GuiaTamanhosPage() {
  return (
    <div style={{ background: '#F5F3EE', minHeight: '100vh' }} className="pt-12 lg:pt-16 pb-20 lg:pb-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl text-gray-900 mb-4">Guia de Tamanhos</h1>
          <p className="font-body text-sm text-gray-500">Encontre o tamanho perfeito.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full font-body text-sm">
            <thead>
              <tr style={{ borderBottom: '2px solid #0A0A0A' }}>
                <th className="text-left py-3 px-4 text-gray-900 font-medium">Tamanho Lion Socks</th>
                <th className="text-left py-3 px-4 text-gray-900 font-medium">EU</th>
                <th className="text-left py-3 px-4 text-gray-900 font-medium">UK</th>
                <th className="text-left py-3 px-4 text-gray-900 font-medium">US</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #E8E5DF' }}>
                <td className="py-3 px-4 text-gray-900 font-medium">S (39-42)</td>
                <td className="py-3 px-4 text-gray-600">39–42</td>
                <td className="py-3 px-4 text-gray-600">5.5–8</td>
                <td className="py-3 px-4 text-gray-600">6.5–9</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E8E5DF' }}>
                <td className="py-3 px-4 text-gray-900 font-medium">M (42-45)</td>
                <td className="py-3 px-4 text-gray-600">42–45</td>
                <td className="py-3 px-4 text-gray-600">8–10.5</td>
                <td className="py-3 px-4 text-gray-600">9–11.5</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E8E5DF' }}>
                <td className="py-3 px-4 text-gray-900 font-medium">L (45-48)</td>
                <td className="py-3 px-4 text-gray-600">45–48</td>
                <td className="py-3 px-4 text-gray-600">10.5–13</td>
                <td className="py-3 px-4 text-gray-600">11.5–14</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-12 font-body text-sm text-gray-600 leading-relaxed space-y-3">
          <p><strong className="text-gray-900">Dica:</strong> Se estiver entre dois tamanhos, recomendamos o tamanho maior para maior conforto.</p>
          <p>As nossas meias têm elasticidade natural e adaptam-se ao pé ao longo do uso.</p>
        </div>
      </div>
    </div>
  )
}
