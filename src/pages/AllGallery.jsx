import React, { useState } from 'react'

const imageFilenames = [
  '01.png',
  '02.png',
  '03.jpg',
  '04.png',
  '05.jpg',
  '06.jpg',
  '07.png',
  '08.jpg',
  '09.jpg',
  '10.png',
  '11.png',
  '12.jpg',
  '13.jpg',
  '14.jpg',
  '15.png',
  '16.png',
  '17.png',
  '18.png',
  '19.png',
  '20.png',
  '21.jpg',
  '22.jpg',
  '23.jpeg',
  '24.jpg',
  '25.jpg',
  '26.jpeg',
  '27.jpg',
  '28.jpeg',
  '29.jpg',
  '30.jpeg',
  '31.jpeg',
  '32.png',
  '33.png',
  '34.png',
  '35.png',
  '36.png'
]
const AllGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <div className='mt-24 md:mt-42'>
      {/* Fullscreen Image Viewer */}
      <h1 className='mx-auto text-2xl md:text-4xl font-semibold md:font-bold text-dark-text-gray px-4 md:px-10'>
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
        <div className='container mx-auto px-2 pt-10 columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-4'>
          {imageFilenames.map((filename, index) => (
            <div
              key={index}
              className='mb-4 break-inside-avoid overflow-hidden rounded-lg'
            >
              <img
                src={`/gallery/${filename}`}
                alt={`Gallery ${filename}`}
                loading='lazy'
                onClick={() => setSelectedImage(filename)}
                className='w-full h-auto rounded-lg hover:opacity-90 transition cursor-pointer'
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AllGallery
