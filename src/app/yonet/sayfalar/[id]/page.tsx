'use client'

import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, Save, Trash2 } from 'lucide-react'
import { Button, Input, Textarea, Card, CardContent } from '@/components/ui'
import { slugify } from '@/lib/utils'

const pageSchema = z.object({
  title: z.string().min(2, 'Başlık gerekli'),
  slug: z.string().min(2, 'Slug gerekli'),
  content: z.string().min(10, 'İçerik en az 10 karakter olmalı'),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  is_published: z.boolean(),
})

type PageFormData = z.infer<typeof pageSchema>

export default function AdminPageEditPage() {
  const params = useParams()
  const router = useRouter()
  const isNew = params.id === 'yeni'

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PageFormData>({
    resolver: zodResolver(pageSchema),
    defaultValues: {
      title: '',
      slug: '',
      content: '',
      meta_title: '',
      meta_description: '',
      is_published: false,
    },
  })

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setValue('title', title)
    if (isNew) {
      setValue('slug', slugify(title))
    }
  }

  const onSubmit = async (data: PageFormData) => {
    console.log('Saving page:', data)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.push('/yonet/sayfalar')
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
            {isNew ? 'Yeni Sayfa Ekle' : 'Sayfa Düzenle'}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card variant="bordered">
              <CardContent className="pt-6 space-y-4">
                <Input
                  label="Sayfa Başlığı *"
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
                  label="İçerik *"
                  rows={15}
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
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-semibold text-gray-900 mb-4">SEO</h2>
                <Input
                  label="Meta Başlık"
                  {...register('meta_title')}
                />
                <Textarea
                  label="Meta Açıklama"
                  rows={3}
                  {...register('meta_description')}
                />
              </CardContent>
            </Card>

            <div className="flex flex-col gap-3">
              <Button type="submit" isLoading={isSubmitting}>
                <Save className="w-5 h-5 mr-2" />
                {isNew ? 'Sayfa Ekle' : 'Kaydet'}
              </Button>
              {!isNew && (
                <Button type="button" variant="danger">
                  <Trash2 className="w-5 h-5 mr-2" />
                  Sayfayı Sil
                </Button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
