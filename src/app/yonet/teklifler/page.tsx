'use client'

import { useState, useEffect } from 'react'
import {
  Search,
  Eye,
  CheckCircle,
  FileQuestion,
  Mail,
  Phone,
  Building2,
  MapPin,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import { Button, Input, Badge, Card, CardContent } from '@/components/ui'
import { formatDate } from '@/lib/utils'
import { QUOTE_STATUS } from '@/lib/constants'
import { QuoteRequest } from '@/types/database'
import { getQuoteRequests, updateQuoteStatus } from '@/lib/supabase/database'

type QuoteStatus = 'pending' | 'contacted' | 'quoted' | 'completed' | 'cancelled'

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null)
  const [updatingStatus, setUpdatingStatus] = useState(false)

  useEffect(() => {
    fetchQuotes()
  }, [])

  const fetchQuotes = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getQuoteRequests()
      setQuotes(data)
    } catch (err) {
      setError('Teklif talepleri yüklenirken hata oluştu')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (status: QuoteStatus) => {
    if (!selectedQuote) return

    try {
      setUpdatingStatus(true)
      setError(null)
      await updateQuoteStatus(selectedQuote.id, status)
      await fetchQuotes()
      // Update selected quote
      setSelectedQuote(prev => prev ? { ...prev, status } : null)
    } catch (err) {
      setError('Durum güncellenirken hata oluştu')
      console.error(err)
    } finally {
      setUpdatingStatus(false)
    }
  }

  const filteredQuotes = quotes.filter((quote) => {
    const matchesSearch =
      quote.contact_name.toLowerCase().includes(search.toLowerCase()) ||
      quote.company_name?.toLowerCase().includes(search.toLowerCase()) ||
      quote.email.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = !selectedStatus || quote.status === selectedStatus
    return matchesSearch && matchesStatus
  })

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
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Teklif Talepleri</h1>
        <p className="text-gray-600">Gelen teklif taleplerini yönetin</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* List */}
        <div className="lg:col-span-2">
          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="İsim, firma veya e-posta ara..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Tüm Durumlar</option>
                {Object.entries(QUOTE_STATUS).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quotes List */}
          <div className="bg-white rounded-xl shadow-sm divide-y">
            {filteredQuotes.map((quote) => (
              <div
                key={quote.id}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedQuote?.id === quote.id ? 'bg-blue-50' : ''
                }`}
                onClick={() => setSelectedQuote(quote)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900">
                        {quote.contact_name}
                      </h3>
                      {quote.company_name && (
                        <span className="text-sm text-gray-500">
                          - {quote.company_name}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {(quote.items as any[])?.length || 0} ürün • {formatDate(quote.created_at)}
                    </p>
                  </div>
                  <Badge
                    variant={
                      quote.status === 'pending'
                        ? 'warning'
                        : quote.status === 'completed'
                        ? 'success'
                        : 'info'
                    }
                  >
                    {QUOTE_STATUS[quote.status as QuoteStatus]?.label || quote.status}
                  </Badge>
                </div>
              </div>
            ))}

            {filteredQuotes.length === 0 && (
              <div className="text-center py-12">
                <FileQuestion className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Teklif talebi bulunamadı</p>
              </div>
            )}
          </div>
        </div>

        {/* Detail */}
        <div className="lg:col-span-1">
          {selectedQuote ? (
            <Card variant="bordered" className="sticky top-24">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-semibold text-gray-900">Talep Detayı</h2>
                  <Badge
                    variant={
                      selectedQuote.status === 'pending'
                        ? 'warning'
                        : selectedQuote.status === 'completed'
                        ? 'success'
                        : 'info'
                    }
                  >
                    {QUOTE_STATUS[selectedQuote.status as QuoteStatus]?.label || selectedQuote.status}
                  </Badge>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <span>
                      {selectedQuote.company_name || 'Bireysel Müşteri'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a
                      href={`mailto:${selectedQuote.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {selectedQuote.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <a
                      href={`tel:${selectedQuote.phone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {selectedQuote.phone}
                    </a>
                  </div>
                  {selectedQuote.city && (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{selectedQuote.city}</span>
                    </div>
                  )}
                </div>

                {/* Products */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">
                    Talep Edilen Ürünler
                  </h3>
                  <div className="space-y-2">
                    {(selectedQuote.items as any[])?.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="text-sm">{item.product_name}</span>
                        <span className="text-sm font-medium">
                          {item.quantity} adet
                        </span>
                      </div>
                    )) || <p className="text-sm text-gray-500">Ürün bulunamadı</p>}
                  </div>
                </div>

                {/* Message */}
                {selectedQuote.message && (
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-900 mb-2">Not</h3>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {selectedQuote.message}
                    </p>
                  </div>
                )}

                {/* Status Update */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">Durum Güncelle</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(QUOTE_STATUS).map(([key, value]) => (
                      <button
                        key={key}
                        onClick={() => handleStatusUpdate(key as QuoteStatus)}
                        disabled={updatingStatus || selectedQuote.status === key}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          selectedQuote.status === key
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        } disabled:opacity-50`}
                      >
                        {value.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.open(`mailto:${selectedQuote.email}`, '_blank')}
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    E-posta Gönder
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card variant="bordered">
              <CardContent className="pt-6 text-center py-12">
                <Eye className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Detayları görmek için bir talep seçin
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
