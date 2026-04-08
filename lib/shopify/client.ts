const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

const endpoint = `https://${domain}/api/2024-01/graphql.json`

interface ShopifyFetchOptions {
  query: string
  variables?: Record<string, unknown>
  cache?: RequestCache
  tags?: string[]
}

interface ShopifyResponse<T> {
  data: T
  errors?: { message: string }[]
}

export async function shopifyFetch<T>({
  query,
  variables = {},
  cache = 'force-cache',
  tags,
}: ShopifyFetchOptions): Promise<T> {
  if (!domain || !accessToken) {
    throw new Error(
      'Shopify environment variables not configured. Check NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN.'
    )
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': accessToken,
    },
    body: JSON.stringify({ query, variables }),
    cache,
    next: tags ? { tags } : undefined,
  })

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status} ${res.statusText}`)
  }

  const json: ShopifyResponse<T> = await res.json()

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join('\n'))
  }

  return json.data
}
