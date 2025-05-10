import React from 'react'
import Slider from 'react-slick'
import Welcome from '../components/Welcome'
import Gallery from '../components/Gallery'
import MobileBottomHeader from '../components/MobileBottomHeder'
import Footer from '../pages/Footer'
import OFFICE from '../assets/OFFICE.jpg'
import Playground from '../assets/Playground.jpeg'
import classFront from '../assets/ClassFront.jpg'
import FeaturesSection from '../components/Feature'
import ContactForm from '../components/Contact'
import EducatorsSection from '../components/EducatorsSection'
import Teachers from '../components/Teachers'

const Home = () => {
  const images = [classFront, OFFICE, Playground]
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  }

  return (
    <>
      <Welcome />
      <FeaturesSection />
      <Teachers />
      <Gallery />
      <ContactForm />
      <MobileBottomHeader />
      <Footer />
    </>
  )
}

export default Home
