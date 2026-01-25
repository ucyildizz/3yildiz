'use client'

import Link from 'next/link'
import {
  Package,
  FolderTree,
  Newspaper,
  FileQuestion,
  TrendingUp,
  Users,
  Eye,
  ArrowUpRight,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { mockProducts, mockCategories, mockNews } from '@/lib/mock-data'

const stats = [
  {
    title: 'Toplam Ürün',
    value: mockProducts.length,
    icon: Package,
    color: 'blue',
    href: '/yonet/urunler',
  },
  {
    title: 'Kategoriler',
    value: mockCategories.length,
    icon: FolderTree,
    color: 'green',
    href: '/yonet/kategoriler',
  },
  {
    title: 'Haberler',
    value: mockNews.length,
    icon: Newspaper,
    color: 'purple',
    href: '/yonet/haberler',
  },
  {
    title: 'Teklif Talepleri',
    value: 12, // Mock data
    icon: FileQuestion,
    color: 'orange',
    href: '/yonet/teklifler',
  },
]

const colorClasses = {
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  purple: 'bg-purple-100 text-purple-600',
  orange: 'bg-orange-100 text-orange-600',
}

const recentProducts = mockProducts.slice(0, 5)
const recentNews = mockNews.slice(0, 3)

export default function AdminDashboardPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Yönetim paneline hoş geldiniz.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.href} href={stat.href}>
              <Card
                variant="bordered"
                className="hover:shadow-md transition-shadow cursor-pointer"
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">
                        {stat.value}
                      </p>
                    </div>
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        colorClasses[stat.color as keyof typeof colorClasses]
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Products */}
        <Card variant="bordered">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Son Eklenen Ürünler</CardTitle>
            <Link
              href="/yonet/urunler"
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              Tümünü Gör
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      {mockCategories.find((c) => c.id === product.category_id)
                        ?.name || 'Kategori yok'}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      product.is_active
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {product.is_active ? 'Aktif' : 'Pasif'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent News */}
        <Card variant="bordered">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Son Haberler</CardTitle>
            <Link
              href="/yonet/haberler"
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              Tümünü Gör
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentNews.map((news) => (
                <div
                  key={news.id}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">{news.title}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      {news.view_count} görüntülenme
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      news.is_published
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {news.is_published ? 'Yayında' : 'Taslak'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card variant="bordered" className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Hızlı İşlemler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { href: '/yonet/urunler/yeni', label: 'Yeni Ürün Ekle', icon: Package },
                { href: '/yonet/kategoriler', label: 'Kategori Ekle', icon: FolderTree },
                { href: '/yonet/haberler/yeni', label: 'Haber Ekle', icon: Newspaper },
                { href: '/yonet/slider', label: 'Slider Düzenle', icon: TrendingUp },
              ].map((action) => {
                const Icon = action.icon
                return (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-700">{action.label}</span>
                  </Link>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
