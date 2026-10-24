import { useState } from 'react'
import { AboutMaker } from './components/AboutMaker'
import { BrandIntro } from './components/BrandIntro'
import { CollectionGrid } from './components/CollectionGrid'
import { CraftGallery } from './components/CraftGallery'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Newsletter } from './components/Newsletter'
import { PetiteManifesto } from './components/PetiteManifesto'
import { ProductDialog } from './components/ProductDialog'
import { UpcyclingStory } from './components/UpcyclingStory'
import { editorialPieces, type EditorialPiece } from './content/products'
import './App.css'

function App() {
  const [selectedPiece, setSelectedPiece] = useState<EditorialPiece | null>(null)

  return (
    <>
      <a className="skip-link" href="#main-content">Hoppa till innehållet</a>
      <Header />
      <main id="main-content">
        <Hero />
        <BrandIntro />
        <section aria-label="Ateljéns tre sammanhängande uttryck" className="collections-shell">
          <CollectionGrid onExplore={setSelectedPiece} pieces={editorialPieces} />
        </section>
        <UpcyclingStory />
        <PetiteManifesto />
        <CraftGallery />
        <AboutMaker />
        <Newsletter />
      </main>
      <Footer />
      <ProductDialog onClose={() => setSelectedPiece(null)} piece={selectedPiece} />
    </>
  )
}

export default App
