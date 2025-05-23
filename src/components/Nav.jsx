import React, { useState } from 'react'
import { Link } from 'react-router'

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeItem, setActiveItem] = useState('/')

  return (
    <>
      <nav className='lg:w-full py-2 px-2 flex items-center justify-center'>
        <button
          className='lg:hidden text-dark-text-gray font-extrabold leading-tight text-4xl'
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
        <button
          className={`absolute top-6 right-64 z-10 text-dark-text-gray font-extrabold leading-tight text-4xl ${
            isOpen ? 'block' : 'hidden'
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          ✕
        </button>

        <ul
          className={`h-screen lg:h-auto flex flex-col lg:flex-row items-end py-10 gap-10 text-dark-text-gray font-light text-xl absolute lg:static bg-light-gray lg:bg-transparent lg:w-auto top-0 right-0 lg:top-16 lg:py-0 ${
            isOpen ? 'block w-80 px-5 transition-all' : 'hidden lg:flex'
          }`}
        >
          <li>
            <Link
              to='/'
              onClick={() => setActiveItem('/')}
              className={`hover:text-primary-blue ${
                activeItem === '/' ? 'border-b-2 border-sky-500 pb-2' : ''
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <a
              href='#the_school'
              onClick={() => setActiveItem('#the_school')}
              className={`${
                activeItem === '#the_school'
                  ? 'border-b-2 border-sky-500 pb-2'
                  : ''
              }`}
            >
              The School
            </a>
          </li>
          <li>
            <a
              href='#contact'
              onClick={() => setActiveItem('#contact-button')}
              className={`hover:text-primary-blue ${
                activeItem === '#contact-button'
                  ? 'border-b-2 border-sky-500 pb-2'
                  : ''
              }`}
            >
              Admission
            </a>
          </li>
          <li>
            <a
              href='#result'
              onClick={() => setActiveItem('#result')}
              className={`${
                activeItem === '#result' ? 'border-b-2 border-sky-500 pb-2' : ''
              }`}
            >
              Result
            </a>
          </li>
          <li>
            <Link
              to='/notification'
              onClick={() => setActiveItem('notification')}
              className={`${
                activeItem === 'notification'
                  ? 'border-b-2 border-sky-500 pb-2'
                  : ''
              }`}
            >
              Notice
            </Link>
          </li>
          <li>
            <Link
              to='/allgallery'
              onClick={() => setActiveItem('allgallery')}
              className={`${
                activeItem === 'allgallery'
                  ? 'border-b-2 border-sky-500 pb-2'
                  : ''
              }`}
            >
              Gallery
            </Link>
          </li>
          <li>
            <Link
              to='/teachers'
              onClick={() => setActiveItem('teachers')}
              className={`${
                activeItem === 'teachers'
                  ? 'border-b-2 border-sky-500 pb-2'
                  : ''
              }`}
            >
              Members
            </Link>
          </li>
          <li>
            <a
              href='#contact'
              onClick={() => setActiveItem('#contact')}
              className={`${
                activeItem === '#contact'
                  ? 'border-b-2 border-sky-500 pb-2'
                  : ''
              }`}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Nav
