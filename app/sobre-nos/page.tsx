import { redirect } from 'next/navigation'

// /sobre-nos is an alias for /sobre — unified content lives in /sobre.
export default function SobreNosRedirect() {
  redirect('/sobre')
}
