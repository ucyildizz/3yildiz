import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ViewTransitions } from 'next-view-transitions'
import './globals.css'
import { SITE_CONFIG } from '@/lib/constants'
import { PageLoader } from '@/components/common/page-loader'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} | Metal Plastik Ev Aletleri`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: `${SITE_CONFIG.fullName} - ${SITE_CONFIG.foundedYear} yılından bu yana Sivas'ta metal, plastik ve ahşap ev gereçleri üretimi yapıyoruz. Yer sofraları, masalar, tabureler ve daha fazlası.`,
  keywords: [
    'Üç Yıldız Metal',
    'Sivas metal ürünler',
    'plastik ev eşyaları',
    'yer sofrası',
    'suntalem masa',
    'toptan ev gereçleri',
    'plastik tabure',
    'metal ayakkabılık',
    'Sivas OSB',
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://ucyildizmetal.com',
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} | Metal Plastik Ev Aletleri`,
    description: `${SITE_CONFIG.foundedYear} yılından bu yana Sivas'ta kaliteli üretim.`,
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: `${SITE_CONFIG.foundedYear} yılından bu yana Sivas'ta kaliteli üretim.`,
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ViewTransitions>
      <html lang="tr">
        <body className={`${inter.variable} font-sans antialiased`}>
          <PageLoader />
          {children}
        </body>
      </html>
    </ViewTransitions>
  )
}
