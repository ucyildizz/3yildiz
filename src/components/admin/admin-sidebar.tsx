'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Newspaper,
  FileText,
  Image,
  FileQuestion,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
  Home,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/auth-store'
import { SITE_CONFIG } from '@/lib/constants'

const menuItems = [
  { href: '/yonet', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/yonet/urunler', icon: Package, label: 'Ürünler' },
  { href: '/yonet/kategoriler', icon: FolderTree, label: 'Kategoriler' },
  { href: '/yonet/haberler', icon: Newspaper, label: 'Haberler' },
  { href: '/yonet/sayfalar', icon: FileText, label: 'Sayfalar' },
  { href: '/yonet/slider', icon: Image, label: 'Slider' },
  { href: '/yonet/teklifler', icon: FileQuestion, label: 'Teklif Talepleri' },
]

export function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { logout, user } = useAuthStore()

  const handleLogout = () => {
    logout()
    router.push('/yonet/giris')
  }

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-40 bg-gray-900 text-white transition-all duration-300 flex flex-col',
          isCollapsed ? '-translate-x-full lg:translate-x-0 lg:w-20' : 'w-64'
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">ÜY</span>
              </div>
              <div>
                <span className="font-semibold block text-sm leading-tight">
                  {SITE_CONFIG.name}
                </span>
                <span className="text-xs text-gray-400">Admin Panel</span>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg hover:bg-gray-800 transition-colors hidden lg:block"
          >
            <ChevronLeft
              className={cn(
                'w-5 h-5 transition-transform',
                isCollapsed && 'rotate-180'
              )}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive =
              pathname === item.href ||
              (item.href !== '/yonet' && pathname.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors'
            )}
          >
            <Home className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span>Siteye Git</span>}
          </Link>
          <button
            onClick={handleLogout}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-gray-800 transition-colors w-full'
            )}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span>Çıkış Yap</span>}
          </button>

          {!isCollapsed && user && (
            <div className="pt-3 px-3 text-xs text-gray-500">
              Hoşgeldin, <span className="text-gray-400">{user.username}</span>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </>
  )
}
