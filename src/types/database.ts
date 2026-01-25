// Veritabanı Tipleri - Üç Yıldız Metal

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image_url?: string
  parent_id?: string
  order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export type MaterialType = 'suntalem' | 'plastik' | 'metal' | 'ahsap'

export interface Product {
  id: string
  name: string
  slug: string
  description?: string
  short_description?: string
  category_id: string
  material?: MaterialType | string
  features?: string[] // Katlanır, Demonte, Paslanmaz vb.
  dimensions?: {
    width?: number
    height?: number
    depth?: number
    diameter?: number
    unit: 'cm' | 'mm'
  }
  variants?: ProductVariant[]
  images: string[]
  is_featured: boolean
  is_popular: boolean
  is_active: boolean
  order: number
  created_at: string
  updated_at: string
  // İlişkili veriler
  category?: Category
}

export interface ProductVariant {
  id: string
  name: string // "70 cm", "1 Numara" vb.
  sku?: string
  price?: number
  stock?: number
}

export interface News {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  image_url?: string
  is_published: boolean
  published_at?: string
  view_count: number
  created_at: string
  updated_at: string
}

export interface Page {
  id: string
  title: string
  slug: string
  content: string
  meta_title?: string
  meta_description?: string
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface Slider {
  id: string
  title: string
  subtitle?: string
  description?: string
  image_url?: string // Eski alan (geriye uyumluluk)
  images?: string[] // Yeni: Birden fazla resim
  button_text?: string
  button_link?: string
  order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface QuoteRequest {
  id: string
  company_name?: string
  contact_name: string
  email: string
  phone: string
  city?: string
  message?: string
  items: QuoteItem[]
  status: 'pending' | 'contacted' | 'quoted' | 'completed' | 'cancelled'
  notes?: string
  created_at: string
  updated_at: string
}

export interface QuoteItem {
  product_id: string
  product_name: string
  variant?: string
  quantity: number
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  is_read: boolean
  created_at: string
}

export interface SiteSettings {
  id: string
  company_name: string
  slogan?: string
  phone: string
  phone2?: string
  email: string
  address: string
  city: string
  map_embed?: string
  facebook_url?: string
  instagram_url?: string
  twitter_url?: string
  linkedin_url?: string
  about_short?: string
  footer_text?: string
  logo_url?: string
  favicon_url?: string
}

// Admin Kullanıcı
export interface AdminUser {
  id: string
  username: string
  email: string
  role: 'admin' | 'editor'
  created_at: string
  last_login?: string
}

// API Response tipleri
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}
