# Üç Yıldız Metal - Web Sitesi

Modern, responsive ve SEO-dostu kurumsal web sitesi. Next.js 16, Tailwind CSS ve Supabase kullanılarak geliştirilmiştir.

## Teknolojiler

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS 4
- **Veritabanı:** PostgreSQL (Supabase)
- **State Management:** Zustand
- **Form Validation:** React Hook Form + Zod
- **Icons:** Lucide React
- **Hosting:** Vercel + Supabase

## Özellikler

### Ana Site
- Modern ve responsive tasarım
- Hero slider
- Ürün kataloğu (filtreleme, arama)
- Ürün detay sayfaları
- Teklif sepeti sistemi (B2B odaklı)
- Kurumsal sayfalar (Hakkımızda, Tarihçe, Değerlerimiz)
- Haberler/Duyurular
- İletişim formu
- SEO optimizasyonu

### Admin Paneli (/yonet)
- Güvenli giriş sistemi
- Dashboard (özet istatistikler)
- Ürün yönetimi (CRUD)
- Kategori yönetimi
- Haber yönetimi
- Sayfa içerik yönetimi
- Slider yönetimi
- Teklif talepleri görüntüleme

## Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn
- Supabase hesabı (opsiyonel - mock data ile çalışır)

### Adımlar

1. **Projeyi klonlayın:**
```bash
git clone <repo-url>
cd ucyildiz-metal
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Environment variables ayarlayın:**
```bash
cp .env.example .env.local
```

`.env.local` dosyasını düzenleyin:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. **Geliştirme sunucusunu başlatın:**
```bash
npm run dev
```

Site: http://localhost:3000
Admin: http://localhost:3000/yonet

### Admin Giriş Bilgileri (Development)
- Kullanıcı Adı: `metal`
- Şifre: `5858`

## Supabase Kurulumu

1. [Supabase](https://supabase.com) hesabı oluşturun
2. Yeni proje oluşturun
3. `supabase/schema.sql` dosyasını SQL Editor'de çalıştırın
4. API anahtarlarını `.env.local` dosyasına ekleyin

## Deployment (Vercel)

### 1. Vercel'e Deploy

```bash
npm install -g vercel
vercel
```

### 2. Environment Variables

Vercel Dashboard'da şu değişkenleri ekleyin:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL` (production URL'iniz)

### 3. Domain Ayarı

Vercel Dashboard > Settings > Domains bölümünden custom domain ekleyebilirsiniz.

## Proje Yapısı

```
src/
├── app/                    # Next.js App Router
│   ├── (main)/            # Ana site layout
│   │   ├── page.tsx       # Anasayfa
│   │   ├── urunler/       # Ürünler
│   │   ├── kurumsal/      # Kurumsal sayfalar
│   │   ├── iletisim/      # İletişim
│   │   ├── teklif/        # Teklif sepeti
│   │   └── haberler/      # Haberler
│   └── yonet/             # Admin paneli
├── components/            # React bileşenleri
│   ├── ui/               # Temel UI (Button, Input, Card...)
│   ├── layout/           # Header, Footer
│   ├── home/             # Anasayfa bileşenleri
│   ├── products/         # Ürün bileşenleri
│   └── admin/            # Admin bileşenleri
├── lib/                   # Yardımcı fonksiyonlar
│   ├── supabase/         # Supabase client
│   ├── utils.ts          # Utility fonksiyonlar
│   ├── constants.ts      # Sabitler
│   └── mock-data.ts      # Mock veriler
├── store/                 # Zustand stores
│   ├── quote-store.ts    # Teklif sepeti
│   └── auth-store.ts     # Admin auth
└── types/                 # TypeScript tipleri
```

## Geliştirme Notları

### Mock Data
Supabase kurulmadan önce `src/lib/mock-data.ts` dosyasındaki veriler kullanılır. Production'da bu veriler Supabase'den çekilecektir.

### Görsel Yükleme
Şu an için görsel URL'leri manuel girilmektedir. Supabase Storage entegrasyonu ile dosya yükleme eklenebilir.

### Çoklu Dil
Site şu an Türkçe'dir. next-intl veya benzeri bir kütüphane ile çoklu dil desteği eklenebilir.

## Yapılacaklar (TODO)

- [ ] Supabase Storage entegrasyonu (görsel yükleme)
- [ ] E-posta bildirimleri (teklif talepleri için)
- [ ] Google Analytics entegrasyonu
- [ ] reCAPTCHA entegrasyonu
- [ ] Çoklu dil desteği
- [ ] Sitemap.xml otomatik oluşturma
- [ ] PWA desteği

## Lisans

Bu proje Üç Yıldız Metal için özel olarak geliştirilmiştir.
