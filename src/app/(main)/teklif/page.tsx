'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  ShoppingCart,
  Trash2,
  Minus,
  Plus,
  Send,
  ArrowLeft,
  CheckCircle2,
  Package,
} from 'lucide-react'
import { Button, Input, Textarea } from '@/components/ui'
import { useQuoteStore } from '@/store/quote-store'
import { createQuoteRequest } from '@/lib/supabase/database'

const quoteSchema = z.object({
  companyName: z.string().optional(),
  contactName: z.string().min(2, 'İsim en az 2 karakter olmalıdır'),
  email: z.string().email('Geçerli bir e-posta adresi girin'),
  phone: z.string().min(10, 'Geçerli bir telefon numarası girin'),
  city: z.string().optional(),
  message: z.string().optional(),
})

type QuoteFormData = z.infer<typeof quoteSchema>

export default function QuotePage() {
  const router = useRouter()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { items, removeItem, updateQuantity, clearCart } = useQuoteStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
  })

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true)
    try {
      await createQuoteRequest({
        company_name: data.companyName || undefined,
        contact_name: data.contactName,
        email: data.email,
        phone: data.phone,
        city: data.city || undefined,
        message: data.message || undefined,
        items: items,
        status: 'pending',
      })
      setIsSubmitted(true)
      clearCart()
    } catch (error) {
      console.error('Quote request error:', error)
      alert('Teklif talebi gönderilirken bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Teklif Talebiniz Alındı!
          </h2>
          <p className="text-gray-600 mb-6">
            Talebiniz değerlendirilecek ve en kısa sürede size teklif iletilecektir.
            Teşekkür ederiz.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => router.push('/')}>Ana Sayfaya Dön</Button>
            <Button variant="outline" onClick={() => router.push('/urunler')}>
              Alışverişe Devam Et
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Teklif Sepetiniz Boş
          </h2>
          <p className="text-gray-600 mb-6">
            Teklif almak için ürün eklemediniz. Ürünlerimizi inceleyip sepetinize
            ekleyebilirsiniz.
          </p>
          <Link href="/urunler">
            <Button>
              <Package className="w-5 h-5 mr-2" />
              Ürünleri İncele
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Teklif Sepeti</h1>
              <p className="text-gray-600">{items.length} ürün</p>
            </div>
            <Link href="/urunler">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Alışverişe Devam
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.product_id + (item.variant || '')}
                className="bg-white rounded-xl shadow-sm p-4 flex gap-4"
              >
                {/* Product Image Placeholder */}
                <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Package className="w-10 h-10 text-gray-400" />
                </div>

                <div className="flex-1 min-w-0">
                  <span className="font-medium text-gray-900">
                    {item.product_name}
                  </span>
                  {item.variant && (
                    <p className="text-sm text-gray-500 mt-1">
                      Seçenek: {item.variant}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.product_id, item.quantity - 1)
                        }
                        className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product_id, item.quantity + 1)
                        }
                        className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.product_id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear Cart */}
            <div className="text-right">
              <button
                onClick={clearCart}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Sepeti Temizle
              </button>
            </div>
          </div>

          {/* Quote Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Teklif Bilgileri
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  label="Firma Adı"
                  placeholder="Firma adınız (varsa)"
                  {...register('companyName')}
                />

                <Input
                  label="İletişim Kişisi *"
                  placeholder="Ad Soyad"
                  error={errors.contactName?.message}
                  {...register('contactName')}
                />

                <Input
                  label="E-posta *"
                  type="email"
                  placeholder="ornek@email.com"
                  error={errors.email?.message}
                  {...register('email')}
                />

                <Input
                  label="Telefon *"
                  placeholder="0532 123 45 67"
                  error={errors.phone?.message}
                  {...register('phone')}
                />

                <Input
                  label="Şehir"
                  placeholder="Şehriniz"
                  {...register('city')}
                />

                <Textarea
                  label="Notunuz"
                  placeholder="Eklemek istediğiniz notlar..."
                  rows={3}
                  {...register('message')}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  isLoading={isSubmitting}
                >
                  <Send className="w-5 h-5 mr-2" />
                  Teklif İste
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Talebiniz değerlendirilecek ve size özel fiyat teklifi
                  iletilecektir.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
