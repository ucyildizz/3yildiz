'use client'

import { useState, useEffect, useCallback } from 'react'
import { Link } from 'next-view-transitions'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui'
import { Slider } from '@/types/database'

interface HeroSliderProps {
  slides: Slider[]
}

// Helper function to get images from slider (handles both old and new format)
function getSliderImages(slide: Slider): string[] {
  if (slide.images && slide.images.length > 0) {
    return slide.images
  }
  if (slide.image_url) {
    return [slide.image_url]
  }
  return ['/images/slider/default.jpg']
}

// Floating decorative shapes
function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large blob */}
      <div
        className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-full blur-3xl animate-floatSlow"
        style={{ animationDelay: '0s' }}
      />
      {/* Medium blob */}
      <div
        className="absolute top-1/2 -left-20 w-64 h-64 bg-gradient-to-br from-orange-400/15 to-yellow-500/10 rounded-full blur-2xl animate-floatSlow"
        style={{ animationDelay: '2s' }}
      />
      {/* Small accent */}
      <div
        className="absolute bottom-20 right-1/4 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-red-500/10 rounded-full blur-xl animate-float"
        style={{ animationDelay: '1s' }}
      />
      {/* Geometric shapes */}
      <div className="absolute top-1/4 right-1/3 w-4 h-4 bg-orange-400/30 rotate-45 animate-bounce" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-orange-300/40 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-yellow-400/30 rotate-45 animate-bounce" style={{ animationDelay: '1.5s' }} />
    </div>
  )
}

// Inner component for handling multiple images within a single slide
function SlideImages({ images, isActive, slideTitle }: { images: string[]; isActive: boolean; slideTitle: string }) {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    if (!isActive || images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isActive, images.length])

  useEffect(() => {
    if (!isActive) {
      setCurrentImage(0)
    }
  }, [isActive])

  return (
    <div className="absolute inset-0">
      {images.map((image, imgIndex) => (
        <div
          key={imgIndex}
          className={cn(
            'absolute inset-0 transition-all duration-1000',
            imgIndex === currentImage
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-105'
          )}
        >
          <Image
            src={image}
            alt={`${slideTitle} - ${imgIndex + 1}`}
            fill
            className="object-cover"
            priority={imgIndex === 0}
          />
        </div>
      ))}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/70 to-gray-900/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent" />

      {/* Orange accent gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-transparent" />

      {/* Image indicators */}
      {images.length > 1 && isActive && (
        <div className="absolute bottom-24 right-8 flex gap-2 z-10">
          {images.map((_, imgIndex) => (
            <button
              key={imgIndex}
              onClick={() => setCurrentImage(imgIndex)}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-300',
                imgIndex === currentImage
                  ? 'bg-orange-500 w-6'
                  : 'bg-white/40 hover:bg-white/60'
              )}
              aria-label={`Resim ${imgIndex + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function HeroSlider({ slides }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setTimeout(() => setIsAnimating(false), 1000)
  }, [slides.length, isAnimating])

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setTimeout(() => setIsAnimating(false), 1000)
  }

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return
    setIsAnimating(true)
    setCurrentSlide(index)
    setTimeout(() => setIsAnimating(false), 1000)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000)
    return () => clearInterval(interval)
  }, [nextSlide])

  if (slides.length === 0) return null

  return (
    <section className="relative h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden bg-gray-900">
      {/* Floating decorative elements */}
      <FloatingShapes />

      {/* Slides */}
      {slides.map((slide, index) => {
        const images = getSliderImages(slide)
        const isActive = index === currentSlide

        return (
          <div
            key={slide.id}
            className={cn(
              'absolute inset-0 transition-all duration-1000 ease-out',
              isActive
                ? 'opacity-100 translate-x-0'
                : index < currentSlide
                  ? 'opacity-0 -translate-x-full'
                  : 'opacity-0 translate-x-full'
            )}
          >
            {/* Background Images */}
            <SlideImages images={images} isActive={isActive} slideTitle={slide.title} />

            {/* Content */}
            <div className="relative h-full container mx-auto px-4 flex items-center">
              <div className="max-w-3xl">
                {/* Subtitle badge */}
                {slide.subtitle && (
                  <div
                    className={cn(
                      'inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/90 to-orange-600/90 text-white text-sm font-semibold rounded-full mb-6 backdrop-blur-sm',
                      isActive ? 'animate-fadeInUp' : 'opacity-0'
                    )}
                  >
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    {slide.subtitle}
                  </div>
                )}

                {/* Title */}
                <h1
                  className={cn(
                    'text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight',
                    isActive ? 'animate-fadeInUp animation-delay-100' : 'opacity-0'
                  )}
                >
                  <span className="inline-block">{slide.title.split(' ').slice(0, -1).join(' ')}</span>{' '}
                  <span className="inline-block text-gradient-orange">{slide.title.split(' ').slice(-1)}</span>
                </h1>

                {/* Description */}
                {slide.description && (
                  <p
                    className={cn(
                      'text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl',
                      isActive ? 'animate-fadeInUp animation-delay-200' : 'opacity-0'
                    )}
                  >
                    {slide.description}
                  </p>
                )}

                {/* CTA Buttons */}
                {slide.button_text && slide.button_link && (
                  <div
                    className={cn(
                      'flex flex-wrap gap-4',
                      isActive ? 'animate-fadeInUp animation-delay-300' : 'opacity-0'
                    )}
                  >
                    <Link href={slide.button_link}>
                      <Button size="lg" className="group">
                        {slide.button_text}
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link href="/iletisim">
                      <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                        İletişime Geçin
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/10 hover:bg-orange-500 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 group border border-white/20"
            aria-label="Önceki slayt"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/10 hover:bg-orange-500 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 group border border-white/20"
            aria-label="Sonraki slayt"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </>
      )}

      {/* Progress Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'relative h-3 rounded-full transition-all duration-500 overflow-hidden',
                index === currentSlide
                  ? 'w-12 bg-white/30'
                  : 'w-3 bg-white/30 hover:bg-white/50'
              )}
              aria-label={`Slayt ${index + 1}`}
            >
              {index === currentSlide && (
                <span
                  className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full origin-left"
                  style={{
                    animation: 'progress 6s linear forwards',
                  }}
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Slide counter */}
      <div className="absolute bottom-8 right-8 hidden md:flex items-center gap-2 text-white/60 font-mono text-sm">
        <span className="text-orange-500 text-2xl font-bold">{String(currentSlide + 1).padStart(2, '0')}</span>
        <span className="text-white/40">/</span>
        <span>{String(slides.length).padStart(2, '0')}</span>
      </div>

      {/* Custom progress animation */}
      <style jsx>{`
        @keyframes progress {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </section>
  )
}
