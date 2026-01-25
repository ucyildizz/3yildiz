import { Header, Footer } from '@/components/layout'
import { WhatsAppButton } from '@/components/common/whatsapp-button'
import { PageTransitionWrapper } from '@/components/common/page-transition-wrapper'
import { SITE_CONFIG } from '@/lib/constants'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <PageTransitionWrapper>
          {children}
        </PageTransitionWrapper>
      </main>
      <Footer />
      <WhatsAppButton
        phoneNumber={SITE_CONFIG.whatsapp}
        message="Merhaba, Üç Yıldız Metal ürünleri hakkında bilgi almak istiyorum."
      />
    </>
  )
}
