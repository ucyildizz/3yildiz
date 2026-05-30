-- Üç Yıldız Metal - Supabase Database Schema
-- Bu dosyayı Supabase SQL Editor'de çalıştırın

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- CATEGORIES (Kategoriler)
-- ============================================
CREATE TABLE categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_parent ON categories(parent_id);

-- ============================================
-- PRODUCTS (Ürünler)
-- ============================================
CREATE TABLE products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  short_description TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  material VARCHAR(50), -- suntalem, plastik, metal, ahsap
  features TEXT[], -- Array of feature keys
  dimensions JSONB, -- {width, height, depth, diameter, unit}
  variants JSONB, -- Array of {id, name, sku, price, stock}
  images TEXT[], -- Array of image URLs
  is_featured BOOLEAN DEFAULT false,
  is_popular BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_material ON products(material);
CREATE INDEX idx_products_featured ON products(is_featured) WHERE is_featured = true;
CREATE INDEX idx_products_popular ON products(is_popular) WHERE is_popular = true;

-- ============================================
-- NEWS (Haberler)
-- ============================================
CREATE TABLE news (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_news_slug ON news(slug);
CREATE INDEX idx_news_published ON news(is_published, published_at DESC);

-- ============================================
-- PAGES (Sayfalar)
-- ============================================
CREATE TABLE pages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content TEXT NOT NULL,
  meta_title VARCHAR(255),
  meta_description TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_pages_slug ON pages(slug);

-- ============================================
-- SLIDERS
-- ============================================
CREATE TABLE sliders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255),
  description TEXT,
  image_url TEXT, -- Geriye uyumluluk için korundu
  images TEXT[], -- Birden fazla görsel desteği
  button_text VARCHAR(100),
  button_link VARCHAR(255),
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_sliders_order ON sliders("order") WHERE is_active = true;

-- ============================================
-- QUOTE REQUESTS (Teklif Talepleri)
-- ============================================
CREATE TABLE quote_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_name VARCHAR(255),
  contact_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  city VARCHAR(100),
  message TEXT,
  items JSONB NOT NULL, -- Array of {product_id, product_name, variant, quantity}
  status VARCHAR(20) DEFAULT 'pending', -- pending, contacted, quoted, completed, cancelled
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_quote_requests_status ON quote_requests(status);
CREATE INDEX idx_quote_requests_created ON quote_requests(created_at DESC);

-- ============================================
-- CONTACT MESSAGES (İletişim Mesajları)
-- ============================================
CREATE TABLE contact_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_contact_messages_read ON contact_messages(is_read, created_at DESC);

-- ============================================
-- SITE SETTINGS (Site Ayarları)
-- ============================================
CREATE TABLE site_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  slogan VARCHAR(255),
  phone VARCHAR(50),
  phone2 VARCHAR(50),
  email VARCHAR(255),
  address TEXT,
  city VARCHAR(100),
  map_embed TEXT,
  facebook_url TEXT,
  instagram_url TEXT,
  twitter_url TEXT,
  linkedin_url TEXT,
  about_short TEXT,
  footer_text TEXT,
  logo_url TEXT,
  favicon_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ADMIN USERS
-- ============================================
CREATE TABLE admin_users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role VARCHAR(20) DEFAULT 'editor', -- admin, editor
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- ============================================
-- TRIGGERS for updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sliders_updated_at BEFORE UPDATE ON sliders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quote_requests_updated_at BEFORE UPDATE ON quote_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE sliders ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public can read active categories" ON categories
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can read active products" ON products
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can read published news" ON news
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public can read published pages" ON pages
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public can read active sliders" ON sliders
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can read site settings" ON site_settings
  FOR SELECT TO anon USING (true);

-- Public can create quote requests and contact messages
CREATE POLICY "Public can create quote requests" ON quote_requests
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Public can create contact messages" ON contact_messages
  FOR INSERT TO anon WITH CHECK (true);

-- ============================================
-- SEED DATA - Varsayılan Veriler
-- ============================================

-- Site Ayarları
INSERT INTO site_settings (company_name, slogan, phone, phone2, email, address, city, about_short)
VALUES (
  'Üç Yıldız Metal',
  'Sivas''tan Dünyaya Kaliteli Üretim',
  '0346 218 14 35',
  '0530 415 34 58',
  'info@ucyildizmetal.com',
  'Organize Sanayi Bölgesi 2.Kısım 6.Cadde No:15',
  'Sivas',
  '1997 yılından bu yana metal, plastik ve ahşap ev gereçleri üretiyoruz.'
);

-- Admin User (password: 5858)
-- NOT: Production'da şifre hash'lenmelidir!
INSERT INTO admin_users (username, email, password_hash, role)
VALUES ('metal', 'admin@ucyildizmetal.com', '5858', 'admin');

-- Örnek Kategoriler
INSERT INTO categories (name, slug, description, "order") VALUES
('Suntalem Sofralar', 'yer-sofralari', 'Geleneksel kullanım için üretilen melamin kaplı yer sofraları', 1),
('Suntalem Masalar', 'masalar', 'Yemek ve çalışma masaları', 2),
('Plastik Ürünler', 'plastik', 'Dayanıklı plastik ev gereçleri ve endüstriyel parçalar', 3),
('Metal Ürünler', 'metal', 'Paslanmaz krom metal ürünler', 4),
('Ahşap Ürünler', 'ahsap', 'Doğal ahşap ev gereçleri', 5),
('Hırdavat', 'hirdavat', 'Dübel ve bağlantı elemanları', 6);

-- ============================================
-- STORAGE BUCKETS
-- ============================================
-- NOT: Aşağıdaki komutları Supabase Dashboard > Storage bölümünden çalıştırın
-- veya SQL Editor'de execute edin

-- Storage buckets oluştur (Supabase Dashboard'dan yapılmalı)
-- 1. sliders - Slider görselleri
-- 2. products - Ürün görselleri
-- 3. categories - Kategori görselleri
-- 4. news - Haber görselleri
-- 5. images - Genel görseller

-- Storage policy'leri (public read, authenticated write)
-- Supabase Dashboard > Storage > Policies bölümünden ekleyin:

-- Örnek Policy (tüm bucket'lar için):
-- Policy Name: "Public Access"
-- Allowed operation: SELECT
-- Policy definition: true (herkese okuma izni)

-- Policy Name: "Authenticated Upload"
-- Allowed operation: INSERT
-- Policy definition: auth.role() = 'authenticated' veya true (geliştirme için)
