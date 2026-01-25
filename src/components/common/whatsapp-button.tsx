'use client'

import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WhatsAppButtonProps {
  phoneNumber: string
  message?: string
}

export function WhatsAppButton({
  phoneNumber,
  message = 'Merhaba, ürünleriniz hakkında bilgi almak istiyorum.'
}: WhatsAppButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showTooltip, setShowTooltip] = useState(true)

  // Format phone number for WhatsApp (remove spaces, dashes, etc.)
  const formattedPhone = phoneNumber.replace(/\D/g, '')
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip */}
      {showTooltip && (
        <div className="relative animate-fadeIn">
          <div className="bg-white rounded-lg shadow-lg px-4 py-3 pr-8 max-w-[220px]">
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              aria-label="Kapat"
            >
              <X className="w-4 h-4" />
            </button>
            <p className="text-sm text-gray-700 font-medium">
              Bize WhatsApp'tan ulaşın!
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Hızlı destek için tıklayın
            </p>
          </div>
          {/* Arrow */}
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white transform rotate-45 shadow-lg" />
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          'flex items-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105',
          isHovered ? 'px-5 py-3' : 'p-4'
        )}
        aria-label="WhatsApp ile iletişime geçin"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span
          className={cn(
            'font-medium whitespace-nowrap overflow-hidden transition-all duration-300',
            isHovered ? 'max-w-[150px] opacity-100' : 'max-w-0 opacity-0'
          )}
        >
          Bize Ulaşın
        </span>
      </a>

      {/* Pulse animation ring */}
      <div className="absolute bottom-0 right-0 w-14 h-14 bg-[#25D366] rounded-full animate-ping opacity-20 pointer-events-none" />
    </div>
  )
}
