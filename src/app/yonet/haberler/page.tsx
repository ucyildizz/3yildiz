'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Newspaper,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import { Button, Input, Badge } from '@/components/ui'
import { News } from '@/types/database'
import { getAllNews, deleteNews } from '@/lib/supabase/database'
import { formatDate } from '@/lib/utils'

export default function AdminNewsPage() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getAllNews()
      setNews(data)
    } catch (err) {
      setError('Haberler yüklenirken hata oluştu')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu haberi silmek istediğinize emin misiniz?')) return

    try {
      setError(null)
      await deleteNews(id)
      await fetchNews()
    } catch (err) {
      setError('Haber silinirken hata oluştu')
      console.error(err)
    }
  }

  const filteredNews = news.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Haberler</h1>
          <p className="text-gray-600">Haber ve duyuruları yönetin</p>
        </div>
        <Link href="/yonet/haberler/yeni">
          <Button>
            <Plus className="w-5 h-5 mr-2" />
            Yeni Haber
          </Button>
        </Link>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Haber ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* News List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="divide-y">
          {filteredNews.map((item) => (
            <div
              key={item.id}
              className="p-4 flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Newspaper className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(item.created_at)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {item.view_count} görüntülenme
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={item.is_published ? 'success' : 'warning'}>
                  {item.is_published ? 'Yayında' : 'Taslak'}
                </Badge>
                <Link
                  href={`/haberler/${item.slug}`}
                  target="_blank"
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Eye className="w-5 h-5" />
                </Link>
                <Link
                  href={`/yonet/haberler/${item.id}`}
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit className="w-5 h-5" />
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <Newspaper className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Haber bulunamadı</p>
          </div>
        )}
      </div>
    </div>
  )
}
