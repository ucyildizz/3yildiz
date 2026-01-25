'use client'

import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center"
      >
        {/* Spinner */}
        <div className="relative w-16 h-16">
          {/* Outer ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 border-4 border-transparent border-t-orange-500 border-r-orange-300 rounded-full"
          />
          {/* Inner ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-2 border-4 border-transparent border-b-orange-400 border-l-orange-200 rounded-full"
          />
          {/* Center dot */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-3 h-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full" />
          </motion.div>
        </div>

        {/* Text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-gray-500 text-sm"
        >
          Sayfa yükleniyor...
        </motion.p>

        {/* Animated dots */}
        <div className="flex gap-1.5 mt-3">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-1.5 h-1.5 bg-orange-500 rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
