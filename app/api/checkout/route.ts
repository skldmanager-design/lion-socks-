import { NextResponse } from 'next/server'

interface CheckoutBody {
  items: { variantId: string; productTitle: string; variantTitle: string; price: number; quantity: number }[]
  customerEmail: string
  shippingName: string
  shippingAddress: string
  shippingCity: string
  shippingPostalCode: string
  shippingCountry: string
  discountCode?: string
  notes?: string
  subtotal: number
  shippingCost: number
  total: number
}

// In-memory order log. Resets on redeploy — fine for pre-launch demo.
const orders: Array<CheckoutBody & { orderNumber: string; createdAt: string }> = []

export async function POST(req: Request) {
  let body: CheckoutBody
  try {
    body = (await req.json()) as CheckoutBody
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (!body.customerEmail || !body.shippingName || !body.shippingAddress || !body.items?.length) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const orderNumber = `LS-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 9999).toString(36).toUpperCase()}`
  orders.push({ ...body, orderNumber, createdAt: new Date().toISOString() })

  return NextResponse.json({ orderNumber, status: 'pending_payment' })
}

export async function GET() {
  return NextResponse.json({ count: orders.length })
}
