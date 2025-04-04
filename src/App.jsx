import Header from './components/Header'
import Home from './pages/Home'
import './App.css'
import Welcome from './components/Welcome'
import Gallery from './components/Gallery'
import MobileBottomHeader from './components/MobileBottomHeder'
import Footer from './pages/Footer'
function App () {
  return (
    <>
      <Header />
      <Home />
      <Welcome />
      <Gallery />
      <Footer />
      <MobileBottomHeader />
    </>
  )
}

export default App
