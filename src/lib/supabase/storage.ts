import { createClient } from './client'

// Storage bucket adları
export const STORAGE_BUCKETS = {
  SLIDERS: 'sliders',
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  NEWS: 'news',
  GENERAL: 'images',
} as const

export type StorageBucket = (typeof STORAGE_BUCKETS)[keyof typeof STORAGE_BUCKETS]

// Dosya yükleme
export async function uploadImage(
  file: File,
  bucket: StorageBucket,
  folder?: string
): Promise<string> {
  const supabase = createClient()

  // Benzersiz dosya adı oluştur
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`
  const filePath = folder ? `${folder}/${fileName}` : fileName

  // Dosyayı yükle
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    console.error('Upload error:', error)
    throw new Error(`Dosya yüklenirken hata oluştu: ${error.message}`)
  }

  // Public URL al
  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path)

  return urlData.publicUrl
}

// Birden fazla dosya yükleme
export async function uploadImages(
  files: File[],
  bucket: StorageBucket,
  folder?: string
): Promise<string[]> {
  const uploadPromises = files.map((file) => uploadImage(file, bucket, folder))
  return Promise.all(uploadPromises)
}

// Dosya silme
export async function deleteImage(url: string, bucket: StorageBucket): Promise<void> {
  const supabase = createClient()

  // URL'den dosya yolunu çıkar
  const urlParts = url.split(`${bucket}/`)
  if (urlParts.length < 2) {
    throw new Error('Geçersiz URL')
  }
  const filePath = urlParts[1]

  const { error } = await supabase.storage.from(bucket).remove([filePath])

  if (error) {
    console.error('Delete error:', error)
    throw new Error(`Dosya silinirken hata oluştu: ${error.message}`)
  }
}

// Birden fazla dosya silme
export async function deleteImages(urls: string[], bucket: StorageBucket): Promise<void> {
  const deletePromises = urls.map((url) => deleteImage(url, bucket))
  await Promise.all(deletePromises)
}

// Dosya boyutu kontrolü (MB cinsinden)
export function validateFileSize(file: File, maxSizeMB: number = 5): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  return file.size <= maxSizeBytes
}

// Dosya tipi kontrolü
export function validateFileType(
  file: File,
  allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
): boolean {
  return allowedTypes.includes(file.type)
}

// Dosya validasyonu
export function validateImageFile(
  file: File,
  options?: { maxSizeMB?: number; allowedTypes?: string[] }
): { valid: boolean; error?: string } {
  const maxSizeMB = options?.maxSizeMB ?? 5
  const allowedTypes = options?.allowedTypes ?? ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

  if (!validateFileType(file, allowedTypes)) {
    return {
      valid: false,
      error: `Geçersiz dosya tipi. İzin verilen tipler: ${allowedTypes.join(', ')}`,
    }
  }

  if (!validateFileSize(file, maxSizeMB)) {
    return {
      valid: false,
      error: `Dosya boyutu çok büyük. Maksimum ${maxSizeMB}MB`,
    }
  }

  return { valid: true }
}

// Supabase Storage URL'ini kontrol et
export function isSupabaseStorageUrl(url: string): boolean {
  return url.includes('supabase.co/storage')
}

// Public URL oluştur (eğer zaten public URL değilse)
export function getPublicUrl(bucket: StorageBucket, path: string): string {
  const supabase = createClient()
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}
