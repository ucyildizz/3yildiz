import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Eye, ArrowRight } from 'lucide-react'
import { getNews } from '@/lib/supabase/database'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Haberler',
  description: 'Üç Yıldız Metal haberler ve duyurular',
}

export const revalidate = 60

export default async function NewsPage() {
  const news = await getNews({ published: true }).catch(() => [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Haberler</h1>
          <p className="text-gray-600 mt-2">
            Firmamız ve sektör hakkında güncel haberler
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {news.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <Link href={`/haberler/${item.slug}`}>
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={item.image_url || '/images/news/default.jpg'}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {item.published_at
                        ? formatDate(item.published_at)
                        : formatDate(item.created_at)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {item.view_count}
                    </span>
                  </div>
                  <Link href={`/haberler/${item.slug}`}>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h2>
                  </Link>
                  {item.excerpt && (
                    <p className="text-gray-600 line-clamp-2 mb-4">
                      {item.excerpt}
                    </p>
                  )}
                  <Link
                    href={`/haberler/${item.slug}`}
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
                  >
                    Devamını Oku
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Henüz haber yok
            </h3>
            <p className="text-gray-500">
              Yeni haberler ve duyurular için takipte kalın.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
