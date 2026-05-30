'use client'

import { Link } from 'next-view-transitions'
import Image from 'next/image'
import { ShoppingCart, Eye, Star, ArrowRight, Sparkles } from 'lucide-react'
import { Product } from '@/types/database'
import { Button } from '@/components/ui'
import { useQuoteStore } from '@/store/quote-store'
import { MATERIALS } from '@/lib/constants'
import { ScrollReveal } from '@/components/common/scroll-reveal'

interface FeaturedProductsProps {
  products: Product[]
  title?: string
  subtitle?: string
}

export function FeaturedProducts({
  products,
  title = 'Öne Çıkan Ürünler',
  subtitle = 'En çok tercih edilen ürünlerimiz'
}: FeaturedProductsProps) {
  const addItem = useQuoteStore((state) => state.addItem)

  const handleAddToQuote = (product: Product) => {
    addItem({
      product_id: product.id,
      product_name: product.name,
      quantity: 1
    })
  }

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-red-50/50 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <ScrollReveal direction="up" className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            {subtitle}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            {title.split(' ').map((word, i) => (
              <span key={i}>
                {i === title.split(' ').length - 1 ? (
                  <span className="text-gradient-red">{word}</span>
                ) : (
                  word + ' '
                )}
              </span>
            ))}
          </h2>
        </ScrollReveal>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ScrollReveal
              key={product.id}
              direction="up"
              delay={index * 100}
              className="group"
            >
              <div className="bg-white rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-500 overflow-hidden border border-gray-100 hover:-translate-y-2">
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
                  <Image
                    src={product.images?.[0] || '/images/products/default.jpg'}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.is_popular && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-yellow-500 to-red-500 text-white text-xs font-bold rounded-full shadow-lg shadow-red-500/30">
                        <Star className="w-3 h-3" fill="currentColor" />
                        Popüler
                      </span>
                    )}
                    {product.material && MATERIALS[product.material as keyof typeof MATERIALS] && (
                      <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium rounded-full shadow-sm">
                        {MATERIALS[product.material as keyof typeof MATERIALS]?.label}
                      </span>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute inset-x-4 bottom-4 flex gap-2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                    <Link href={`/urunler/${product.slug}`} className="flex-1">
                      <Button variant="secondary" size="sm" className="w-full bg-white/90 backdrop-blur-sm hover:bg-white">
                        <Eye className="w-4 h-4 mr-2" />
                        İncele
                      </Button>
                    </Link>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleAddToQuote(product)}
                      className="flex-1"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Ekle
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <Link href={`/urunler/${product.slug}`} className="block group/title">
                    <h3 className="font-bold text-lg text-gray-900 group-hover/title:text-red-600 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                  {product.short_description && (
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                      {product.short_description}
                    </p>
                  )}

                  {/* Features */}
                  {product.features && product.features.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {product.features.slice(0, 2).map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 bg-red-50 text-red-600 text-xs font-medium rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* View link */}
                  <Link
                    href={`/urunler/${product.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 mt-4 group/link"
                  >
                    Detayları Gör
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* View All */}
        <ScrollReveal direction="up" delay={400} className="text-center mt-16">
          <Link href="/urunler">
            <Button variant="outline" size="lg" className="group">
              Tüm Ürünleri Görüntüle
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}
