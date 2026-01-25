'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'gradient'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = 'primary',
    size = 'md',
    isLoading,
    icon,
    iconPosition = 'left',
    children,
    disabled,
    ...props
  }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center font-semibold rounded-xl
      transition-all duration-300 ease-out
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
      active:scale-95
      relative overflow-hidden
      group
    `

    const variants = {
      primary: `
        bg-gradient-to-r from-orange-500 to-orange-600
        text-white
        hover:from-orange-600 hover:to-orange-700
        hover:shadow-lg hover:shadow-orange-500/30
        focus:ring-orange-500
        hover:-translate-y-0.5
      `,
      secondary: `
        bg-gray-800 text-white
        hover:bg-gray-900
        hover:shadow-lg hover:shadow-gray-800/30
        focus:ring-gray-700
        hover:-translate-y-0.5
      `,
      outline: `
        border-2 border-orange-500 text-orange-600
        hover:bg-orange-50 hover:border-orange-600
        focus:ring-orange-500
        hover:-translate-y-0.5
      `,
      ghost: `
        text-gray-700
        hover:bg-gray-100 hover:text-orange-600
        focus:ring-gray-400
      `,
      danger: `
        bg-gradient-to-r from-red-500 to-red-600
        text-white
        hover:from-red-600 hover:to-red-700
        hover:shadow-lg hover:shadow-red-500/30
        focus:ring-red-500
        hover:-translate-y-0.5
      `,
      gradient: `
        bg-gradient-to-r from-orange-500 via-red-500 to-pink-500
        text-white
        hover:from-orange-600 hover:via-red-600 hover:to-pink-600
        hover:shadow-lg hover:shadow-orange-500/30
        focus:ring-orange-500
        hover:-translate-y-0.5
        animate-gradient bg-[length:200%_200%]
      `,
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm gap-1.5',
      md: 'px-5 py-2.5 text-base gap-2',
      lg: 'px-7 py-3.5 text-lg gap-2.5',
      xl: 'px-8 py-4 text-xl gap-3',
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {/* Shine effect overlay */}
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {isLoading ? (
          <>
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Yükleniyor...</span>
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <span className="transition-transform group-hover:-translate-x-0.5">{icon}</span>
            )}
            <span className="relative">{children}</span>
            {icon && iconPosition === 'right' && (
              <span className="transition-transform group-hover:translate-x-0.5">{icon}</span>
            )}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
