import HomeBanner from '../components/HomeBanner'
import WelcomeText from '../components/WelcomeText'
import FeaturesSection from '../components/Feature'
import Teachers from '../components/Teachers'
import MobileBottomHeader from '../components/MobileBottomHeder'
import Footer from '../pages/Footer'
import ContactForm from '../components/Contact'
import GallerySection from '../components/GallerySection'
import CoursesAndPrograms from '../components/CoursesAndPrograms'
import { useEffect } from 'react'

const Home = () => {
  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL

    fetch(`${API_URL}/api/health`)
      .then(res => res.json())
      .then(data => console.log('Backend response:', data))
      .catch(err => console.error('Connection failed:', err))
  }, [])



  return (
    <>
      <HomeBanner />
      <WelcomeText />
      <FeaturesSection />
      <CoursesAndPrograms />
      <Teachers />
      <GallerySection />
      <ContactForm />
      <MobileBottomHeader />
      <Footer />
    </>
  )
}

export default Home
