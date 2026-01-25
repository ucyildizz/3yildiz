import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Factory,
  Users,
  Award,
  Target,
  CheckCircle2,
  ArrowRight,
  Building2,
  MapPin,
} from 'lucide-react'
import { Button } from '@/components/ui'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Hakkımızda',
  description: `${SITE_CONFIG.fullName} - ${SITE_CONFIG.foundedYear} yılından bu yana Sivas'ta metal, plastik ve ahşap ev gereçleri üretimi yapıyoruz.`,
}

const milestones = [
  {
    year: '1997',
    title: 'Kuruluş',
    description: 'Üç Yıldız Ahşap Metal Plastik Ltd. Şti. olarak kurumsallaşma',
  },
  {
    year: '2005',
    title: 'Yeni Tesis',
    description: 'Sivas Organize Sanayi Bölgesine taşınma',
  },
  {
    year: '2010',
    title: 'Kapasite Artışı',
    description: 'Üretim kapasitesinin 2 katına çıkarılması',
  },
  {
    year: '2020',
    title: 'Modernizasyon',
    description: 'Üretim hatlarının modernizasyonu',
  },
]

const values = [
  {
    icon: Target,
    title: 'Kalite Odaklılık',
    description: 'Uluslararası standartlarda üretim ve sürekli kalite kontrolü',
  },
  {
    icon: Users,
    title: 'Müşteri Memnuniyeti',
    description: 'Müşteri taleplerini zamanında ve eksiksiz karşılama',
  },
  {
    icon: Award,
    title: 'Güvenilirlik',
    description: 'Sevgi ve saygıya dayalı uzun vadeli iş ilişkileri',
  },
  {
    icon: Factory,
    title: 'Sürekli Gelişim',
    description: 'Çalışanların ve süreçlerin sürekli iyileştirilmesi',
  },
]

const stats = [
  { value: SITE_CONFIG.totalArea, label: 'Toplam Alan' },
  { value: SITE_CONFIG.productionArea, label: 'Kapalı Üretim' },
  { value: '50+', label: 'Ürün Çeşidi' },
  { value: `${new Date().getFullYear() - SITE_CONFIG.foundedYear}+`, label: 'Yıl Tecrübe' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <Image
          src="/images/about/hero.jpg"
          alt="Üç Yıldız Metal Fabrika"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/50" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-full mb-4">
              Hakkımızda
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Sivas&apos;tan Türkiye&apos;ye Kaliteli Üretim
            </h1>
            <p className="text-xl text-gray-200">
              {SITE_CONFIG.foundedYear} yılından bu yana güvenle üretiyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-blue-600 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Firmamız Hakkında
              </h2>
              <div className="prose max-w-none text-gray-600">
                <p>
                  <strong className="text-gray-900">
                    Üç Yıldız Metal ve Plastik Ev Aletleri Pazarlama Sanayi Ticaret Limited Şirketi
                  </strong>,
                  {SITE_CONFIG.foundedYear} yılında kurulmuş olup, Sivas Organize Sanayi Bölgesi&apos;nde
                  {SITE_CONFIG.totalArea} toplam alan üzerine kurulu tesisimizde faaliyetlerini
                  sürdürmektedir.
                </p>
                <p>
                  {SITE_CONFIG.productionArea} kapalı üretim alanımızda, eğitimli teknik kadromuzla
                  metal, plastik ve ahşap hammaddelerden ev gereçleri üretiyoruz. Suntalem sofralar,
                  masalar, plastik tabureler, metal ayakkabılıklar ve daha birçok ürünümüzle
                  Türkiye genelinde hizmet veriyoruz.
                </p>
                <p>
                  Kalite odaklı yaklaşımımız ve müşteri memnuniyetine verdiğimiz önemle,
                  sektörde güvenilir bir marka olmayı başardık. Uluslararası standartlarda
                  üretim yaparak, rekabetçi fiyatlarla kaliteden ödün vermiyoruz.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  <span>Sivas OSB 10. Cadde No:7</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span>58140 Sivas / Türkiye</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/about/factory-interior.jpg"
                  alt="Üretim Tesisi"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-lg">
                <div className="text-4xl font-bold text-blue-600">
                  {new Date().getFullYear() - SITE_CONFIG.foundedYear}+
                </div>
                <div className="text-gray-600">Yıllık Tecrübe</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-medium">Tarihçemiz</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">
              Büyüme Hikayemiz
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-200" />

              {/* Timeline Items */}
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className="w-1/2 pr-8 text-right">
                    {index % 2 === 0 && (
                      <div>
                        <span className="text-3xl font-bold text-blue-600">
                          {milestone.year}
                        </span>
                        <h3 className="text-xl font-semibold text-gray-900 mt-2">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600 mt-1">{milestone.description}</p>
                      </div>
                    )}
                  </div>

                  {/* Center Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow" />

                  <div className="w-1/2 pl-8">
                    {index % 2 !== 0 && (
                      <div>
                        <span className="text-3xl font-bold text-blue-600">
                          {milestone.year}
                        </span>
                        <h3 className="text-xl font-semibold text-gray-900 mt-2">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600 mt-1">{milestone.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-medium">Değerlerimiz</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">
              İş Yapış Felsefemiz
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quality Policy */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-blue-400 font-medium">Kalite Politikamız</span>
              <h2 className="text-3xl font-bold mt-2 mb-6">
                Uluslararası Standartlarda Üretim
              </h2>
              <div className="space-y-4">
                {[
                  'Müşteri memnuniyetini en üst düzeyde tutmak',
                  'Kalite, fiyat ve zaman üçgeninde dengeyi korumak',
                  'Sürekli iyileştirme ve gelişim',
                  'Çalışan memnuniyeti ve katılımcı yönetim',
                  'Çevreye duyarlı üretim süreçleri',
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Vizyonumuz</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Uluslararası alanda rekabet eden, kalitesiyle tanınan bir dünya şirketi olmak.
                Türkiye&apos;nin ve bölgenin lider ev gereçleri üreticisi konumunu sürdürmek.
              </p>
              <h3 className="text-2xl font-bold mb-4">Misyonumuz</h3>
              <p className="text-gray-300 leading-relaxed">
                Müşterilerimize kaliteli, dayanıklı ve ekonomik ürünler sunarak
                yaşam kalitelerini artırmak. Çalışanlarımıza huzurlu bir iş ortamı
                sağlayarak birlikte büyümek.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Bizimle Çalışmak İster misiniz?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Toptan alımlar için özel fiyatlandırma sunuyoruz. Bayilik ve iş birliği
            fırsatları için bizimle iletişime geçin.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/iletisim">
              <Button size="lg">
                İletişime Geçin
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/urunler">
              <Button variant="outline" size="lg">
                Ürünleri İnceleyin
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
