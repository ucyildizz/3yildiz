'use client'

import { useState, useEffect } from 'react'
import {
  Plus,
  Edit,
  Trash2,
  FolderTree,
  GripVertical,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import { Button, Input, Badge } from '@/components/ui'
import { Category } from '@/types/database'
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from '@/lib/supabase/database'
import { slugify } from '@/lib/utils'

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image_url: '',
    is_active: true,
    order: 0,
  })

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getAllCategories()
      setCategories(data)
    } catch (err) {
      setError('Kategoriler yüklenirken hata oluştu')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    setFormData(prev => ({
      ...prev,
      name,
      slug: editingId ? prev.slug : slugify(name),
    }))
  }

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      image_url: '',
      is_active: true,
      order: categories.length,
    })
    setEditingId(null)
  }

  const handleEdit = (category: Category) => {
    setEditingId(category.id)
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      image_url: category.image_url || '',
      is_active: category.is_active,
      order: category.order,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      setError('Kategori adı gerekli')
      return
    }

    try {
      setSaving(true)
      setError(null)

      if (editingId) {
        await updateCategory(editingId, formData)
      } else {
        await createCategory({
          ...formData,
          order: categories.length,
        })
      }

      await fetchCategories()
      resetForm()
    } catch (err) {
      setError(editingId ? 'Kategori güncellenirken hata oluştu' : 'Kategori eklenirken hata oluştu')
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu kategoriyi silmek istediğinize emin misiniz?')) return

    try {
      setError(null)
      await deleteCategory(id)
      await fetchCategories()
      if (editingId === id) {
        resetForm()
      }
    } catch (err) {
      setError('Kategori silinirken hata oluştu')
      console.error(err)
    }
  }

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kategoriler</h1>
          <p className="text-gray-600">Ürün kategorilerini yönetin</p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Categories List */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-gray-900">
              Mevcut Kategoriler ({categories.length})
            </h2>
          </div>
          <div className="divide-y">
            {categories.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <FolderTree className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Henüz kategori eklenmemiş</p>
              </div>
            ) : (
              categories.map((category) => (
                <div
                  key={category.id}
                  className={`p-4 flex items-center justify-between hover:bg-gray-50 ${
                    editingId === category.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <GripVertical className="w-5 h-5 text-gray-400 cursor-grab" />
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FolderTree className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{category.name}</p>
                      <p className="text-sm text-gray-500">/{category.slug}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={category.is_active ? 'success' : 'default'}>
                      {category.is_active ? 'Aktif' : 'Pasif'}
                    </Badge>
                    <button
                      onClick={() => handleEdit(category)}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Add/Edit Category Form */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-4">
            {editingId ? 'Kategori Düzenle' : 'Yeni Kategori Ekle'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Kategori Adı *"
              placeholder="Örn: Suntalem Sofralar"
              value={formData.name}
              onChange={handleNameChange}
            />
            <Input
              label="Slug (URL)"
              placeholder="suntalem-sofralar"
              helperText="Otomatik oluşturulur"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
            />
            <Input
              label="Açıklama"
              placeholder="Kategori açıklaması"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
            <Input
              label="Görsel URL"
              placeholder="/images/categories/..."
              value={formData.image_url}
              onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
            />
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">Aktif</span>
            </label>
            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <Plus className="w-5 h-5 mr-2" />
                )}
                {editingId ? 'Güncelle' : 'Ekle'}
              </Button>
              {editingId && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                >
                  İptal
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
