import { getProducts, getCategories } from '@/lib/supabase/database'
import { ProductsClient } from './products-client'

export const revalidate = 60

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts().catch(() => []),
    getCategories(true).catch(() => []),
  ])

  return <ProductsClient products={products} categories={categories} />
}
