# Üç Yıldız Metal - Proje Dokümantasyonu

> **Proje:** ucyildizmetal.com Kurumsal Web Sitesi
> **Versiyon:** 1.0.0
> **Son Güncelleme:** Ocak 2025

---

## İçindekiler

1. [Proje Özeti](#proje-özeti)
2. [Teknoloji Stack](#teknoloji-stack)
3. [Proje Yapısı](#proje-yapısı)
4. [Kurulum](#kurulum)
5. [Geliştirme](#geliştirme)
6. [Veritabanı](#veritabanı)
7. [Supabase Storage](#supabase-storage)
8. [Admin Paneli](#admin-paneli)
9. [Özellikler](#özellikler)
10. [Canlıya Taşıma (Deployment)](#canlıya-taşıma-deployment)
11. [Domain Yapılandırması](#domain-yapılandırması)
12. [Environment Variables](#environment-variables)
13. [Sorun Giderme](#sorun-giderme)
14. [Gelecek Geliştirmeler](#gelecek-geliştirmeler)

---

## Proje Özeti

Üç Yıldız Metal için geliştirilen kurumsal web sitesi. Firma 1997'den beri Sivas'ta metal, plastik ve ahşap ev gereçleri üretimi yapmaktadır.

### Temel Özellikler
- Responsive tasarım (mobil, tablet, masaüstü)
- Admin paneli ile içerik yönetimi
- Ürün kataloğu ve filtreleme
- Teklif talebi sistemi
- İletişim formu
- Haber/Blog modülü
- SEO optimizasyonu
- Sayfa geçiş animasyonları
- WhatsApp entegrasyonu

---

## Teknoloji Stack

### Frontend
| Teknoloji | Versiyon | Açıklama |
|-----------|----------|----------|
| Next.js | 16.1.3 | React framework (App Router) |
| React | 19.2.3 | UI kütüphanesi |
| TypeScript | 5.x | Tip güvenliği |
| Tailwind CSS | 4.x | Utility-first CSS |
| Framer Motion | 12.x | Animasyonlar |
| next-view-transitions | 0.3.5 | Sayfa geçiş animasyonları |

### Backend & Database
| Teknoloji | Açıklama |
|-----------|----------|
| Supabase | PostgreSQL veritabanı + Auth + Storage |
| @supabase/ssr | Server-side rendering desteği |
| @supabase/supabase-js | JavaScript client |

### Form & State Yönetimi
| Teknoloji | Açıklama |
|-----------|----------|
| React Hook Form | Form yönetimi |
| Zod | Şema validasyonu |
| Zustand | State management |

### UI Kütüphaneleri
| Teknoloji | Açıklama |
|-----------|----------|
| Lucide React | İkon kütüphanesi |
| clsx | Conditional class names |
| tailwind-merge | Tailwind class merging |

---

## Proje Yapısı

```
ucyildiz-metal/
├── public/
│   └── images/
│       ├── logo.png           # Ana logo
│       ├── slider/            # Slider görselleri (local)
│       └── ...
├── src/
│   ├── app/
│   │   ├── (main)/            # Public sayfalar
│   │   │   ├── page.tsx       # Ana sayfa
│   │   │   ├── urunler/       # Ürünler
│   │   │   ├── haberler/      # Haberler
│   │   │   ├── kurumsal/      # Hakkımızda
│   │   │   ├── iletisim/      # İletişim
│   │   │   ├── teklif/        # Teklif formu
│   │   │   ├── layout.tsx     # Main layout
│   │   │   └── loading.tsx    # Loading state
│   │   ├── yonet/             # Admin paneli
│   │   │   ├── page.tsx       # Dashboard
│   │   │   ├── giris/         # Login
│   │   │   ├── slider/        # Slider yönetimi
│   │   │   ├── kategoriler/   # Kategori yönetimi
│   │   │   ├── urunler/       # Ürün yönetimi
│   │   │   ├── haberler/      # Haber yönetimi
│   │   │   ├── teklifler/     # Teklif yönetimi
│   │   │   └── sayfalar/      # Sayfa yönetimi
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global stiller
│   ├── components/
│   │   ├── common/            # Ortak bileşenler
│   │   │   ├── page-loader.tsx
│   │   │   ├── page-transition-wrapper.tsx
│   │   │   └── whatsapp-button.tsx
│   │   ├── home/              # Ana sayfa bileşenleri
│   │   │   ├── hero-slider.tsx
│   │   │   ├── featured-products.tsx
│   │   │   ├── categories-section.tsx
│   │   │   ├── about-section.tsx
│   │   │   └── cta-section.tsx
│   │   ├── layout/            # Layout bileşenleri
│   │   │   ├── header.tsx
│   │   │   └── footer.tsx
│   │   ├── products/          # Ürün bileşenleri
│   │   │   ├── product-card.tsx
│   │   │   └── product-filters.tsx
│   │   ├── admin/             # Admin bileşenleri
│   │   │   └── image-uploader.tsx
│   │   └── ui/                # UI bileşenleri
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       ├── card.tsx
│   │       └── ...
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts      # Browser client
│   │   │   ├── server.ts      # Server client
│   │   │   ├── database.ts    # Database fonksiyonları
│   │   │   └── storage.ts     # Storage fonksiyonları
│   │   ├── constants.ts       # Sabitler
│   │   └── utils.ts           # Yardımcı fonksiyonlar
│   └── types/
│       └── database.ts        # TypeScript tipleri
├── supabase/
│   ├── schema.sql             # Veritabanı şeması
│   └── migrations/            # Migration dosyaları
├── .env.local                 # Environment variables
├── .env.example               # Örnek env dosyası
├── next.config.ts             # Next.js yapılandırması
├── tailwind.config.ts         # Tailwind yapılandırması
├── tsconfig.json              # TypeScript yapılandırması
└── package.json               # Bağımlılıklar
```

---

## Kurulum

### Gereksinimler
- Node.js 18.x veya üzeri
- npm veya yarn
- Supabase hesabı

### Adımlar

1. **Repo'yu klonlayın:**
```bash
git clone <repo-url>
cd ucyildiz-metal
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Environment dosyasını oluşturun:**
```bash
cp .env.example .env.local
```

4. **Supabase bilgilerini ekleyin (.env.local):**
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

5. **Geliştirme sunucusunu başlatın:**
```bash
npm run dev
```

---

## Geliştirme

### Komutlar

```bash
# Geliştirme modu
npm run dev

# Production build
npm run build

# Production sunucusu
npm run start

# Lint kontrolü
npm run lint
```

### Kod Stili
- ESLint yapılandırması aktif
- TypeScript strict mode
- Tailwind CSS sınıf sıralaması

---

## Veritabanı

### Supabase Kurulumu

1. [Supabase](https://supabase.com) hesabı oluşturun
2. Yeni proje oluşturun
3. SQL Editor'de `supabase/schema.sql` dosyasını çalıştırın

### Tablolar

| Tablo | Açıklama |
|-------|----------|
| `categories` | Ürün kategorileri |
| `products` | Ürünler |
| `sliders` | Ana sayfa slider'ları |
| `news` | Haberler/Blog yazıları |
| `pages` | Statik sayfalar |
| `quote_requests` | Teklif talepleri |
| `contact_messages` | İletişim mesajları |
| `site_settings` | Site ayarları |
| `admin_users` | Admin kullanıcıları |

### Migration Çalıştırma

Mevcut veritabanına images sütunu eklemek için:
```sql
-- supabase/migrations/001_add_images_to_sliders.sql dosyasını çalıştırın
```

### RLS (Row Level Security)

Tüm tablolarda RLS aktif. Public okuma, authenticated yazma politikaları uygulanmış.

---

## Supabase Storage

### Bucket Oluşturma

Supabase Dashboard > Storage bölümünden aşağıdaki bucket'ları oluşturun:

| Bucket | Açıklama | Public |
|--------|----------|--------|
| `sliders` | Slider görselleri | Evet |
| `products` | Ürün görselleri | Evet |
| `categories` | Kategori görselleri | Evet |
| `news` | Haber görselleri | Evet |
| `images` | Genel görseller | Evet |

### Storage Policies

Her bucket için:

1. **Public Read Policy:**
   - Name: "Public Access"
   - Operation: SELECT
   - Definition: `true`

2. **Upload Policy:**
   - Name: "Allow Uploads"
   - Operation: INSERT
   - Definition: `true` (veya `auth.role() = 'authenticated'`)

3. **Delete Policy:**
   - Name: "Allow Deletes"
   - Operation: DELETE
   - Definition: `true`

### Görsel Yükleme Kullanımı

```typescript
import { uploadImage, STORAGE_BUCKETS } from '@/lib/supabase/storage'

// Tek görsel yükleme
const url = await uploadImage(file, STORAGE_BUCKETS.PRODUCTS, 'folder-name')

// Çoklu görsel yükleme
const urls = await uploadImages(files, STORAGE_BUCKETS.SLIDERS)
```

---

## Admin Paneli

### Erişim
- URL: `/yonet`
- Varsayılan kullanıcı: `metal`
- Varsayılan şifre: `5858`

> **ÖNEMLİ:** Production'da şifreyi değiştirin!

### Modüller

1. **Dashboard** (`/yonet`) - Genel bakış
2. **Slider** (`/yonet/slider`) - Ana sayfa slider yönetimi
3. **Kategoriler** (`/yonet/kategoriler`) - Kategori CRUD
4. **Ürünler** (`/yonet/urunler`) - Ürün CRUD
5. **Haberler** (`/yonet/haberler`) - Blog/Haber yönetimi
6. **Teklifler** (`/yonet/teklifler`) - Teklif talepleri
7. **Sayfalar** (`/yonet/sayfalar`) - Statik sayfa düzenleme

---

## Özellikler

### Animasyonlar

#### Sayfa Açılış Animasyonu
- Dosya: `src/components/common/page-loader.tsx`
- Logo + progress bar animasyonu
- İlk yüklemede gösterilir

#### Sayfa Geçiş Animasyonları
- Paket: `next-view-transitions`
- Dosya: `src/app/globals.css` (view transitions CSS)
- Fade-in/out efekti tüm sayfa geçişlerinde

#### Scroll Animasyonları
- Framer Motion ile `whileInView` animasyonları
- Reveal, fade, scale efektleri

### WhatsApp Entegrasyonu
- Dosya: `src/components/common/whatsapp-button.tsx`
- Sabit sağ alt köşe butonu
- Pulse animasyonu

### Responsive Tasarım
- Mobile-first yaklaşım
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)

---

## Canlıya Taşıma (Deployment)

### Vercel ile Deploy (Önerilen)

1. **Vercel hesabı oluşturun:** [vercel.com](https://vercel.com)

2. **Yeni proje oluşturun:**
   - "Import Git Repository" seçin
   - Repo'yu bağlayın

3. **Environment Variables ekleyin:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
   NEXT_PUBLIC_SITE_URL=https://ucyildizmetal.com
   ```

4. **Deploy edin**

### Manuel Deploy

```bash
# Build
npm run build

# Start
npm run start
```

### Docker ile Deploy

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## Domain Yapılandırması

### Vercel'de Domain Ekleme

1. Vercel Dashboard > Proje > Settings > Domains
2. "Add" butonuna tıklayın
3. `ucyildizmetal.com` ekleyin
4. DNS kayıtlarını yapılandırın

### DNS Ayarları

Domain sağlayıcınızda (GoDaddy, Namecheap, vb.):

| Tip | Ad | Değer |
|-----|-----|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

### SSL Sertifikası
Vercel otomatik olarak Let's Encrypt SSL sertifikası sağlar.

---

## Environment Variables

### Geliştirme (.env.local)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://wrchbsoutnuhxagrwsmb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Production

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
NEXT_PUBLIC_SITE_URL=https://ucyildizmetal.com
```

---

## Sorun Giderme

### Görsel Yüklenmiyor

1. Supabase Storage bucket'ının oluşturulduğunu kontrol edin
2. Bucket'ın public olduğundan emin olun
3. Storage policies'in doğru yapılandırıldığını kontrol edin
4. `next.config.ts`'de remote patterns'in doğru olduğunu kontrol edin:
   ```typescript
   images: {
     remotePatterns: [
       {
         protocol: 'https',
         hostname: '*.supabase.co',
       },
     ],
   }
   ```

### Build Hataları

```bash
# Cache temizleme
rm -rf .next
npm run build
```

### Veritabanı Bağlantı Hatası

1. Supabase URL ve anon key'in doğru olduğunu kontrol edin
2. RLS politikalarını kontrol edin
3. Supabase Dashboard > Settings > API'den bilgileri doğrulayın

### Animasyonlar Çalışmıyor

1. `next-view-transitions` paketinin yüklü olduğunu kontrol edin
2. `ViewTransitions` wrapper'ın root layout'ta olduğunu kontrol edin
3. Link'lerin `next-view-transitions`'dan import edildiğini kontrol edin

---

## Gelecek Geliştirmeler

### Planlanan Özellikler
- [ ] Çoklu dil desteği (TR/EN)
- [ ] Ürün arama fonksiyonu
- [ ] Blog kategorileri
- [ ] E-posta bildirimleri
- [ ] Gelişmiş SEO (sitemap, robots.txt)
- [ ] Performance optimizasyonları
- [ ] PWA desteği

### Teknik İyileştirmeler
- [ ] Unit testler
- [ ] E2E testler (Playwright)
- [ ] Error boundary'ler
- [ ] Logging sistemi
- [ ] Rate limiting

---

## İletişim & Destek

- **Geliştirici:** [İsim]
- **E-posta:** [E-posta]
- **Proje Sahibi:** Üç Yıldız Metal
- **Telefon:** 0346 218 10 60

---

## Lisans

Bu proje özel mülkiyettir. Tüm hakları saklıdır.

---

*Son güncelleme: Ocak 2025*
