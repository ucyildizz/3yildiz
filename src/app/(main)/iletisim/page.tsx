'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Factory,
} from 'lucide-react'
import { Button, Input, Textarea, Select } from '@/components/ui'
import { SITE_CONFIG } from '@/lib/constants'

const contactSchema = z.object({
  name: z.string().min(2, 'İsim en az 2 karakter olmalıdır'),
  email: z.string().email('Geçerli bir e-posta adresi girin'),
  phone: z.string().min(10, 'Geçerli bir telefon numarası girin'),
  subject: z.string().min(1, 'Konu seçin'),
  message: z.string().min(10, 'Mesaj en az 10 karakter olmalıdır'),
})

type ContactFormData = z.infer<typeof contactSchema>

const subjectOptions = [
  { value: 'genel', label: 'Genel Bilgi' },
  { value: 'teklif', label: 'Fiyat Teklifi' },
  { value: 'siparis', label: 'Sipariş Bilgisi' },
  { value: 'bayi', label: 'Bayilik Başvurusu' },
  { value: 'diger', label: 'Diğer' },
]

const contactInfo = [
  {
    icon: Phone,
    title: 'Telefon',
    lines: [SITE_CONFIG.phone, SITE_CONFIG.phone2, SITE_CONFIG.phone3],
    href: `tel:${SITE_CONFIG.phone}`,
  },
  {
    icon: Mail,
    title: 'E-posta',
    lines: [SITE_CONFIG.email],
    href: `mailto:${SITE_CONFIG.email}`,
  },
  {
    icon: MapPin,
    title: 'Adres',
    lines: [SITE_CONFIG.address, `${SITE_CONFIG.city} / Türkiye`],
  },
  {
    icon: Clock,
    title: 'Çalışma Saatleri',
    lines: ['Pazartesi - Cumartesi', '08:00 - 18:00'],
  },
]

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    // Simüle edilmiş API çağrısı
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log('Form data:', data)
    setIsSubmitting(false)
    setIsSubmitted(true)
    reset()
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Mesajınız Alındı!
          </h2>
          <p className="text-gray-600 mb-6">
            En kısa sürede sizinle iletişime geçeceğiz.
            Teşekkür ederiz.
          </p>
          <Button onClick={() => setIsSubmitted(false)}>
            Yeni Mesaj Gönder
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">İletişim</h1>
            <p className="text-xl text-blue-100">
              Sorularınız, önerileriniz veya teklif talepleriniz için bizimle
              iletişime geçin.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                İletişim Bilgileri
              </h2>

              <div className="space-y-6">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div key={index} className="flex gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{item.title}</h3>
                        {item.lines.map((line, i) => (
                          <p key={i} className="text-gray-600 text-sm">
                            {item.href && i === 0 ? (
                              <a
                                href={item.href}
                                className="hover:text-blue-600 transition-colors"
                              >
                                {line}
                              </a>
                            ) : (
                              line
                            )}
                          </p>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Factory Info */}
              <div className="mt-8 pt-6 border-t">
                <div className="flex items-center gap-3 mb-4">
                  <Factory className="w-6 h-6 text-blue-600" />
                  <span className="font-medium text-gray-900">Üretim Tesisi</span>
                </div>
                <p className="text-sm text-gray-600">
                  Organize Sanayi Bölgesi 2.Kısım<br />
                  6.Cadde No:15 Üçyıldız Metal<br />
                  Sivas / Türkiye
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Bize Ulaşın
              </h2>
              <p className="text-gray-600 mb-8">
                Formu doldurun, en kısa sürede size dönüş yapalım.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Ad Soyad *"
                    placeholder="Adınız Soyadınız"
                    error={errors.name?.message}
                    {...register('name')}
                  />
                  <Input
                    label="E-posta *"
                    type="email"
                    placeholder="ornek@email.com"
                    error={errors.email?.message}
                    {...register('email')}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Telefon *"
                    placeholder="0532 123 45 67"
                    error={errors.phone?.message}
                    {...register('phone')}
                  />
                  <Select
                    label="Konu *"
                    options={subjectOptions}
                    placeholder="Konu seçin"
                    error={errors.subject?.message}
                    {...register('subject')}
                  />
                </div>

                <Textarea
                  label="Mesajınız *"
                  placeholder="Mesajınızı buraya yazın..."
                  rows={6}
                  error={errors.message?.message}
                  {...register('message')}
                />

                <Button type="submit" size="lg" isLoading={isSubmitting}>
                  <Send className="w-5 h-5 mr-2" />
                  Mesaj Gönder
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Konum</h2>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6131.131379675238!2d37.078446767388556!3d39.794301040352515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x407c0187b690e7ed%3A0x871274a6524cab16!2zw5zDh1lJTERJWiBNRVRBTCBTQU4uVMSwQy5MVEQuxZ5UxLA!5e0!3m2!1str!2str!4v1780169750923!5m2!1str!2str"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
