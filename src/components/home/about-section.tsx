'use client'

import { Link } from 'next-view-transitions'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight, Building2 } from 'lucide-react'
import { Button } from '@/components/ui'
import { SITE_CONFIG } from '@/lib/constants'

const highlights = [
  '1997 yılından bu yana sektörde',
  `${SITE_CONFIG.totalArea} toplam tesis alanı`,
  `${SITE_CONFIG.productionArea} kapalı üretim alanı`,
  'Sivas OSB\'de modern üretim tesisi',
  'Kaliteli ve dayanıklı ürünler',
  'Toptan satış ve bayi desteği',
]

export function AboutSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-50/50 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative h-[450px] md:h-[550px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/about/factory-interior.jpg"
                alt="Üç Yıldız Metal Üretim Tesisi"
                fill
                className="object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent" />
            </div>

            {/* Decorative frame */}
            <div className="absolute -top-4 -left-4 w-32 h-32 border-t-4 border-l-4 border-orange-500/30 rounded-tl-3xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-b-4 border-r-4 border-orange-500/30 rounded-br-3xl" />

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-8 -right-8 md:bottom-8 md:-right-12 bg-gradient-to-br from-orange-500 to-orange-600 text-white p-8 rounded-3xl shadow-2xl shadow-orange-500/30"
            >
              <div className="text-5xl font-bold">
                {new Date().getFullYear() - SITE_CONFIG.foundedYear}+
              </div>
              <div className="text-orange-100 mt-2 font-medium">Yıllık Tecrübe</div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-6">
              <Building2 className="w-4 h-4" />
              Hakkımızda
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Sivas&apos;tan Türkiye&apos;ye{' '}
              <span className="text-gradient-orange">Kaliteli Üretim</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6 text-lg">
              <strong className="text-gray-900">Üç Yıldız Metal ve Plastik Ev Aletleri</strong>,{' '}
              {SITE_CONFIG.foundedYear} yılından bu yana Sivas Organize Sanayi Bölgesi&apos;nde
              faaliyet göstermektedir. Modern üretim tesisimizde metal, plastik ve ahşap
              hammaddelerden ev gereçleri üretiyoruz.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
              Eğitimli teknik kadromuz ve kalite odaklı yaklaşımımızla, müşterilerimize
              dayanıklı ve uzun ömürlü ürünler sunuyoruz.
            </p>

            {/* Highlights */}
            <ul className="grid sm:grid-cols-2 gap-4 mb-10">
              {highlights.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3 text-gray-700"
                >
                  <span className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-orange-600" />
                  </span>
                  <span className="font-medium">{item}</span>
                </motion.li>
              ))}
            </ul>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/kurumsal">
                <Button size="lg" className="group">
                  Daha Fazla Bilgi
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/iletisim">
                <Button variant="outline" size="lg">
                  İletişime Geçin
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
