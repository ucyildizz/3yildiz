'use client'

import { useState, useMemo } from 'react'
import { Search, Grid, List } from 'lucide-react'
import { ProductCard, ProductFilters } from '@/components/products'
import { Input } from '@/components/ui'
import { Product, Category } from '@/types/database'
import { cn } from '@/lib/utils'

interface ProductsClientProps {
  products: (Product & { category: Category | null })[]
  categories: Category[]
}

export function ProductsClient({ products, categories }: ProductsClientProps) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>()
  const [selectedMaterial, setSelectedMaterial] = useState<string | undefined>()
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase()
        const matchesSearch =
          product.name.toLowerCase().includes(searchLower) ||
          product.description?.toLowerCase().includes(searchLower) ||
          product.short_description?.toLowerCase().includes(searchLower)
        if (!matchesSearch) return false
      }

      // Category filter
      if (selectedCategory) {
        const category = categories.find((c) => c.slug === selectedCategory)
        if (category && product.category_id !== category.id) return false
      }

      // Material filter
      if (selectedMaterial && product.material !== selectedMaterial) return false

      // Features filter
      if (selectedFeatures.length > 0) {
        const productFeatures = product.features || []
        const hasAllFeatures = selectedFeatures.every((f) =>
          productFeatures.includes(f)
        )
        if (!hasAllFeatures) return false
      }

      return true
    })
  }, [search, selectedCategory, selectedMaterial, selectedFeatures, products, categories])

  const clearFilters = () => {
    setSearch('')
    setSelectedCategory(undefined)
    setSelectedMaterial(undefined)
    setSelectedFeatures([])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Ürünlerimiz</h1>
          <p className="text-gray-600 mt-2">
            Metal, plastik ve ahşap ev gereçleri ürün gamımızı keşfedin.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-72 flex-shrink-0">
            <ProductFilters
              categories={categories}
              selectedCategory={selectedCategory}
              selectedMaterial={selectedMaterial}
              selectedFeatures={selectedFeatures}
              onCategoryChange={setSelectedCategory}
              onMaterialChange={setSelectedMaterial}
              onFeaturesChange={setSelectedFeatures}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search & View Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Ürün ara..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  {filteredProducts.length} ürün
                </span>
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      'p-2 transition-colors',
                      viewMode === 'grid'
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-400 hover:text-gray-600'
                    )}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={cn(
                      'p-2 transition-colors',
                      viewMode === 'list'
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-400 hover:text-gray-600'
                    )}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div
                className={cn(
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-4'
                )}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Ürün bulunamadı
                </h3>
                <p className="text-gray-500 mb-4">
                  Arama kriterlerinize uygun ürün bulunamadı.
                </p>
                <button
                  onClick={clearFilters}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Filtreleri temizle
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
