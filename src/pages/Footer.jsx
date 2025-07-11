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
    <footer className='bg-[#0369A1] text-white md:py-10 pb-20 pt-10'>
      <div className='container mx-auto px-6 grid md:grid-cols-3 gap-8'>
        {/* Left Section */}
        <div>
          <h2 className='text-xl font-semibold'>Max Public School Mohanpur</h2>
          <div className='flex space-x-4 mt-4'>
            <a
              href='#'
              aria-label='Facebook'
              className='text-gray-300 hover:text-white text-xl'
            >
              <FaFacebookF />
            </a>
            <a
              href='#'
              aria-label='Instagram'
              className='text-gray-300 hover:text-white text-xl'
            >
              <FaInstagram />
            </a>
            <a
              href='#'
              aria-label='Twitter'
              className='text-gray-300 hover:text-white text-xl'
            >
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Center Section */}
        <div>
          <h2 className='text-xl font-semibold'>Quick Links</h2>
          <ul className='mt-4 space-y-2'>
            {[
              { id: 1, name: 'Home', go: '/' },
              { id: 2, name: 'The School', go: '#the_school' },
              { id: 3, name: 'Admission', go: '#contact' },
              { id: 4, name: 'Result', go: '/' },
              { id: 5, name: 'Holiday list', go: '/' },
              { id: 6, name: 'Notice', go: 'notification' },
              { id: 7, name: 'Members', go: 'teachers' },
              { id: 8, name: 'Contact', go: '#contact' }
            ].map(({ id, name, go }) => (
              <li key={id}>
                <a
                  href={go}
                  className='text-gray-300 hover:text-white transition duration-300'
                >
                  {name}
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
              <FaPhoneAlt className='text-[#ffffff]' aria-hidden='true' />
              <span>+91-6206293108</span>
            </p>
            <p className='flex items-center space-x-3'>
              <FaEnvelope className='text-[#ffffff]' aria-hidden='true' />
              <span>schoolmaxpublic@gmail.com</span>
            </p>
            <p className='flex items-center space-x-3'>
              <FaMapMarkerAlt className='text-[#ffffff]' aria-hidden='true' />
              <span>Purnia, Bihar - 853204</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='border-t border-gray-300 mt-10 pt-6 text-center px-5 text-gray-200'>
        <p>
          Copyright © Max Public School Mohanpur Bazar 2025. All rights
          reserved.
        </p>
        <p className='mt-2 text-sm'>
          Design & Developed by{' '}
          <a
            href='https://myportfolio-swart-ten.vercel.app/'
            target='_blank'
            className='border-b border-gray-200  text-white'
          >
            Prashant Kumar
          </a>{' '}
        </p>
      </div>

      {/* Floating Buttons */}
      <div className='fixed bottom-20 md:bottom-5 right-4 flex space-x-3 z-50 '>
        <a
          href='https://wa.me/6283552938'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='WhatsApp'
          className='bg-green-500 p-3 rounded-full text-white text-xl shadow-lg hover:bg-green-600 transition animate-pulse'
        >
          <FaWhatsapp />
        </a>
        <a
          href='tel:+916206293108'
          aria-label='Phone'
          className='bg-blue-500 p-3 rounded-full text-white text-xl shadow-lg hover:bg-blue-600 transition animate-pulse'
        >
          <FaPhoneAlt />
        </a>
        <a
          ref={topRef}
          onClick={scrollToTop}
          aria-label='Arrow Up'
          className='bg-[#0f5e8b] p-3 rounded-full text-white text-xl shadow-lg hover:bg-[#3285b5] transition'
        >
          <FaArrowUp />
        </a>
      </div>
    </footer>
  )
}

export default Footer
