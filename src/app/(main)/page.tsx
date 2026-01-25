import {
  HeroSlider,
  CategoriesSection,
  FeaturedProducts,
  AboutSection,
  StatsSection,
  CtaSection,
} from '@/components/home'
import { getSliders, getCategories, getProducts } from '@/lib/supabase/database'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function HomePage() {
  // Fetch data from Supabase
  const [sliders, categories, products] = await Promise.all([
    getSliders(true).catch(() => []),
    getCategories(true).catch(() => []),
    getProducts().catch(() => []),
  ])

  const featuredProducts = products.filter((p) => p.is_featured)
  const popularProducts = products.filter((p) => p.is_popular)

  return (
    <>
      {/* Hero Slider */}
      <HeroSlider slides={sliders} />

      {/* Categories */}
      <CategoriesSection categories={categories} />

      {/* Featured Products */}
      <FeaturedProducts
        products={featuredProducts}
        title="Öne Çıkan Ürünler"
        subtitle="Yeni sezon ürünlerimiz"
      />

      {/* Stats Section */}
      <StatsSection />

      {/* About Section */}
      <AboutSection />

      {/* Popular Products */}
      {popularProducts.length > 0 && (
        <div className="bg-gray-50">
          <FeaturedProducts
            products={popularProducts}
            title="Popüler Ürünler"
            subtitle="En çok tercih edilenler"
          />
        </div>
      )}

      {/* CTA Section */}
      <CtaSection />
    </>
  )
}
