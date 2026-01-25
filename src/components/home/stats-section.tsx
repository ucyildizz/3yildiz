'use client'

import { useEffect, useRef, useState } from 'react'
import { Award, Users, Package, Calendar, Factory, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SITE_CONFIG } from '@/lib/constants'

interface StatItem {
  icon: React.ElementType
  value: number
  suffix: string
  label: string
  description: string
}

const stats: StatItem[] = [
  {
    icon: Calendar,
    value: new Date().getFullYear() - SITE_CONFIG.foundedYear,
    suffix: '+',
    label: 'Yıllık Tecrübe',
    description: `${SITE_CONFIG.foundedYear}'den beri sektörde`
  },
  {
    icon: Package,
    value: 500,
    suffix: '+',
    label: 'Ürün Çeşidi',
    description: 'Geniş ürün yelpazesi'
  },
  {
    icon: Users,
    value: 1000,
    suffix: '+',
    label: 'Mutlu Müşteri',
    description: 'Türkiye genelinde'
  },
  {
    icon: Factory,
    value: 15000,
    suffix: ' m²',
    label: 'Üretim Alanı',
    description: 'Modern tesislerimiz'
  }
]

function AnimatedCounter({ end, suffix, duration = 2000 }: { end: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    const startTime = Date.now()
    const startValue = 0

    const updateCount = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentValue = Math.floor(startValue + (end - startValue) * easeOut)

      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      }
    }

    requestAnimationFrame(updateCount)
  }, [end, duration, hasStarted])

  return (
    <span ref={ref}>
      {count.toLocaleString('tr-TR')}{suffix}
    </span>
  )
}

export function StatsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-floatSlow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-400/10 rounded-full blur-3xl animate-floatSlow" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-orange-600/5 rounded-full blur-2xl animate-float" />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 text-orange-400 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm border border-orange-500/20">
            <TrendingUp className="w-4 h-4" />
            Rakamlarla Biz
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Güven ve <span className="text-gradient-orange">Kalite</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {SITE_CONFIG.foundedYear} yılından bu yana Türkiye&apos;nin dört bir yanına kaliteli ürünler sunuyoruz.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                'group relative p-8 rounded-3xl transition-all duration-500',
                'bg-white/5 backdrop-blur-sm border border-white/10',
                'hover:bg-white/10 hover:border-orange-500/30 hover:-translate-y-2',
                'hover:shadow-2xl hover:shadow-orange-500/20'
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Content */}
              <div className="relative">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>

                {/* Value */}
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <div className="text-lg font-semibold text-white mb-1">
                  {stat.label}
                </div>

                {/* Description */}
                <div className="text-sm text-gray-400">
                  {stat.description}
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-orange-500/30 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-orange-500/30 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Bottom badge */}
        <div className="mt-16 flex justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
            <Award className="w-6 h-6 text-orange-500" />
            <span className="text-white font-medium">ISO 9001:2015 Kalite Belgeli Üretim</span>
          </div>
        </div>
      </div>
    </section>
  )
}
