'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade'

interface ScrollRevealProps {
  children: ReactNode
  direction?: RevealDirection
  delay?: number
  duration?: number
  threshold?: number
  className?: string
  once?: boolean
}

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 800,
  threshold = 0.1,
  className,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) {
            observer.unobserve(element)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, once])

  const getInitialStyles = () => {
    const base = {
      opacity: 0,
      transition: `all ${duration}ms cubic-bezier(0.5, 0, 0, 1) ${delay}ms`,
    }

    switch (direction) {
      case 'up':
        return { ...base, transform: 'translateY(60px)' }
      case 'down':
        return { ...base, transform: 'translateY(-60px)' }
      case 'left':
        return { ...base, transform: 'translateX(60px)' }
      case 'right':
        return { ...base, transform: 'translateX(-60px)' }
      case 'scale':
        return { ...base, transform: 'scale(0.8)' }
      case 'fade':
      default:
        return base
    }
  }

  const getVisibleStyles = () => ({
    opacity: 1,
    transform: 'translateY(0) translateX(0) scale(1)',
  })

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={isVisible ? { ...getInitialStyles(), ...getVisibleStyles() } : getInitialStyles()}
    >
      {children}
    </div>
  )
}

// Stagger reveal for multiple items
interface StaggerRevealProps {
  children: ReactNode[]
  direction?: RevealDirection
  staggerDelay?: number
  duration?: number
  className?: string
  itemClassName?: string
}

export function StaggerReveal({
  children,
  direction = 'up',
  staggerDelay = 100,
  duration = 600,
  className,
  itemClassName,
}: StaggerRevealProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <ScrollReveal
          key={index}
          direction={direction}
          delay={index * staggerDelay}
          duration={duration}
          className={itemClassName}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  )
}
