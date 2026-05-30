'use client'

import { Link } from 'next-view-transitions'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Grid3X3 } from 'lucide-react'
import { Category } from '@/types/database'

interface CategoriesSectionProps {
  categories: Category[]
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-50/50 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-full text-sm font-semibold mb-4">
            <Grid3X3 className="w-4 h-4" />
            Ürün Kategorileri
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Üretim <span className="text-gradient-red">Gruplarımız</span>
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            Metal, plastik ve ahşap hammaddelerle ürettiğimiz geniş ürün yelpazemizi keşfedin.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`/urunler?category=${category.slug}`}
                className="group block relative overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-500 hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={category.image_url || '/images/categories/default.jpg'}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-300 transition-colors">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-gray-300 text-sm line-clamp-2 mb-4">
                      {category.description}
                    </p>
                  )}
                  <div className="flex items-center text-red-400 text-sm font-semibold group-hover:text-red-300 transition-colors">
                    <span>Ürünleri Gör</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>

                {/* Corner decoration */}
                <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-white/30 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/urunler"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30 hover:shadow-red-600/40"
          >
            Tüm Ürünleri Görüntüle
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
