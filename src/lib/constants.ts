// Site Sabitleri - Üç Yıldız Metal

export const SITE_CONFIG = {
  name: 'Üç Yıldız Metal',
  fullName: 'Üç Yıldız Metal ve Plastik Ev Aletleri',
  slogan: "Sivas'tan Dünyaya Kaliteli Üretim",
  phone: '0346 218 14 35',
  phone2: '0530 415 34 58',
  phone3: '0533 338 20 88',
  whatsapp: '+90 535 765 94 03',
  email: 'info@ucyildizmetal.com',
  address: 'Organize Sanayi Bölgesi 2.Kısım 6.Cadde No:15',
  city: 'Sivas',
  postalCode: '58140',
  country: 'Türkiye',
  foundedYear: 1997,
  totalArea: '15.000 m²',
  productionArea: '4.000 m²',
  mapUrl: 'https://www.google.com/maps?q=Sivas+Organize+Sanayi+Bölgesi',
} as const

export const MATERIALS = {
  suntalem: {
    label: 'Suntalem',
    description: 'Melamin Kaplı Yonga Levha - 18mm',
    icon: 'layers'
  },
  plastik: {
    label: 'Plastik',
    description: 'PP (Polipropilen) Plastik',
    icon: 'box'
  },
  metal: {
    label: 'Metal',
    description: 'Paslanmaz Krom Metal',
    icon: 'hammer'
  },
  ahsap: {
    label: 'Ahşap',
    description: 'Doğal Ahşap',
    icon: 'tree-pine'
  }
} as const

export const FEATURES = {
  katlanir: { label: 'Katlanır', icon: 'fold-vertical' },
  demonte: { label: 'Demonte', icon: 'puzzle' },
  paslanmaz: { label: 'Paslanmaz', icon: 'shield-check' },
  gecmeli: { label: 'Geçmeli (İstiflenebilir)', icon: 'layers' },
  islak_zemin: { label: 'Islak Zemin Uyumlu', icon: 'droplets' },
} as const

export const NAV_LINKS = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/urunler', label: 'Ürünler' },
  { href: '/kurumsal', label: 'Kurumsal', children: [
    { href: '/kurumsal', label: 'Hakkımızda' },
    { href: '/kurumsal/tarihce', label: 'Tarihçe' },
    { href: '/kurumsal/degerlerimiz', label: 'Değerlerimiz' },
    { href: '/kurumsal/kalite', label: 'Kalite Politikası' },
  ]},
  { href: '/haberler', label: 'Haberler' },
  { href: '/iletisim', label: 'İletişim' },
] as const

export const FOOTER_LINKS = {
  urunler: [
    { href: '/urunler/yer-sofralari', label: 'Yer Sofraları' },
    { href: '/urunler/masalar', label: 'Masalar' },
    { href: '/urunler/plastik', label: 'Plastik Ürünler' },
    { href: '/urunler/metal', label: 'Metal Ürünler' },
    { href: '/urunler/ahsap', label: 'Ahşap Ürünler' },
  ],
  kurumsal: [
    { href: '/kurumsal', label: 'Hakkımızda' },
    { href: '/kurumsal/tarihce', label: 'Tarihçe' },
    { href: '/kurumsal/degerlerimiz', label: 'Değerlerimiz' },
    { href: '/kurumsal/kalite', label: 'Kalite Politikası' },
  ]
} as const

export const QUOTE_STATUS = {
  pending: { label: 'Beklemede', color: 'yellow' },
  contacted: { label: 'İletişime Geçildi', color: 'blue' },
  quoted: { label: 'Teklif Verildi', color: 'purple' },
  completed: { label: 'Tamamlandı', color: 'green' },
  cancelled: { label: 'İptal Edildi', color: 'red' },
} as const
