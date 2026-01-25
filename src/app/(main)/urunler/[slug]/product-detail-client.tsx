'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  ChevronLeft,
  ShoppingCart,
  Minus,
  Plus,
  Check,
  Layers,
  Ruler,
  Package,
} from 'lucide-react'
import { Button, Badge } from '@/components/ui'
import { useQuoteStore } from '@/store/quote-store'
import { Product, Category } from '@/types/database'
import { MATERIALS, FEATURES } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface ProductDetailClientProps {
  product: Product & { category: Category | null }
  relatedProducts: (Product & { category: Category | null })[]
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const router = useRouter()
  const [selectedVariant, setSelectedVariant] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const addItem = useQuoteStore((state) => state.addItem)
  const cartItems = useQuoteStore((state) => state.items)

  const isInCart = cartItems.some((item) => item.product_id === product.id)

  const handleAddToQuote = () => {
    addItem({
      product_id: product.id,
      product_name: product.name,
      variant: selectedVariant || undefined,
      quantity,
    })
  }

  const images = product.images || []
  const variants = product.variants as { id: string; name: string }[] || []
  const dimensions = product.dimensions as { width?: number; height?: number; depth?: number; diameter?: number; unit?: string } | null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Ana Sayfa
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/urunler" className="text-gray-500 hover:text-gray-700">
              Ürünler
            </Link>
            {product.category && (
              <>
                <span className="text-gray-300">/</span>
                <Link
                  href={`/urunler?kategori=${product.category.slug}`}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {product.category.name}
                </Link>
              </>
            )}
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          Geri Dön
        </button>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Images */}
            <div>
              <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 mb-4">
                <Image
                  src={images[selectedImage] || '/images/products/default.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {product.is_popular && (
                  <Badge variant="warning" className="absolute top-4 left-4">
                    Popüler
                  </Badge>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={cn(
                        'relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors',
                        selectedImage === index
                          ? 'border-blue-600'
                          : 'border-gray-200 hover:border-gray-300'
                      )}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} - ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              {product.category && (
                <Link
                  href={`/urunler?kategori=${product.category.slug}`}
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  {product.category.name}
                </Link>
              )}
              <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
                {product.name}
              </h1>

              {product.description && (
                <p className="text-gray-600 leading-relaxed mb-6">
                  {product.description}
                </p>
              )}

              {/* Material & Features */}
              <div className="flex flex-wrap gap-2 mb-6">
                {product.material && (
                  <Badge variant="info" className="flex items-center gap-1">
                    <Layers className="w-3 h-3" />
                    {MATERIALS[product.material as keyof typeof MATERIALS]?.label}
                  </Badge>
                )}
                {product.features?.map((feature) => (
                  <Badge key={feature} className="flex items-center gap-1">
                    {FEATURES[feature as keyof typeof FEATURES]?.label || feature}
                  </Badge>
                ))}
              </div>

              {/* Dimensions */}
              {dimensions && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-medium text-gray-900 flex items-center gap-2 mb-2">
                    <Ruler className="w-4 h-4" />
                    Boyutlar
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {dimensions.width && (
                      <div>
                        <span className="text-gray-500">Genişlik:</span>{' '}
                        <span className="font-medium">
                          {dimensions.width} {dimensions.unit}
                        </span>
                      </div>
                    )}
                    {dimensions.height && (
                      <div>
                        <span className="text-gray-500">Yükseklik:</span>{' '}
                        <span className="font-medium">
                          {dimensions.height} {dimensions.unit}
                        </span>
                      </div>
                    )}
                    {dimensions.depth && (
                      <div>
                        <span className="text-gray-500">Derinlik:</span>{' '}
                        <span className="font-medium">
                          {dimensions.depth} {dimensions.unit}
                        </span>
                      </div>
                    )}
                    {dimensions.diameter && (
                      <div>
                        <span className="text-gray-500">Çap:</span>{' '}
                        <span className="font-medium">
                          {dimensions.diameter} {dimensions.unit}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Variants */}
              {variants.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">Seçenekler</h3>
                  <div className="flex flex-wrap gap-2">
                    {variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant.name)}
                        className={cn(
                          'px-4 py-2 rounded-lg border-2 text-sm font-medium transition-colors',
                          selectedVariant === variant.name
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        )}
                      >
                        {variant.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Adet</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Quote */}
              <div className="flex gap-4">
                <Button
                  size="lg"
                  onClick={handleAddToQuote}
                  className="flex-1"
                >
                  {isInCart ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Sepette - Tekrar Ekle
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Teklif Sepetine Ekle
                    </>
                  )}
                </Button>
                <Link href="/teklif">
                  <Button variant="outline" size="lg">
                    <Package className="w-5 h-5 mr-2" />
                    Sepete Git
                  </Button>
                </Link>
              </div>

              {/* Info Note */}
              <p className="text-sm text-gray-500 mt-4">
                * Toptan alımlar için özel fiyatlandırma. Teklif sepetinize ekleyip
                form doldurun, size en kısa sürede dönüş yapalım.
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Benzer Ürünler
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/urunler/${relatedProduct.slug}`}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={relatedProduct.images?.[0] || '/images/products/default.jpg'}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900">
                      {relatedProduct.name}
                    </h3>
                    {relatedProduct.short_description && (
                      <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                        {relatedProduct.short_description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
