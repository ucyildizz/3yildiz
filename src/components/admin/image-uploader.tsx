'use client'

import { useState, useRef, useCallback } from 'react'
import { Upload, X, Loader2, AlertCircle, ImagePlus, GripVertical } from 'lucide-react'
import { uploadImage, validateImageFile, STORAGE_BUCKETS, type StorageBucket } from '@/lib/supabase/storage'

interface ImageUploaderProps {
  images: string[]
  onChange: (images: string[]) => void
  bucket: StorageBucket
  folder?: string
  maxImages?: number
  maxSizeMB?: number
  className?: string
}

export function ImageUploader({
  images,
  onChange,
  bucket,
  folder,
  maxImages = 10,
  maxSizeMB = 5,
  className = '',
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return

      // Maksimum resim sayısı kontrolü
      const remainingSlots = maxImages - images.length
      if (remainingSlots <= 0) {
        setError(`Maksimum ${maxImages} resim yükleyebilirsiniz`)
        return
      }

      const filesToUpload = Array.from(files).slice(0, remainingSlots)

      // Validasyon
      for (const file of filesToUpload) {
        const validation = validateImageFile(file, { maxSizeMB })
        if (!validation.valid) {
          setError(validation.error || 'Geçersiz dosya')
          return
        }
      }

      setUploading(true)
      setError(null)

      try {
        const uploadPromises = filesToUpload.map((file) => uploadImage(file, bucket, folder))
        const newUrls = await Promise.all(uploadPromises)
        onChange([...images, ...newUrls])
      } catch (err) {
        console.error('Upload error:', err)
        setError(err instanceof Error ? err.message : 'Yükleme sırasında hata oluştu')
      } finally {
        setUploading(false)
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      }
    },
    [images, onChange, bucket, folder, maxImages, maxSizeMB]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)
      handleFileSelect(e.dataTransfer.files)
    },
    [handleFileSelect]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }, [])

  const removeImage = useCallback(
    (index: number) => {
      const newImages = images.filter((_, i) => i !== index)
      onChange(newImages)
    },
    [images, onChange]
  )

  const moveImage = useCallback(
    (fromIndex: number, toIndex: number) => {
      if (toIndex < 0 || toIndex >= images.length) return
      const newImages = [...images]
      const [moved] = newImages.splice(fromIndex, 1)
      newImages.splice(toIndex, 0, moved)
      onChange(newImages)
    },
    [images, onChange]
  )

  return (
    <div className={className}>
      {/* Error Message */}
      {error && (
        <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <p>{error}</p>
          <button
            type="button"
            onClick={() => setError(null)}
            className="ml-auto text-red-500 hover:text-red-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Image Grid */}
      <div className="grid grid-cols-4 gap-2 mb-3">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden group border-2 border-transparent hover:border-red-300 transition-colors"
          >
            <img
              src={image}
              alt={`Görsel ${index + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Resim yüklenemezse placeholder göster
                const target = e.target as HTMLImageElement
                target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="%23f3f4f6" width="100" height="100"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="12">Hata</text></svg>'
              }}
            />

            {/* Overlay with controls */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
              {/* Move buttons */}
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => moveImage(index, index - 1)}
                  className="p-1.5 bg-white/90 text-gray-700 rounded hover:bg-white transition-colors"
                  title="Sola taşı"
                >
                  <GripVertical className="w-3 h-3 rotate-90" />
                </button>
              )}

              {/* Delete button */}
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                title="Sil"
              >
                <X className="w-3 h-3" />
              </button>

              {index < images.length - 1 && (
                <button
                  type="button"
                  onClick={() => moveImage(index, index + 1)}
                  className="p-1.5 bg-white/90 text-gray-700 rounded hover:bg-white transition-colors"
                  title="Sağa taşı"
                >
                  <GripVertical className="w-3 h-3 -rotate-90" />
                </button>
              )}
            </div>

            {/* Index badge */}
            <span className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
              {index + 1}
            </span>
          </div>
        ))}

        {/* Add more images button */}
        {images.length < maxImages && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`aspect-video border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-colors ${
              dragOver
                ? 'border-red-400 bg-red-50 text-red-500'
                : 'border-gray-300 text-gray-400 hover:border-red-400 hover:text-red-500'
            } ${uploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {uploading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <ImagePlus className="w-6 h-6" />
                <span className="text-xs mt-1">Ekle</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Drop Zone (when no images) */}
      {images.length === 0 && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
            dragOver
              ? 'border-red-400 bg-red-50'
              : 'border-gray-300 hover:border-red-400'
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center">
              <Loader2 className="w-10 h-10 text-red-500 animate-spin mb-3" />
              <p className="text-gray-600">Yükleniyor...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="w-10 h-10 text-gray-400 mb-3" />
              <p className="text-gray-600 font-medium">
                Görselleri sürükleyip bırakın veya seçmek için tıklayın
              </p>
              <p className="text-sm text-gray-400 mt-1">
                PNG, JPG, WebP (Maks. {maxSizeMB}MB)
              </p>
            </div>
          )}
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
      />

      {/* Helper text */}
      <p className="text-xs text-gray-500 mt-2">
        {images.length}/{maxImages} görsel • Sıralamayı değiştirmek için resimlerin üzerine gelin
      </p>
    </div>
  )
}

// Single image uploader (for categories, news, etc.)
interface SingleImageUploaderProps {
  image: string | null
  onChange: (image: string | null) => void
  bucket: StorageBucket
  folder?: string
  maxSizeMB?: number
  className?: string
}

export function SingleImageUploader({
  image,
  onChange,
  bucket,
  folder,
  maxSizeMB = 5,
  className = '',
}: SingleImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    const file = files[0]
    const validation = validateImageFile(file, { maxSizeMB })
    if (!validation.valid) {
      setError(validation.error || 'Geçersiz dosya')
      return
    }

    setUploading(true)
    setError(null)

    try {
      const url = await uploadImage(file, bucket, folder)
      onChange(url)
    } catch (err) {
      console.error('Upload error:', err)
      setError(err instanceof Error ? err.message : 'Yükleme sırasında hata oluştu')
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <div className={className}>
      {error && (
        <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <p>{error}</p>
          <button type="button" onClick={() => setError(null)} className="ml-auto">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {image ? (
        <div className="relative aspect-video max-w-sm bg-gray-100 rounded-lg overflow-hidden group">
          <img src={image} alt="Yüklenen görsel" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 bg-white/90 text-gray-700 rounded text-sm hover:bg-white transition-colors"
            >
              Değiştir
            </button>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="px-3 py-1.5 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
            >
              Sil
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full max-w-sm aspect-video border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-red-400 hover:text-red-500 transition-colors"
        >
          {uploading ? (
            <Loader2 className="w-8 h-8 animate-spin" />
          ) : (
            <>
              <Upload className="w-8 h-8 mb-2" />
              <span className="text-sm">Görsel Yükle</span>
            </>
          )}
        </button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
      />
    </div>
  )
}
