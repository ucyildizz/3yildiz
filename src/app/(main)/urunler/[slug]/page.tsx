import { notFound } from 'next/navigation'
import { getProductBySlug, getProducts } from '@/lib/supabase/database'
import { ProductDetailClient } from './product-detail-client'

export const revalidate = 60

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug).catch(() => null)

  if (!product) {
    notFound()
  }

  // Get related products
  const relatedProducts = await getProducts({ categoryId: product.category_id ?? undefined, limit: 4 })
    .then(products => products.filter(p => p.id !== product.id).slice(0, 4))
    .catch(() => [])

  return (
    <ProductDetailClient
      product={product}
      relatedProducts={relatedProducts}
    />
  )
}
