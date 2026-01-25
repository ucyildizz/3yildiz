import { createClient } from './client'
import { Category, Product, News, Slider, QuoteRequest, ContactMessage } from '@/types/database'

// ============================================
// CATEGORIES
// ============================================
export async function getCategories(activeOnly = true) {
  const supabase = createClient()
  let query = supabase
    .from('categories')
    .select('*')
    .order('order', { ascending: true })

  if (activeOnly) {
    query = query.eq('is_active', true)
  }

  const { data, error } = await query
  if (error) throw error
  return data as Category[]
}

export async function getAllCategories() {
  return getCategories(false)
}

export async function getCategoryBySlug(slug: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data as Category
}

export async function createCategory(category: Partial<Category>) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('categories')
    .insert(category)
    .select()
    .single()

  if (error) throw error
  return data as Category
}

export async function updateCategory(id: string, category: Partial<Category>) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('categories')
    .update(category)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Category
}

export async function deleteCategory(id: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// ============================================
// PRODUCTS
// ============================================
export async function getProducts(options?: {
  categoryId?: string
  material?: string
  featured?: boolean
  popular?: boolean
  limit?: number
}) {
  const supabase = createClient()
  let query = supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('is_active', true)
    .order('order', { ascending: true })

  if (options?.categoryId) {
    query = query.eq('category_id', options.categoryId)
  }
  if (options?.material) {
    query = query.eq('material', options.material)
  }
  if (options?.featured) {
    query = query.eq('is_featured', true)
  }
  if (options?.popular) {
    query = query.eq('is_popular', true)
  }
  if (options?.limit) {
    query = query.limit(options.limit)
  }

  const { data, error } = await query
  if (error) throw error
  return data as (Product & { category: Category })[]
}

export async function getProductBySlug(slug: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data as Product & { category: Category }
}

export async function getAllProducts() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as (Product & { category: Category })[]
}

export async function createProduct(product: Partial<Product>) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single()

  if (error) throw error
  return data as Product
}

export async function updateProduct(id: string, product: Partial<Product>) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .update(product)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Product
}

export async function deleteProduct(id: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// ============================================
// NEWS
// ============================================
export async function getNews(options?: { published?: boolean; limit?: number }) {
  const supabase = createClient()
  let query = supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false })

  if (options?.published) {
    query = query.eq('is_published', true)
  }
  if (options?.limit) {
    query = query.limit(options.limit)
  }

  const { data, error } = await query
  if (error) throw error
  return data as News[]
}

export async function getAllNews() {
  return getNews()
}

export async function getNewsBySlug(slug: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data as News
}

export async function createNews(news: Partial<News>) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('news')
    .insert(news)
    .select()
    .single()

  if (error) throw error
  return data as News
}

export async function updateNews(id: string, news: Partial<News>) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('news')
    .update(news)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as News
}

export async function deleteNews(id: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('news')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// ============================================
// SLIDERS
// ============================================
export async function getSliders(activeOnly = true) {
  const supabase = createClient()
  let query = supabase
    .from('sliders')
    .select('*')
    .order('order', { ascending: true })

  if (activeOnly) {
    query = query.eq('is_active', true)
  }

  const { data, error } = await query
  if (error) throw error
  return data as Slider[]
}

export async function createSlider(slider: Partial<Slider>) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('sliders')
    .insert(slider)
    .select()
    .single()

  if (error) throw error
  return data as Slider
}

export async function updateSlider(id: string, slider: Partial<Slider>) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('sliders')
    .update(slider)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Slider
}

export async function deleteSlider(id: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('sliders')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// ============================================
// QUOTE REQUESTS
// ============================================
export async function createQuoteRequest(quote: Partial<QuoteRequest>) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('quote_requests')
    .insert(quote)
    .select()
    .single()

  if (error) throw error
  return data as QuoteRequest
}

export async function getQuoteRequests() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('quote_requests')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as QuoteRequest[]
}

export async function updateQuoteStatus(id: string, status: string, notes?: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('quote_requests')
    .update({ status, notes })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as QuoteRequest
}

// ============================================
// CONTACT MESSAGES
// ============================================
export async function createContactMessage(message: Partial<ContactMessage>) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('contact_messages')
    .insert(message)
    .select()
    .single()

  if (error) throw error
  return data as ContactMessage
}

export async function getContactMessages() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as ContactMessage[]
}
