import { useState } from 'react'
import { CartPanel } from './components/CartPanel'
import { CheckoutView } from './components/CheckoutView'
import { ConfirmationView } from './components/ConfirmationView'
import { AboutMaker } from './components/AboutMaker'
import { BrandIntro } from './components/BrandIntro'
import { CollectionGrid } from './components/CollectionGrid'
import { CraftGallery } from './components/CraftGallery'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Newsletter } from './components/Newsletter'
import { ProductDialog } from './components/ProductDialog'
import { ShopSection } from './components/ShopSection'
import { SignatureBead } from './components/SignatureBead'
import { SiteThread } from './components/SiteThread'
import { editorialPieces, type EditorialPiece } from './content/products'
import { useCopy } from './i18n/LanguageContext'
import { useRoute } from './routing/useRoute'
import './App.css'

function App() {
  const { copy } = useCopy()
  const [selectedPiece, setSelectedPiece] = useState<EditorialPiece | null>(null)
  const route = useRoute()

  // The checkout and the confirmation replace the page; every other hash is an anchor on the normal page.
  if (route === 'checkout') return <CheckoutView />
  if (route === 'confirmation') return <ConfirmationView />

  return (
    <>
      <a className="skip-link" href="#main-content">{copy.skipLink}</a>
      <div className="site-shell">
        <SiteThread />
        <Header />
        <main id="main-content">
          <Hero />
          <BrandIntro />
          <section aria-label={copy.collectionsLabel} className="collections-shell">
            <CollectionGrid onExplore={setSelectedPiece} pieces={editorialPieces} />
          </section>
          <ShopSection />
          <SignatureBead />
          <CraftGallery />
          <AboutMaker />
          <Newsletter />
        </main>
        <Footer />
      </div>
      <CartPanel />
      <ProductDialog onClose={() => setSelectedPiece(null)} piece={selectedPiece} />
    </>
  )
}

export default App
