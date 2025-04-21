import Header from './components/Header'
import Home from './pages/Home'
import './App.css'
import Welcome from './components/Welcome'
import Gallery from './components/Gallery'
import MobileBottomHeader from './components/MobileBottomHeder'
import Footer from './pages/Footer'
import MarqueeDownload from './components/MarqueeDownload '
import ContactSection from './components/ContactSection'
function App () {
  return (
    <div className='scroll-smooth'>
      <Header />
      <MarqueeDownload />
      <Home />
      <Welcome />
      <Gallery />
      <ContactSection />
      <Footer />
      <MobileBottomHeader />
    </div>
  )
}

export default App
