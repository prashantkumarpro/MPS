import React, { useState } from 'react'

const imageFilenames = [
  '01.webp',
  '02.webp',
  '03.webp',
  '04.webp',
  '05.webp',
  '06.webp',
  '07.webp',
  '08.webp',
  '09.webp',
  '10.webp',
  '11.webp',
  '12.webp',
  '13.webp',
  '14.webp',
  '15.webp',
  '16.webp',
  '17.webp',
  '18.webp',
  '19.webp',
  '20.webp',
  '21.webp',
  '22.webp',
  '23.webp',
  '24.webp',
  '25.webp',
  '26.webp',
  '27.webp',
  '28.webp',
  '29.webp',
  '30.webp',
  '31.webp',
  '32.webp',
  '33.webp',
  '34.webp',
  '35.webp',
  '36.webp',
  '37.webp',
  '38.webp',
  '39.webp',
  '40.webp',
  '41.webp',
  '42.webp',
  '43.webp',
  '44.webp',
  '45.webp'
]
const AllGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <div className='mt-24 md:mt-42  px-4 sm:px-6 lg:px-10'>
      {/* Fullscreen Image Viewer */}
      <h1 className='mx-auto font-alumni text-3xl md:text-4xl font-semibold text-[#44444E]  tracking-wider text-left'>
        Welcome to our Gallery
      </h1>
      {selectedImage ? (
        <div className='fixed inset-0 bg-black z-50 flex flex-col items-center justify-center'>
          <button
            onClick={() => setSelectedImage(null)}
            className='absolute top-5 left-5 px-4 py-2 bg-white text-black rounded hover:bg-gray-300 z-50'
          >
            ← Back
          </button>
          <img
            src={`/gallery/${selectedImage}`}
            loading='lazy'
            alt='Full view'
            className='w-full h-full object-contain'
          />
        </div>
      ) : (
        // Masonry-style Gallery
        <div className='container mx-auto px-2 pt-10 columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-4 mb-5'>
          {imageFilenames.map((filename, index) => (
            <div
              key={index}
              className='mb-4 break-inside-avoid overflow-hidden rounded-lg'
            >
              <img
                src={`/gallery/${filename}`}
                alt={`Gallery ${filename}`}
                loading='lazy'
                height={200}
                width={200}
                onClick={() => setSelectedImage(filename)}
                className='w-full h-auto rounded-lg grayscale hover:grayscale-0 hover:scale-125 transition-all duration-300 cursor-pointer'
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AllGallery
