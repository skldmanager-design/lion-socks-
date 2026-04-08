'use client'

import { useState } from 'react'
import { X, Ruler } from 'lucide-react'

const sizeData = [
  { size: '39-42', eu: '39–42', uk: '6–8', us: '7–9', cm: '25–27' },
  { size: '42-45', eu: '42–45', uk: '8–10.5', us: '9–11', cm: '27–29' },
  { size: '45-48', eu: '45–48', uk: '11–13', us: '12–14', cm: '29–31' },
]

export default function SizeGuide() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 text-xs text-gray-500 font-body hover:text-primary transition-colors underline underline-offset-2"
      >
        <Ruler size={12} />
        Guia de tamanhos
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-primary/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div className="relative bg-white w-full max-w-md p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl text-gray-900">Guia de Tamanhos</h3>
              <button
                onClick={() => setOpen(false)}
                className="p-1 text-gray-400 hover:text-primary transition-colors"
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-body">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 text-[10px] tracking-widest uppercase text-gray-400 font-medium">Tamanho</th>
                    <th className="text-center py-2 text-[10px] tracking-widest uppercase text-gray-400 font-medium">EU</th>
                    <th className="text-center py-2 text-[10px] tracking-widest uppercase text-gray-400 font-medium">UK</th>
                    <th className="text-center py-2 text-[10px] tracking-widest uppercase text-gray-400 font-medium">US</th>
                    <th className="text-center py-2 text-[10px] tracking-widest uppercase text-gray-400 font-medium">cm</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeData.map((row) => (
                    <tr key={row.size} className="border-b border-gray-100">
                      <td className="py-3 font-medium text-gray-900">{row.size}</td>
                      <td className="py-3 text-center text-gray-700">{row.eu}</td>
                      <td className="py-3 text-center text-gray-700">{row.uk}</td>
                      <td className="py-3 text-center text-gray-700">{row.us}</td>
                      <td className="py-3 text-center text-gray-700">{row.cm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-gray-400 font-body mt-4 leading-relaxed">
              Em caso de dúvida entre dois tamanhos, recomendamos o maior.
              Para meias no-show, seleccione o tamanho do seu calçado habitual.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
