import React from 'react'
import library from '../assets/LIBRARY.jpg'
import MR from '../assets/MR.jpeg'
import OFFICE from '../assets/OFFICE.jpg'
import Playground from '../assets/Playground.jpeg'
import Pr1 from '../assets/Pr1.jpeg'
import Pr3 from '../assets/Pr3.jpeg'
import T1 from '../assets/T1.jpeg'
import T2 from '../assets/T2.jpeg'
import T3 from '../assets/T3.jpeg'
import T4 from '../assets/T4.jpeg'
import T5 from '../assets/T5.jpeg'
import T6 from '../assets/T6.jpeg'
import ClassFront from '../assets/ClassFront.jpg'

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
    ClassFront,
    Pr3,
    Pr1
  ]

  return (
    <section className='py-16 px-4'>
      <h2 className='text-3xl font-bold text-center text-gray-800 mb-8'>
        Gallery
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {images.map((src, index) => (
          <div key={index} className='overflow-hidden md:h-80 rounded-lg shadow-lg'>
            <img
              src={src}
              alt={`Gallery Image ${index + 1}`}
              className='w-full h-full object-cover transform transition duration-300 ease-in-out hover:scale-105'
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Gallery
