import React from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import library from '../assets/LIBRARY.jpg'
import MR from '../assets/MR.jpeg'
import OFFICE from '../assets/OFFICE.jpg'
import Playground from '../assets/Playground.jpeg'
import T1 from '../assets/T1.jpeg'
import T2 from '../assets/T2.jpeg'
import T3 from '../assets/T3.jpeg'
import T4 from '../assets/T4.jpeg'
import T5 from '../assets/T5.jpeg'
import T6 from '../assets/T6.jpeg'
import ClassFront from '../assets/ClassFront.jpg'
import Slider from 'react-slick'
import '../styles/Slider.css'
import WhatsappBtn from './WhatsappBtn'

const CustomPrevArrow = ({ onClick }) => (
  <div className='custom-arrow custom-prev' onClick={onClick}>
    &#10094; {/* Left arrow icon */}
  </div>
)

const CustomNextArrow = ({ onClick }) => (
  <div className='custom-arrow custom-next' onClick={onClick}>
    &#10095; {/* Right arrow icon */}
  </div>
)

const Gallery = () => {
  const images = [
    library,
    MR,
    OFFICE,
    T1,
    T2,
    T3,
    T4,
    T5,
    T6,
    Playground,
    ClassFront
  ]

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    prevArrow: <CustomPrevArrow />, // Use custom previous arrow
    nextArrow: <CustomNextArrow />, // Use custom next arrow
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  }

  return (
    <section className='py-16 px-4'>
      <h2 className='text-3xl font-bold text-center text-gray-800 mb-8'>
        Gallery
      </h2>
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index} className='px-2'>
            <div className='overflow-hidden h-80 rounded-lg shadow-lg '>
              <img
                src={src}
                alt={`Gallery Image ${index + 1}`}
                className='w-full h-full object-cover  rounded-lg transform transition duration-300 ease-in-out hover:scale-105'
              />
            </div>
          </div>
        ))}
      </Slider>

      <WhatsappBtn />
    </section>
  )
}

export default Gallery
