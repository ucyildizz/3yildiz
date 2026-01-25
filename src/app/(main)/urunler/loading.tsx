'use client'

import { motion } from 'framer-motion'

export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero skeleton */}
      <div className="relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl"
          >
            <div className="h-8 w-32 bg-white/10 rounded-full mb-6 animate-pulse" />
            <div className="h-12 w-3/4 bg-white/10 rounded-lg mb-4 animate-pulse" />
            <div className="h-6 w-full bg-white/10 rounded-lg animate-pulse" />
          </motion.div>
        </div>
      </div>

      {/* Filters skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse"
            />
          ))}
        </div>

        {/* Products grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm"
            >
              <div className="h-48 bg-gray-200 animate-pulse" />
              <div className="p-4">
                <div className="h-5 w-3/4 bg-gray-200 rounded mb-3 animate-pulse" />
                <div className="h-4 w-full bg-gray-100 rounded mb-2 animate-pulse" />
                <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
