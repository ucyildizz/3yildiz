'use client'

import { motion, type Variants } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface PageTransitionWrapperProps {
  children: ReactNode
}

const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
}

const childVariants: Variants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
}

export function PageTransitionWrapper({ children }: PageTransitionWrapperProps) {
  const pathname = usePathname()

  return (
    <motion.div
      key={pathname}
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
    >
      {children}
    </motion.div>
  )
}

// Wrapper for individual sections that should animate on page load
export function AnimatedSection({
  children,
  className = '',
  delay = 0
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial="initial"
      whileInView="enter"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        initial: { opacity: 0, y: 40 },
        enter: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.7,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Staggered children animation wrapper
export function StaggeredContainer({
  children,
  className = '',
  staggerDelay = 0.1
}: {
  children: ReactNode
  className?: string
  staggerDelay?: number
}) {
  return (
    <motion.div
      initial="initial"
      whileInView="enter"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        initial: {},
        enter: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// For items inside StaggeredContainer
export function StaggeredItem({
  children,
  className = ''
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={childVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Fade in from different directions
export function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = ''
}: {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
  className?: string
}) {
  const directionOffset = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...directionOffset[direction]
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0
      }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Scale in animation
export function ScaleIn({
  children,
  delay = 0,
  className = ''
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Text reveal animation (letter by letter or word by word)
export function TextReveal({
  text,
  className = '',
  delay = 0,
  wordByWord = true
}: {
  text: string
  className?: string
  delay?: number
  wordByWord?: boolean
}) {
  const items = wordByWord ? text.split(' ') : text.split('')

  return (
    <motion.span
      initial="initial"
      whileInView="enter"
      viewport={{ once: true }}
      variants={{
        initial: {},
        enter: {
          transition: {
            staggerChildren: wordByWord ? 0.08 : 0.03,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={{
            initial: { opacity: 0, y: 20 },
            enter: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94]
              }
            },
          }}
          className="inline-block"
        >
          {item}{wordByWord ? '\u00A0' : ''}
        </motion.span>
      ))}
    </motion.span>
  )
}
