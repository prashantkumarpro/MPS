import React from 'react'
import Slider from 'react-slick'
import Welcome from '../components/Welcome'
import Gallery from '../components/Gallery'
import MobileBottomHeader from '../components/MobileBottomHeder'
import Footer from '../pages/Footer'
import MarqueeDownload from '../components/MarqueeDownload '
import ContactSection from '../components/ContactSection'
import OFFICE from '../assets/OFFICE.jpg'
import Playground from '../assets/Playground.jpeg'
import classFront from '../assets/ClassFront.jpg'
import Profile from '../components/Profile'
import TeacherSlider from '../components/TeacherSlider'

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
      <MarqueeDownload />

      <div
        id='home'
        className='m-auto  px-4 py-8 md:text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-slate-600 font-extrabold leading-tight md:px-4'
      >
        <h3 className='text-center md:text-left'>
          "MPS, Mohanpur – A place where little minds grow big dreams!"
        </h3>
      </div>
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index} className='py-5 my-5'>
            <div className='w-full  md:min-h-[100vh] lg:min-h-screen '>
              <img
                src={src}
                alt={`Gallery Image ${index + 1}`}
                className='size-full object-cover   rounded-lg transform transition duration-300 ease-in-out hover:scale-105'
              />
            </div>
          </div>
        ))}
      </Slider>
      <Welcome />
      <TeacherSlider />
      <Gallery />
      <ContactSection />
      <MobileBottomHeader />
      <Footer />
    </>
  )
}

export default Home
