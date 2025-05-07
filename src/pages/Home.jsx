import React from 'react'
import Slider from 'react-slick'
import Welcome from '../components/Welcome'
import Gallery from '../components/Gallery'
import MobileBottomHeader from '../components/MobileBottomHeder'
import Footer from '../pages/Footer'
import OFFICE from '../assets/OFFICE.jpg'
import Playground from '../assets/Playground.jpeg'
import classFront from '../assets/ClassFront.jpg'
import Profile from '../components/Profile'
import TeacherSlider from '../components/TeacherSlider'
import FeaturesSection from '../components/Feature'
import ContactForm from '../components/Contact'

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
      {/* <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index} className='py-5 my-5'>
            <div className='w-full h-[80vh]'>
              <img
                src={src}
                alt={`Gallery Image ${index + 1}`}
                className='w-full h-full object-cover rounded-lg transform transition duration-300 ease-in-out hover:scale-105'
              />
            </div>
          </div>
        ))}
      </Slider> */}
      <Welcome />
      {/* <div className='max-w-6xl mx-auto text-center'>
        <h2 className='text-3xl md:text-4xl font-bold text-blue-900 mb-6'>
          About Us
        </h2>
        <p className='text-gray-700 text-md md:text-lg leading-relaxed'>
          Max Public School is an English Medium institution dedicated to the
          holistic development of children from Nursery to Class 8. Established
          with a vision to nurture young minds through value-based education and
          innovative teaching practices, we strive to create a joyful and safe
          learning environment.
          <br />
          <br />
          Our experienced and passionate teachers ensure each child receives
          personal attention and encouragement. We integrate modern technology
          with traditional teaching methods to empower students with knowledge,
          confidence, and skills for life.
          <br />
          <br />
          At Max Public School, education is not just about academics—it's about
          building character, fostering creativity, and preparing responsible
          citizens for tomorrow.
        </p>
      </div> */}
      <FeaturesSection />
      <ContactForm />
      <TeacherSlider />
      <Gallery />
      <MobileBottomHeader />
      <Footer />
    </>
  )
}

export default Home
