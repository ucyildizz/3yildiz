'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Lock, User, AlertCircle } from 'lucide-react'
import { Button, Input } from '@/components/ui'
import { useAuthStore } from '@/store/auth-store'
import { SITE_CONFIG } from '@/lib/constants'

const loginSchema = z.object({
  username: z.string().min(1, 'Kullanıcı adı gerekli'),
  password: z.string().min(1, 'Şifre gerekli'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function AdminLoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const { login, isAuthenticated } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/yonet')
    }
  }, [isAuthenticated, router])

  const onSubmit = async (data: LoginFormData) => {
    setError('')
    // Simüle gecikme
    await new Promise((resolve) => setTimeout(resolve, 500))

    const success = login(data.username, data.password)
    if (success) {
      router.push('/yonet')
    } else {
      setError('Kullanıcı adı veya şifre hatalı')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">ÜY</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{SITE_CONFIG.name}</h1>
          <p className="text-gray-600 mt-1">Yönetim Paneli</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Giriş Yap
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Kullanıcı Adı"
                className="pl-10"
                error={errors.username?.message}
                {...register('username')}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="password"
                placeholder="Şifre"
                className="pl-10"
                error={errors.password?.message}
                {...register('password')}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              isLoading={isSubmitting}
            >
              Giriş Yap
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.name}
        </p>
      </div>
    </div>
  )
}
