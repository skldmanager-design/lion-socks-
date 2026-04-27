import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: 'Política de cookies Lion Socks.',
}

export default function CookiesPage() {
  return (
    <div style={{ background: '#F5F3EE', minHeight: '100vh' }} className="pt-12 lg:pt-16 pb-20 lg:pb-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl text-gray-900 mb-4">Política de Cookies</h1>
          <p className="font-body text-xs text-gray-400">Última atualização: Abril 2026</p>
        </div>

        <div className="space-y-8 font-body text-sm text-gray-700 leading-relaxed">
          <section>
            <h2 className="font-display text-xl text-gray-900 mb-3">O que são cookies</h2>
            <p>Cookies são pequenos ficheiros de texto que o nosso site guarda no seu dispositivo para melhorar a experiência. Permitem lembrar as suas preferências, produtos no carrinho, e ajudam-nos a entender como o site é utilizado.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-gray-900 mb-3">Tipos de cookies que usamos</h2>
            <ul className="space-y-4 list-none">
              <li>
                <strong className="text-gray-900 block mb-1">Essenciais</strong>
                Necessários para o funcionamento básico do site (carrinho, sessão de login, checkout). Não podem ser desativados.
              </li>
              <li>
                <strong className="text-gray-900 block mb-1">Funcionais</strong>
                Lembram as suas preferências (idioma, favoritos, produtos visitados recentemente). Opcionais.
              </li>
              <li>
                <strong className="text-gray-900 block mb-1">Analíticos</strong>
                Ajudam-nos a entender como o site é utilizado (páginas mais visitadas, tempo no site). Anónimos. Opcionais.
              </li>
              <li>
                <strong className="text-gray-900 block mb-1">Marketing</strong>
                Permitem mostrar conteúdo e anúncios mais relevantes (Meta Pixel, Google Ads). Apenas com o seu consentimento.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl text-gray-900 mb-3">Gerir preferências</h2>
            <p>Pode gerir as suas preferências de cookies a qualquer momento através do banner de consentimento que aparece na primeira visita ou clicando em <strong>"Preferências de Cookies"</strong> no rodapé do site.</p>
            <p className="mt-3">Pode também bloquear cookies diretamente nas definições do seu navegador, mas isso pode afetar o funcionamento do site.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-gray-900 mb-3">Contacto</h2>
            <p>Para qualquer questão sobre cookies ou privacidade, contacte-nos em <a href="mailto:privacidade@lionsocks.pt" className="text-gold underline underline-offset-2">privacidade@lionsocks.pt</a>.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
