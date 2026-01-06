import React, { useState } from 'react'
import { Link } from 'react-router'
import ShareButton from './ShareButton'

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeItem, setActiveItem] = useState('/')

  const handleNavClick = path => {
    setActiveItem(path)

    if (window.innerWidth < 1024) {
      setIsOpen(false)
    }
  }

  return (
    <>
      <nav className='font-able font-normal leading-[100%] uppercase lg:w-full py-2 px-2 flex items-center justify-center'>
        <button
          className='hidden  md:block lg:hidden text-dark-text-gray font-extrabold leading-tight text-4xl'
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
        <button
          className={`absolute top-5 right-8 z-10 text-dark-text-gray font-extrabold leading-tight text-3xl border-2 px-3 border-primary-blue ${
            isOpen ? 'block' : 'hidden'
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          ✕
        </button>

        <ul
          className={`h-screen lg:h-auto flex flex-col lg:flex-row items-start py-5 gap-4 text-[#393E46] font-normal text-lg absolute lg:static bg-light-gray lg:bg-transparent lg:w-auto top-0 right-0 lg:top-16 lg:py-0 ${
            isOpen ? 'block w-80 px-5 transition-all' : 'hidden lg:flex'
          }`}
        >
          <li onClick={() => handleNavClick('/')}>
            <Link
              to='/'
              className={`hover:text-blue-700 ${
                activeItem === '/' ? 'border-b-4 border-blue-500 pb-2' : ''
              }`}
            >
              Home
            </Link>
          </li>
          <li onClick={() => handleNavClick('#the_school')}>
            <a
              href='#the_school'
              className={`hover:text-blue-700 ${
                activeItem === '#the_school'
                  ? 'border-b-4 border-blue-500 pb-2'
                  : ''
              }`}
            >
              The School
            </a>
          </li>
          <li onClick={() => handleNavClick('#contact-button')}>
            <a
              href='#contact'
              className={`hover:text-blue-700 ${
                activeItem === '#contact-button'
                  ? 'border-b-4 border-blue-500 pb-2'
                  : ''
              }`}
            >
              Admission
            </a>
          </li>
          {/* <li>
            <a
              href='#result'
              onClick={() => setActiveItem('#result')}
              className={`hover:text-blue-700 ${
                activeItem === '#result' ? 'border-b-4 border-blue-500 pb-2' : ''
              }`}
            >
              Result
            </a>
          </li> */}
          <li onClick={() => handleNavClick('notification')}>
            <Link
              to='/notification'
              className={`hover:text-blue-700 ${
                activeItem === 'notification'
                  ? 'border-b-4 border-blue-500 pb-2'
                  : ''
              }`}
            >
              Notice
            </Link>
          </li>
          <li onClick={() => handleNavClick('allgallery')}>
            <Link
              to='/allgallery'
              className={`hover:text-blue-700 ${
                activeItem === 'allgallery'
                  ? 'border-b-4 border-blue-500 pb-2'
                  : ''
              }`}
            >
              Gallery
            </Link>
          </li>
          <li onClick={() => handleNavClick('teachers')}>
            <Link
              to='/teachers'
              className={`hover:text-blue-700 ${
                activeItem === 'teachers'
                  ? 'border-b-4 border-blue-500 pb-2'
                  : ''
              }`}
            >
              Members
            </Link>
          </li>
          <li
            onClick={() => handleNavClick('#contact')}
            className='flex items-start gap-2'
          >
            <span>
              {' '}
              <i className='fa-solid fa-phone text-blue-600'></i>
            </span>
            <a
              href='tel:+916206293108'
              className='hover:text-blue-700 text-[16px] no-underline font-medium'
            >
              +91-6283552938
            </a>
          </li>
          <li>
            <ShareButton />
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Nav
