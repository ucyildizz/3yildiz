'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Eye, Star } from 'lucide-react'
import { Product } from '@/types/database'
import { Button } from '@/components/ui'
import { useQuoteStore } from '@/store/quote-store'
import { MATERIALS } from '@/lib/constants'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useQuoteStore((state) => state.addItem)

  const handleAddToQuote = () => {
    addItem({
      product_id: product.id,
      product_name: product.name,
      quantity: 1
    })
  }

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <Image
          src={product.images[0] || '/images/products/default.jpg'}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.is_popular && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-500 text-white text-xs font-medium rounded-full">
              <Star className="w-3 h-3" fill="currentColor" />
              Popüler
            </span>
          )}
          {product.material && (
            <span className="px-2 py-1 bg-gray-900/80 text-white text-xs font-medium rounded-full">
              {MATERIALS[product.material as keyof typeof MATERIALS]?.label}
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex gap-2">
            <Link href={`/urunler/${product.slug}`} className="flex-1">
              <Button variant="secondary" size="sm" className="w-full">
                <Eye className="w-4 h-4 mr-2" />
                İncele
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              onClick={handleAddToQuote}
              className="flex-1"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Ekle
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <Link href={`/urunler/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        {product.short_description && (
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">
            {product.short_description}
          </p>
        )}

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {product.features.slice(0, 2).map((feature) => (
              <span
                key={feature}
                className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded"
              >
                {feature}
              </span>
            ))}
          </div>
        )}

        {/* Variants */}
        {product.variants && product.variants.length > 0 && (
          <p className="text-xs text-gray-400 mt-3">
            {product.variants.length} farklı seçenek
          </p>
        )}
      </div>
    </div>
  )
}
