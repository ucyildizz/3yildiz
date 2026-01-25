import { Link } from 'next-view-transitions'
import Image from 'next/image'
import { Phone, Mail, MapPin, Clock, Factory, ArrowRight, Heart, Sparkles, Send } from 'lucide-react'
import { SITE_CONFIG, FOOTER_LINKS } from '@/lib/constants'
import { Button } from '@/components/ui'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden">
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-16 relative">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Ürünlerimiz Hakkında Bilgi Alın
              </h3>
              <p className="text-white/80 text-lg">
                Size özel teklif için hemen iletişime geçin
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/iletisim">
                <Button variant="secondary" size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                  <Send className="w-5 h-5 mr-2" />
                  İletişime Geçin
                </Button>
              </Link>
              <Link href="/urunler">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Ürünleri İnceleyin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Link href="/" className="block">
                  <Image
                    src="/images/logo.png"
                    alt="3 Yıldız Metal"
                    width={160}
                    height={56}
                    className="h-14 w-auto object-contain brightness-0 invert hover:opacity-80 transition-opacity"
                  />
                </Link>
              </div>
              <div className="flex items-center gap-2 text-sm text-orange-400 mb-4">
                <Sparkles className="w-4 h-4" />
                <span className="font-medium">1997&apos;den Beri Hizmetinizde</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {SITE_CONFIG.totalArea} toplam alan ve {SITE_CONFIG.productionArea} kapalı üretim tesisimizde,
                metal, plastik ve ahşap ev gereçleri üretiyoruz.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-400 bg-gray-800/50 rounded-lg px-4 py-2">
                <Factory className="w-4 h-4 text-orange-400" />
                <span>Sivas Organize Sanayi Bölgesi</span>
              </div>
            </div>

            {/* Quick Links - Products */}
            <div>
              <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-gradient-to-r from-orange-500 to-transparent rounded-full" />
                Ürünlerimiz
              </h3>
              <ul className="space-y-3">
                {FOOTER_LINKS.urunler.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-orange-400 transition-all duration-300 flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all text-orange-500" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links - Corporate */}
            <div>
              <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-gradient-to-r from-orange-500 to-transparent rounded-full" />
                Kurumsal
              </h3>
              <ul className="space-y-3">
                {FOOTER_LINKS.kurumsal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-orange-400 transition-all duration-300 flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all text-orange-500" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-gradient-to-r from-orange-500 to-transparent rounded-full" />
                İletişim
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href={`tel:${SITE_CONFIG.phone}`}
                    className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors group"
                  >
                    <span className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors flex-shrink-0">
                      <Phone className="w-5 h-5 text-orange-400" />
                    </span>
                    <div>
                      <div className="font-medium text-white">{SITE_CONFIG.phone}</div>
                      {SITE_CONFIG.phone2 && (
                        <div className="text-sm">{SITE_CONFIG.phone2}</div>
                      )}
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
                  >
                    <span className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors flex-shrink-0">
                      <Mail className="w-5 h-5 text-orange-400" />
                    </span>
                    {SITE_CONFIG.email}
                  </a>
                </li>
                <li className="flex items-start gap-3 text-gray-400">
                  <span className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-orange-400" />
                  </span>
                  <div>
                    <div>{SITE_CONFIG.address}</div>
                    <div>{SITE_CONFIG.city} / {SITE_CONFIG.country}</div>
                  </div>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <span className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-orange-400" />
                  </span>
                  <span>Pzt - Cmt: 08:00 - 18:00</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
              <div>
                &copy; {currentYear} {SITE_CONFIG.fullName}. Tüm hakları saklıdır.
              </div>
              <div>
                Doğukan Eren Özer tarafından tasarlanmıştır
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500 animate-pulse" fill="currentColor" />
                <span>Türkiye&apos;de</span>
                <span className="text-orange-400 font-semibold">Üretildi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
