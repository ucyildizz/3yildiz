'use client'

import { useState, useEffect } from 'react'
import {
  Plus,
  Trash2,
  GripVertical,
  Image as ImageIcon,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  Save,
} from 'lucide-react'
import { Button, Input, Textarea, Badge, Card, CardContent } from '@/components/ui'
import { ImageUploader } from '@/components/admin/image-uploader'
import { STORAGE_BUCKETS } from '@/lib/supabase/storage'
import { Slider } from '@/types/database'
import { getSliders, createSlider, updateSlider, deleteSlider } from '@/lib/supabase/database'

export default function AdminSliderPage() {
  const [sliders, setSliders] = useState<Slider[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editingSlider, setEditingSlider] = useState<Slider | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    images: [] as string[],
    button_text: '',
    button_link: '',
    is_active: true,
    order: 0,
  })

  useEffect(() => {
    fetchSliders()
  }, [])

  const fetchSliders = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getSliders(false)
      setSliders(data)
    } catch (err) {
      setError('Slider\'lar yüklenirken hata oluştu')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getSliderImages = (slider: Slider): string[] => {
    if (slider.images && slider.images.length > 0) {
      return slider.images
    }
    if (slider.image_url) {
      return [slider.image_url]
    }
    return []
  }

  const handleEdit = (slider: Slider) => {
    setEditingSlider(slider)
    setIsAdding(false)
    setCurrentImageIndex(0)
    setFormData({
      title: slider.title,
      subtitle: slider.subtitle || '',
      description: slider.description || '',
      images: getSliderImages(slider),
      button_text: slider.button_text || '',
      button_link: slider.button_link || '',
      is_active: slider.is_active,
      order: slider.order,
    })
  }

  const handleAdd = () => {
    setEditingSlider(null)
    setIsAdding(true)
    setCurrentImageIndex(0)
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      images: [],
      button_text: '',
      button_link: '',
      is_active: true,
      order: sliders.length,
    })
  }

  const handleCancel = () => {
    setEditingSlider(null)
    setIsAdding(false)
    setCurrentImageIndex(0)
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      images: [],
      button_text: '',
      button_link: '',
      is_active: true,
      order: 0,
    })
  }

  const handleImagesChange = (newImages: string[]) => {
    setFormData(prev => ({
      ...prev,
      images: newImages
    }))
    // Geçerli index'i güncelle
    if (currentImageIndex >= newImages.length) {
      setCurrentImageIndex(Math.max(0, newImages.length - 1))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      setError('Başlık gerekli')
      return
    }

    if (formData.images.length === 0) {
      setError('En az bir görsel ekleyin')
      return
    }

    try {
      setSaving(true)
      setError(null)

      const dataToSave = {
        title: formData.title,
        subtitle: formData.subtitle || undefined,
        description: formData.description || undefined,
        images: formData.images,
        image_url: formData.images[0], // İlk resmi ana resim olarak kaydet (geriye uyumluluk)
        button_text: formData.button_text || undefined,
        button_link: formData.button_link || undefined,
        is_active: formData.is_active,
        order: formData.order,
      }

      if (editingSlider) {
        await updateSlider(editingSlider.id, dataToSave)
      } else {
        await createSlider({
          ...dataToSave,
          order: sliders.length,
        })
      }

      await fetchSliders()
      handleCancel()
    } catch (err) {
      setError(editingSlider ? 'Slider güncellenirken hata oluştu' : 'Slider eklenirken hata oluştu')
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu slider\'ı silmek istediğinize emin misiniz?')) return

    try {
      setError(null)
      await deleteSlider(id)
      await fetchSliders()
      if (editingSlider?.id === id) {
        handleCancel()
      }
    } catch (err) {
      setError('Slider silinirken hata oluştu')
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
          <h1 className="text-2xl font-bold text-gray-900">Slider Yönetimi</h1>
          <p className="text-gray-600">Ana sayfa slider görsellerini yönetin</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="w-5 h-5 mr-2" />
          Yeni Slide
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Slider List */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-gray-900">Mevcut Slider&apos;lar ({sliders.length})</h2>
            <p className="text-sm text-gray-500">Düzenlemek için tıklayın</p>
          </div>
          <div className="divide-y">
            {sliders.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Henüz slider eklenmemiş</p>
              </div>
            ) : (
              sliders.map((slider) => {
                const images = getSliderImages(slider)
                return (
                  <div
                    key={slider.id}
                    className={`p-4 flex items-center gap-4 hover:bg-gray-50 cursor-pointer ${
                      editingSlider?.id === slider.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => handleEdit(slider)}
                  >
                    <GripVertical className="w-5 h-5 text-gray-400 cursor-grab flex-shrink-0" />
                    <div className="w-24 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden relative">
                      {images.length > 0 ? (
                        <>
                          <img
                            src={images[0]}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                          {images.length > 1 && (
                            <span className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                              +{images.length - 1}
                            </span>
                          )}
                        </>
                      ) : (
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {slider.title}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {images.length} görsel • {slider.subtitle || slider.description || '-'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge variant={slider.is_active ? 'success' : 'default'}>
                        {slider.is_active ? (
                          <Eye className="w-3 h-3 mr-1" />
                        ) : (
                          <EyeOff className="w-3 h-3 mr-1" />
                        )}
                        {slider.is_active ? 'Aktif' : 'Pasif'}
                      </Badge>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(slider.id)
                        }}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Edit/Add Form */}
        <div>
          <Card variant="bordered" className="sticky top-24">
            <CardContent className="pt-6">
              <h2 className="font-semibold text-gray-900 mb-4">
                {editingSlider
                  ? 'Slide Düzenle'
                  : isAdding
                  ? 'Yeni Slide Ekle'
                  : 'Düzenlemek için bir slide seçin'}
              </h2>

              {(editingSlider || isAdding) && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Başlık *"
                    placeholder="Slide başlığı"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  />
                  <Input
                    label="Alt Başlık"
                    placeholder="Alt başlık"
                    value={formData.subtitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                  />
                  <Textarea
                    label="Açıklama"
                    rows={3}
                    placeholder="Slide açıklaması"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  />

                  {/* Multiple Images */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Görseller * ({formData.images.length} adet)
                    </label>
                    <ImageUploader
                      images={formData.images}
                      onChange={handleImagesChange}
                      bucket={STORAGE_BUCKETS.SLIDERS}
                      maxImages={5}
                      maxSizeMB={5}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Buton Metni"
                      placeholder="Keşfet"
                      value={formData.button_text}
                      onChange={(e) => setFormData(prev => ({ ...prev, button_text: e.target.value }))}
                    />
                    <Input
                      label="Buton Linki"
                      placeholder="/urunler"
                      value={formData.button_link}
                      onChange={(e) => setFormData(prev => ({ ...prev, button_link: e.target.value }))}
                    />
                  </div>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Aktif</span>
                  </label>

                  {/* Preview */}
                  <div className="mt-6 pt-6 border-t">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Önizleme {formData.images.length > 1 && `(${currentImageIndex + 1}/${formData.images.length})`}
                    </h3>
                    <div className="relative aspect-[16/6] bg-gray-100 rounded-lg overflow-hidden">
                      {formData.images.length > 0 && (
                        <img
                          src={formData.images[currentImageIndex] || formData.images[0]}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <p className="text-xs text-white/70">{formData.subtitle || 'Alt Başlık'}</p>
                        <p className="text-lg font-bold text-white">{formData.title || 'Başlık'}</p>
                        <p className="text-xs text-white/80 mt-1">{formData.description || 'Açıklama'}</p>
                      </div>
                      {/* Preview Navigation Dots */}
                      {formData.images.length > 1 && (
                        <div className="absolute bottom-2 right-2 flex gap-1">
                          {formData.images.map((_, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-2 h-2 rounded-full transition-colors ${
                                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button type="submit" className="flex-1" disabled={saving}>
                      {saving ? (
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      ) : (
                        <Save className="w-5 h-5 mr-2" />
                      )}
                      {editingSlider ? 'Güncelle' : 'Ekle'}
                    </Button>
                    <Button type="button" variant="outline" onClick={handleCancel}>
                      İptal
                    </Button>
                  </div>
                </form>
              )}

              {!editingSlider && !isAdding && (
                <div className="text-center py-8">
                  <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Düzenlemek için soldaki listeden bir slide seçin
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
