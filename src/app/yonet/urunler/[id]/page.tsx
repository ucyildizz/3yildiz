'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  ArrowLeft,
  Save,
  Trash2,
  ImagePlus,
  X,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import { Button, Input, Textarea, Select, Card, CardContent, Badge } from '@/components/ui'
import { Product, Category } from '@/types/database'
import {
  getProductBySlug,
  getAllCategories,
  createProduct,
  updateProduct,
  deleteProduct,
} from '@/lib/supabase/database'
import { createClient } from '@/lib/supabase/client'
import { MATERIALS, FEATURES } from '@/lib/constants'
import { slugify } from '@/lib/utils'

const productSchema = z.object({
  name: z.string().min(2, 'Ürün adı en az 2 karakter olmalı'),
  slug: z.string().min(2, 'Slug gerekli'),
  description: z.string().optional(),
  short_description: z.string().optional(),
  category_id: z.string().min(1, 'Kategori seçin'),
  material: z.string().optional(),
  is_active: z.boolean(),
  is_featured: z.boolean(),
  is_popular: z.boolean(),
})

type ProductFormData = z.infer<typeof productSchema>

export default function AdminProductEditPage() {
  const params = useParams()
  const router = useRouter()
  const isNew = params.id === 'yeni'

  const [product, setProduct] = useState<Product | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [images, setImages] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      short_description: '',
      category_id: '',
      material: '',
      is_active: true,
      is_featured: false,
      is_popular: false,
    },
  })

  useEffect(() => {
    fetchData()
  }, [params.id])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch categories
      const categoriesData = await getAllCategories()
      setCategories(categoriesData)

      // Fetch product if editing
      if (!isNew) {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('products')
          .select('*, category:categories(*)')
          .eq('id', params.id)
          .single()

        if (error) throw error

        if (data) {
          setProduct(data)
          setSelectedFeatures(data.features || [])
          setImages(data.images || [])
          reset({
            name: data.name,
            slug: data.slug,
            description: data.description || '',
            short_description: data.short_description || '',
            category_id: data.category_id || '',
            material: data.material || '',
            is_active: data.is_active,
            is_featured: data.is_featured,
            is_popular: data.is_popular,
          })
        }
      }
    } catch (err) {
      setError('Veri yüklenirken hata oluştu')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const watchName = watch('name')

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    setValue('name', name)
    if (isNew) {
      setValue('slug', slugify(name))
    }
  }

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    )
  }

  const onSubmit = async (data: ProductFormData) => {
    try {
      setError(null)
      const productData = {
        ...data,
        features: selectedFeatures,
        images,
      }

      if (isNew) {
        await createProduct(productData)
      } else {
        await updateProduct(params.id as string, productData)
      }

      router.push('/yonet/urunler')
    } catch (err) {
      setError(isNew ? 'Ürün eklenirken hata oluştu' : 'Ürün güncellenirken hata oluştu')
      console.error(err)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Bu ürünü silmek istediğinize emin misiniz?')) return

    try {
      setError(null)
      await deleteProduct(params.id as string)
      router.push('/yonet/urunler')
    } catch (err) {
      setError('Ürün silinirken hata oluştu')
      console.error(err)
    }
  }

  const categoryOptions = categories.map((c) => ({
    value: c.id,
    label: c.name,
  }))

  const materialOptions = [
    { value: '', label: 'Seçiniz' },
    ...Object.entries(MATERIALS).map(([key, value]) => ({
      value: key,
      label: value.label,
    })),
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isNew ? 'Yeni Ürün Ekle' : 'Ürün Düzenle'}
          </h1>
          <p className="text-gray-600">
            {isNew ? 'Yeni bir ürün ekleyin' : product?.name}
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card variant="bordered">
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-semibold text-gray-900 mb-4">
                  Temel Bilgiler
                </h2>
                <Input
                  label="Ürün Adı *"
                  error={errors.name?.message}
                  {...register('name')}
                  onChange={handleNameChange}
                />
                <Input
                  label="Slug (URL)"
                  error={errors.slug?.message}
                  {...register('slug')}
                />
                <Textarea
                  label="Kısa Açıklama"
                  rows={2}
                  {...register('short_description')}
                />
                <Textarea
                  label="Detaylı Açıklama"
                  rows={4}
                  {...register('description')}
                />
              </CardContent>
            </Card>

            {/* Images */}
            <Card variant="bordered">
              <CardContent className="pt-6">
                <h2 className="font-semibold text-gray-900 mb-4">
                  Ürün Görselleri
                </h2>
                <div className="grid grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group"
                    >
                      <img
                        src={image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setImages(images.filter((_, i) => i !== index))
                        }
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const url = prompt('Görsel URL girin:')
                      if (url) setImages([...images, url])
                    }}
                    className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-colors"
                  >
                    <ImagePlus className="w-8 h-8" />
                    <span className="text-sm mt-2">Ekle</span>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card variant="bordered">
              <CardContent className="pt-6">
                <h2 className="font-semibold text-gray-900 mb-4">
                  Ürün Özellikleri
                </h2>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(FEATURES).map(([key, value]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => toggleFeature(key)}
                      className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-colors ${
                        selectedFeatures.includes(key)
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {value.label}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish */}
            <Card variant="bordered">
              <CardContent className="pt-6">
                <h2 className="font-semibold text-gray-900 mb-4">Yayın</h2>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('is_active')}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Aktif</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('is_featured')}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Öne Çıkan</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('is_popular')}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Popüler</span>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Category & Material */}
            <Card variant="bordered">
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-semibold text-gray-900 mb-4">
                  Kategori & Malzeme
                </h2>
                <Select
                  label="Kategori *"
                  options={categoryOptions}
                  error={errors.category_id?.message}
                  placeholder="Kategori seçin"
                  {...register('category_id')}
                />
                <Select
                  label="Malzeme"
                  options={materialOptions}
                  {...register('material')}
                />
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <Save className="w-5 h-5 mr-2" />
                )}
                {isNew ? 'Ürün Ekle' : 'Değişiklikleri Kaydet'}
              </Button>
              {!isNew && (
                <Button type="button" variant="danger" onClick={handleDelete}>
                  <Trash2 className="w-5 h-5 mr-2" />
                  Ürünü Sil
                </Button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
