'use client'

import React, { useState, useEffect } from 'react'
import { Link } from 'next-view-transitions'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, Mail, ShoppingCart, ChevronDown, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants'
import { useQuoteStore } from '@/store/quote-store'
import { Button } from '@/components/ui'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const itemCount = useQuoteStore((state) => state.getItemCount())

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-gray-200/50'
          : 'bg-white shadow-sm'
      )}
    >
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-2.5 hidden md:block relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-4 left-1/4 w-24 h-24 bg-orange-400/10 rounded-full blur-xl" />
        </div>

        <div className="container mx-auto px-4 flex justify-between items-center text-sm relative">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="flex items-center gap-2 hover:text-orange-400 transition-colors group"
            >
              <span className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center group-hover:bg-orange-500/30 transition-colors">
                <Phone className="w-4 h-4" />
              </span>
              <span className="font-medium">{SITE_CONFIG.phone}</span>
            </a>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="flex items-center gap-2 hover:text-orange-400 transition-colors group"
            >
              <span className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center group-hover:bg-orange-500/30 transition-colors">
                <Mail className="w-4 h-4" />
              </span>
              <span>{SITE_CONFIG.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <MapPin className="w-4 h-4 text-orange-400" />
            <span>{SITE_CONFIG.address}, {SITE_CONFIG.city}</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative h-16 w-auto">
              <Image
                src="/images/logo.png"
                alt="3 Yıldız Metal"
                width={180}
                height={64}
                className="h-14 md:h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <div key={link.href} className="relative group">
                {'children' in link && link.children ? (
                  <>
                    <button
                      className={cn(
                        'px-4 py-2.5 rounded-xl font-medium flex items-center gap-1 transition-all duration-300',
                        isActive(link.href)
                          ? 'text-orange-600 bg-orange-50'
                          : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50/50'
                      )}
                      onMouseEnter={() => setOpenDropdown(link.href)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {link.label}
                      <ChevronDown className={cn(
                        'w-4 h-4 transition-transform duration-300',
                        openDropdown === link.href ? 'rotate-180' : ''
                      )} />
                    </button>
                    <div
                      className={cn(
                        'absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 py-2 transition-all duration-300',
                        openDropdown === link.href
                          ? 'opacity-100 visible translate-y-0'
                          : 'opacity-0 invisible -translate-y-4'
                      )}
                      onMouseEnter={() => setOpenDropdown(link.href)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {link.children.map((child, idx) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-gray-700 hover:text-orange-600 hover:bg-orange-50/50 transition-all duration-200 hover:pl-6"
                          style={{ animationDelay: `${idx * 50}ms` }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className={cn(
                      'px-4 py-2.5 rounded-xl font-medium transition-all duration-300 relative group/link',
                      isActive(link.href)
                        ? 'text-orange-600 bg-orange-50'
                        : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50/50'
                    )}
                  >
                    {link.label}
                    {/* Underline animation */}
                    <span className={cn(
                      'absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transform origin-left transition-transform duration-300',
                      isActive(link.href) ? 'scale-x-100' : 'scale-x-0 group-hover/link:scale-x-100'
                    )} />
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Link href="/teklif" className="relative group">
              <Button variant="primary" size="sm" className="hidden sm:flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                <span>Teklif Sepeti</span>
              </Button>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-bounceIn font-bold">
                  {itemCount}
                </span>
              )}

              {/* Mobile cart icon */}
              <button className="sm:hidden relative p-2 text-gray-700 hover:text-orange-600 transition-colors">
                <ShoppingCart className="w-6 h-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-bounceIn">
                    {itemCount}
                  </span>
                )}
              </button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className={cn(
                'lg:hidden p-2 rounded-xl transition-all duration-300',
                isMenuOpen
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
              )}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-500 ease-out',
            isMenuOpen ? 'max-h-[500px] pb-4' : 'max-h-0'
          )}
        >
          <div className="flex flex-col gap-1 pt-4 border-t border-gray-100">
            {NAV_LINKS.map((link, idx) => (
              <React.Fragment key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'px-4 py-3 rounded-xl font-medium transition-all duration-300',
                    isActive(link.href)
                      ? 'text-orange-600 bg-orange-50'
                      : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50/50 hover:pl-6'
                  )}
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    animation: isMenuOpen ? `fadeInUp 0.3s ease-out ${idx * 50}ms forwards` : 'none',
                    opacity: isMenuOpen ? 1 : 0,
                  }}
                >
                  {link.label}
                </Link>
                {'children' in link && link.children && (
                  <div className="pl-4 space-y-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-orange-600 hover:pl-6 transition-all rounded-lg"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}

            {/* Mobile contact info */}
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-3 px-4">
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex items-center gap-3 text-gray-600 hover:text-orange-600 transition-colors"
              >
                <span className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-orange-600" />
                </span>
                <span className="font-medium">{SITE_CONFIG.phone}</span>
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-3 text-gray-600 hover:text-orange-600 transition-colors"
              >
                <span className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-orange-600" />
                </span>
                <span>{SITE_CONFIG.email}</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
