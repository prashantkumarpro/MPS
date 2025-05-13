import React, { useState } from 'react'
import { Link } from 'react-router'

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)

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
          className={`h-screen lg:h-auto flex flex-col lg:flex-row items-end py-10 gap-5 text-dark-text-gray font-light text-xl absolute lg:static bg-light-gray lg:bg-transparent lg:w-auto top-0 right-0 lg:top-16 lg:py-0 ${
            isOpen ? 'block w-80 px-5 transition-all' : 'hidden lg:flex'
          }`}
        >
          <li>
            <Link to='/' className='hover:text-primary-blue'>
              Home
            </Link>
          </li>
          <li>
            <a href='#the_school' className='hover:text-primary-blue'>
              The School
            </a>
          </li>
          <li>
            <a href='#contact' className='hover:text-primary-blue'>
              Admission
            </a>
          </li>
          <li>
            <a href='#result' className='hover:text-primary-blue'>
              Result
            </a>
          </li>
          <li>
            <Link to='/notification' className='hover:text-primary-blue'>
              Notice
            </Link>
          </li>
          <li>
            <Link to='/teachers' className='hover:text-primary-blue'>
              Members
            </Link>
          </li>
          <li>
            <a href='#contact' className='hover:text-primary-blue'>
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Nav
