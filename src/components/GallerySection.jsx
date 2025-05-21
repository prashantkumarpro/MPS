import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay, Pagination } from 'swiper/modules'
import '../styles/Swipper.css'
import 'swiper/css'
import 'swiper/css/navigation'
import library from '../assets/LIBRARY.jpg'
import MR from '../assets/MR.jpeg'
import OFFICE from '../assets/OFFICE.jpg'
import Playground from '../assets/Playground.jpeg'
import T1 from '../assets/T1.png'
import T2 from '../assets/T2.png'
import T3 from '../assets/T3.png'
import T4 from '../assets/T4.jpeg'
import T5 from '../assets/T5.png'
import T6 from '../assets/T6.png'
import ClassFront from '../assets/ClassFront.jpg'
import { useState } from 'react'

const GallerySection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState('')

  const openModal = img => {
    setCurrentImage(img)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentImage('')
  }

  const galleryImages = [
    T1,
    T2,
    T5,
    T3,
    MR,
    OFFICE,
    library,
    T4,
    T6,
    Playground,
    ClassFront
  ]

  return (
    <section className='w-full gallery_section bg-white py-14 px-4'>
      <div className='max-w-7xl mx-auto'>
        <div className='max-w-6xl py-2 mb-10'>
          <h2 className='text-2xl md:text-4xl  font-semibold text-gray-800'>
            Gallery
          </h2>
        </div>

        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 4000 }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
        >
          {galleryImages.map((img, index) => (
            <SwiperSlide key={index}>
              <div
                onClick={() => openModal(img)}
                className='aspect-16/9 overflow-hidden rounded-xl shadow-md hover:shadow-lg cursor-pointer transition duration-300'
              >
                <img
                  src={img}
                  alt={`Gallery image ${index + 1}`}
                  loading='lazy'
                  width='400'
                  height='400'
                  className='w-full h-64 object-cover hover:scale-105 transition-transform duration-300'
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Modal / Lightbox */}
      {isModalOpen && (
        <div
          onClick={closeModal}
          className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50'
        >
          <div className='relative max-w-4xl w-full px-4'>
            <button
              onClick={closeModal}
              className='absolute top-2 right-2 text-white text-3xl font-bold'
            >
              &times;
            </button>
            <img
              src={currentImage}
              alt='Enlarged view'
              className='w-full max-h-[80vh] object-contain rounded-lg shadow-lg'
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default GallerySection
