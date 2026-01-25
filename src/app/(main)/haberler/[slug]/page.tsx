import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Eye, Share2, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui'
import { getNewsBySlug, getNews } from '@/lib/supabase/database'
import { formatDate } from '@/lib/utils'

export const revalidate = 60

interface NewsDetailPageProps {
  params: { slug: string }
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const news = await getNewsBySlug(params.slug).catch(() => null)

  if (!news) {
    notFound()
  }

  const otherNews = await getNews({ published: true, limit: 4 })
    .then(items => items.filter(n => n.id !== news.id).slice(0, 3))
    .catch(() => [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Image */}
      <div className="relative h-[300px] md:h-[400px]">
        <Image
          src={news.image_url || '/images/news/default.jpg'}
          alt={news.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="container mx-auto">
            <Link
              href="/haberler"
              className="flex items-center gap-2 text-white/80 hover:text-white mb-4"
            >
              <ChevronLeft className="w-5 h-5" />
              Geri Dön
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {news.title}
            </h1>
            <div className="flex items-center gap-4 mt-4 text-white/80">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {news.published_at
                  ? formatDate(news.published_at)
                  : formatDate(news.created_at)}
              </span>
              <span className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                {news.view_count} görüntülenme
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
              <div className="prose max-w-none">
                <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {news.content}
                </p>
              </div>

              {/* Share */}
              <div className="mt-8 pt-6 border-t flex items-center justify-between">
                <span className="text-gray-600">Bu haberi paylaşın</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Paylaş
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {otherNews.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Diğer Haberler
                </h3>
                <div className="space-y-4">
                  {otherNews.map((item) => (
                    <Link
                      key={item.id}
                      href={`/haberler/${item.slug}`}
                      className="block group"
                    >
                      <div className="flex gap-3">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                          <Image
                            src={item.image_url || '/images/news/default.jpg'}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {item.title}
                          </h4>
                          <span className="text-sm text-gray-500 mt-1">
                            {item.published_at
                              ? formatDate(item.published_at)
                              : formatDate(item.created_at)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/haberler" className="block mt-6">
                  <Button variant="outline" className="w-full">
                    Tüm Haberler
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
