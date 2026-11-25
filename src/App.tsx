import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'sonner'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
import NousServices from './components/NousServices'
import ServiceElectrique from './components/serviceElectrique'
import ServiceCivil from './components/serviceCivil'
import './App.css'
import Recrutement from './components/Recrutement'
import Contact from './components/Contact'

function App() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'Accueil',
      '/services': 'Nos services',
      '/services/electrique': 'Génie électrique',
      '/services/civil': 'Génie civil',
      '/recrutement': 'Recrutement',
      '/contact': 'Contact',
    }
    document.title = `${titles[pathname] ?? 'Accueil'} | H&A Ingénieure`
  }, [pathname])

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start', behavior: 'instant' })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [pathname, hash, key])

  return (
    <>
      <Navbar />
      <Toaster
        position="bottom-right"
        richColors
        closeButton
        toastOptions={{ duration: 6000, style: { fontFamily: 'inherit', fontSize: '13px' } }}
      />
      <main id="accueil">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<NousServices />} />
          <Route path="/services/electrique" element={<ServiceElectrique />} />
          <Route path="/services/civil" element={<ServiceCivil />} />
          <Route path="/recrutement" element={<Recrutement />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App

