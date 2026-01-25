'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { useAuthStore } from '@/store/auth-store'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()

  // Giriş sayfası hariç auth kontrolü
  const isLoginPage = pathname === '/yonet/giris'

  useEffect(() => {
    if (!isAuthenticated && !isLoginPage) {
      router.push('/yonet/giris')
    }
  }, [isAuthenticated, isLoginPage, router])

  // Giriş sayfası için sidebar gösterme
  if (isLoginPage) {
    return <>{children}</>
  }

  // Auth yoksa loading göster (redirect olana kadar)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  )
}
