import React from 'react'
import Slider from 'react-slick'
import OFFICE from '../assets/OFFICE.jpg'
import Playground from '../assets/Playground.jpeg'
import classFront from '../assets/ClassFront.jpg'
const Home = () => {
  const images = [ classFront, OFFICE, Playground]
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  
  }

  return (
    <>
      <div className='m-auto mt-36 md:mt-40 px-2 py-8 md:text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-slate-600 font-extrabold leading-tight md:px-4'>
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
    </>
  )
}

export default Home
