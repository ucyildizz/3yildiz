'use client'

import { useState } from 'react'
import { Filter, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui'
import { Category } from '@/types/database'
import { MATERIALS, FEATURES } from '@/lib/constants'

interface ProductFiltersProps {
  categories: Category[]
  selectedCategory?: string
  selectedMaterial?: string
  selectedFeatures: string[]
  onCategoryChange: (slug: string | undefined) => void
  onMaterialChange: (material: string | undefined) => void
  onFeaturesChange: (features: string[]) => void
  onClearFilters: () => void
}

export function ProductFilters({
  categories,
  selectedCategory,
  selectedMaterial,
  selectedFeatures,
  onCategoryChange,
  onMaterialChange,
  onFeaturesChange,
  onClearFilters,
}: ProductFiltersProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const hasActiveFilters = selectedCategory || selectedMaterial || selectedFeatures.length > 0

  const toggleFeature = (feature: string) => {
    if (selectedFeatures.includes(feature)) {
      onFeaturesChange(selectedFeatures.filter((f) => f !== feature))
    } else {
      onFeaturesChange([...selectedFeatures, feature])
    }
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Aktif Filtreler</span>
          <button
            onClick={onClearFilters}
            className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Temizle
          </button>
        </div>
      )}

      {/* Categories */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Kategoriler</h3>
        <div className="space-y-2">
          <button
            onClick={() => onCategoryChange(undefined)}
            className={cn(
              'block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
              !selectedCategory
                ? 'bg-blue-50 text-blue-600 font-medium'
                : 'text-gray-600 hover:bg-gray-50'
            )}
          >
            Tümü
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.slug)}
              className={cn(
                'block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                selectedCategory === category.slug
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Materials */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Malzeme</h3>
        <div className="space-y-2">
          <button
            onClick={() => onMaterialChange(undefined)}
            className={cn(
              'block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
              !selectedMaterial
                ? 'bg-blue-50 text-blue-600 font-medium'
                : 'text-gray-600 hover:bg-gray-50'
            )}
          >
            Tümü
          </button>
          {Object.entries(MATERIALS).map(([key, value]) => (
            <button
              key={key}
              onClick={() => onMaterialChange(key)}
              className={cn(
                'block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                selectedMaterial === key
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              )}
            >
              {value.label}
            </button>
          ))}
        </div>
      </div>

      {/* Features */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Özellikler</h3>
        <div className="space-y-2">
          {Object.entries(FEATURES).map(([key, value]) => (
            <label
              key={key}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedFeatures.includes(key)}
                onChange={() => toggleFeature(key)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">{value.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setIsMobileOpen(true)}
          className="w-full"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filtrele
          {hasActiveFilters && (
            <span className="ml-2 px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
              {(selectedCategory ? 1 : 0) + (selectedMaterial ? 1 : 0) + selectedFeatures.length}
            </span>
          )}
        </Button>
      </div>

      {/* Mobile Filter Sidebar */}
      <div
        className={cn(
          'fixed inset-0 z-50 lg:hidden transition-opacity duration-300',
          isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsMobileOpen(false)}
        />
        <div
          className={cn(
            'absolute right-0 top-0 h-full w-80 bg-white shadow-xl transition-transform duration-300 overflow-y-auto',
            isMobileOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="font-semibold text-lg">Filtreler</h2>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4">
            <FilterContent />
          </div>
        </div>
      </div>

      {/* Desktop Filter Sidebar */}
      <div className="hidden lg:block bg-white rounded-2xl border border-gray-200 p-6 sticky top-24">
        <h2 className="font-semibold text-lg mb-6">Filtreler</h2>
        <FilterContent />
      </div>
    </>
  )
}
