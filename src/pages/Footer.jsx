import React, { useRef } from 'react'
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowUp,
  FaWhatsapp
} from 'react-icons/fa'

const Footer = () => {
  const topRef = useRef(null)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className='bg-[#0F2C3D] text-white md:py-10 pb-20 pt-10'>
      <div className='container mx-auto px-6 grid md:grid-cols-3 gap-8'>
        {/* Left Section */}
        <div>
          <h2 className='text-xl font-semibold'>Max Public School Mohanpur</h2>
          <div className='flex space-x-4 mt-4'>
            <a href='#' className='text-gray-300 hover:text-white text-xl'>
              <FaFacebookF />
            </a>
            <a href='#' className='text-gray-300 hover:text-white text-xl'>
              <FaInstagram />
            </a>
            <a href='#' className='text-gray-300 hover:text-white text-xl'>
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Center Section */}
        <div>
          <h2 className='text-xl font-semibold'>Quick Links</h2>
          <ul className='mt-4 space-y-2'>
            {[
              'Home',
              'The School',
              'Admission',
              'Result',
              'Holiday list',
              'Notice',
              'Members',
              'Contact'
            ].map((item, index) => (
              <li key={index}>
                <a
                  href='#'
                  className='text-gray-300 hover:text-white transition duration-300'
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <h2 className='text-xl font-semibold'>Contact</h2>
          <div className='mt-4 space-y-3'>
            <p className='flex items-center space-x-3'>
              <FaPhoneAlt className='text-[#0369A1]' />
              <span>+91-6206293108</span>
            </p>
            <p className='flex items-center space-x-3'>
              <FaEnvelope className='text-[#0369A1]' />
              <span>schoolmaxpublic@gmail.com</span>
            </p>
            <p className='flex items-center space-x-3'>
              <FaMapMarkerAlt className='text-[#0369A1]' />
              <span>Purnia, Bihar - 853204</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='border-t border-gray-700 mt-10 pt-6 text-center px-5 text-gray-400'>
        <p>
          Copyright © Max Public School Mohanpur Bazar 2025. All rights
          reserved.
        </p>
      </div>

      {/* Floating Buttons */}
      <div className='fixed bottom-20 md:bottom-5 right-4 flex space-x-3 z-50'>
        <a
          href='https://wa.me/6283552938'
          target='_blank'
          rel='noopener noreferrer'
          className='bg-green-500 p-3 rounded-full text-white text-xl shadow-lg hover:bg-green-600 transition'
        >
          <FaWhatsapp />
        </a>
        <a
          href='tel:+916206293108'
          className='bg-blue-500 p-3 rounded-full text-white text-xl shadow-lg hover:bg-blue-600 transition'
        >
          <FaPhoneAlt />
        </a>
        <a
          ref={topRef}
          onClick={scrollToTop}
          className='bg-[#0f5e8b] p-3 rounded-full text-white text-xl shadow-lg hover:bg-[#3285b5] transition'
        >
          <FaArrowUp />
        </a>
      </div>
    </footer>
  )
}

export default Footer
