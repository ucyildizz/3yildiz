'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  ArrowLeft,
  Save,
  Trash2,
  ImagePlus,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import { Button, Input, Textarea, Card, CardContent } from '@/components/ui'
import { News } from '@/types/database'
import { createNews, updateNews, deleteNews } from '@/lib/supabase/database'
import { createClient } from '@/lib/supabase/client'
import { slugify } from '@/lib/utils'

const newsSchema = z.object({
  title: z.string().min(2, 'Başlık gerekli'),
  slug: z.string().min(2, 'Slug gerekli'),
  content: z.string().min(10, 'İçerik en az 10 karakter olmalı'),
  excerpt: z.string().optional(),
  image_url: z.string().optional(),
  is_published: z.boolean(),
})

type NewsFormData = z.infer<typeof newsSchema>

export default function AdminNewsEditPage() {
  const params = useParams()
  const router = useRouter()
  const isNew = params.id === 'yeni'

  const [news, setNews] = useState<News | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsFormData>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      image_url: '',
      is_published: false,
    },
  })

  useEffect(() => {
    fetchNews()
  }, [params.id])

  const fetchNews = async () => {
    if (isNew) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const supabase = createClient()
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('id', params.id)
        .single()

      if (error) throw error

      if (data) {
        setNews(data)
        reset({
          title: data.title,
          slug: data.slug,
          content: data.content,
          excerpt: data.excerpt || '',
          image_url: data.image_url || '',
          is_published: data.is_published,
        })
      }
    } catch (err) {
      setError('Haber yüklenirken hata oluştu')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setValue('title', title)
    if (isNew) {
      setValue('slug', slugify(title))
    }
  }

  const onSubmit = async (data: NewsFormData) => {
    try {
      setError(null)

      if (isNew) {
        await createNews(data)
      } else {
        await updateNews(params.id as string, data)
      }

      router.push('/yonet/haberler')
    } catch (err) {
      setError(isNew ? 'Haber eklenirken hata oluştu' : 'Haber güncellenirken hata oluştu')
      console.error(err)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Bu haberi silmek istediğinize emin misiniz?')) return

    try {
      setError(null)
      await deleteNews(params.id as string)
      router.push('/yonet/haberler')
    } catch (err) {
      setError('Haber silinirken hata oluştu')
      console.error(err)
    }
  }

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
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isNew ? 'Yeni Haber Ekle' : 'Haber Düzenle'}
          </h1>
          <p className="text-gray-600">
            {isNew ? 'Yeni bir haber ekleyin' : news?.title}
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card variant="bordered">
              <CardContent className="pt-6 space-y-4">
                <Input
                  label="Başlık *"
                  error={errors.title?.message}
                  {...register('title')}
                  onChange={handleTitleChange}
                />
                <Input
                  label="Slug (URL)"
                  error={errors.slug?.message}
                  {...register('slug')}
                />
                <Textarea
                  label="Özet"
                  rows={2}
                  {...register('excerpt')}
                />
                <Textarea
                  label="İçerik *"
                  rows={10}
                  error={errors.content?.message}
                  {...register('content')}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card variant="bordered">
              <CardContent className="pt-6">
                <h2 className="font-semibold text-gray-900 mb-4">Yayın</h2>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('is_published')}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Yayında</span>
                </label>
              </CardContent>
            </Card>

            <Card variant="bordered">
              <CardContent className="pt-6">
                <h2 className="font-semibold text-gray-900 mb-4">Görsel</h2>
                <Input
                  placeholder="/images/news/..."
                  {...register('image_url')}
                />
                <button
                  type="button"
                  className="mt-4 w-full aspect-video border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-colors"
                >
                  <ImagePlus className="w-8 h-8" />
                  <span className="text-sm mt-2">Görsel Yükle</span>
                </button>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-3">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <Save className="w-5 h-5 mr-2" />
                )}
                {isNew ? 'Haber Ekle' : 'Kaydet'}
              </Button>
              {!isNew && (
                <Button type="button" variant="danger" onClick={handleDelete}>
                  <Trash2 className="w-5 h-5 mr-2" />
                  Haberi Sil
                </Button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
