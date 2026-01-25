'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  FileText,
} from 'lucide-react'
import { Button, Badge } from '@/components/ui'
import { formatDate } from '@/lib/utils'

// Mock sayfa verileri
const mockPages = [
  {
    id: '1',
    title: 'Hakkımızda',
    slug: 'kurumsal',
    is_published: true,
    updated_at: '2024-01-15',
  },
  {
    id: '2',
    title: 'Kalite Politikası',
    slug: 'kurumsal/kalite',
    is_published: true,
    updated_at: '2024-01-14',
  },
  {
    id: '3',
    title: 'Değerlerimiz',
    slug: 'kurumsal/degerlerimiz',
    is_published: true,
    updated_at: '2024-01-13',
  },
  {
    id: '4',
    title: 'Gizlilik Politikası',
    slug: 'gizlilik',
    is_published: false,
    updated_at: '2024-01-12',
  },
]

export default function AdminPagesPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sayfalar</h1>
          <p className="text-gray-600">Statik sayfaları yönetin</p>
        </div>
        <Link href="/yonet/sayfalar/yeni">
          <Button>
            <Plus className="w-5 h-5 mr-2" />
            Yeni Sayfa
          </Button>
        </Link>
      </div>

      {/* Pages List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Sayfa
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                URL
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Durum
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Son Güncelleme
              </th>
              <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {mockPages.map((page) => (
              <tr key={page.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-gray-400" />
                    </div>
                    <span className="font-medium text-gray-900">
                      {page.title}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <code className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    /{page.slug}
                  </code>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={page.is_published ? 'success' : 'warning'}>
                    {page.is_published ? 'Yayında' : 'Taslak'}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {formatDate(page.updated_at)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/${page.slug}`}
                      target="_blank"
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </Link>
                    <Link
                      href={`/yonet/sayfalar/${page.id}`}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                    <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
