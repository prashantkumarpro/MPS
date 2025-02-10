import React, { useState } from 'react'

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <nav className='md:w-full md:bg-sky-900 py-2 px-2  flex  items-center justify-center'>
        <button
          className='md:hidden mr-5 text-slate-600 font-extrabold leading-tight md:text-white text-4xl'
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
        <button
          className={`absolute top-6 right-64 z-10 text-slate-600 font-extrabold leading-tight text-4xl ${
            isOpen ? 'block' : 'hidden'
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          ✕
        </button>

        <ul
          className={`h-screen md:h-auto flex flex-col md:flex-row items-end  py-10 gap-5 text-black md:text-white font-semibold text-xl absolute md:static bg-gray-50 md:bg-transparent  md:w-auto top-0 right-0 md:top-16   md:py-0 ${
            isOpen ? 'block w-80 px-5 transition-all' : 'hidden md:flex'
          }`}
        >
          <li>
            <a href='#' className='hover:text-gray-300'>
              Home
            </a>
          </li>
          <li>
            <a href='#' className='hover:text-gray-300'>
              The School
            </a>
          </li>
          <li>
            <a href='#' className='hover:text-gray-300'>
              Admission
            </a>
          </li>
          <li>
            <a href='#' className='hover:text-gray-300'>
              Result
            </a>
          </li>
          <li>
            <a href='#' className='hover:text-gray-300'>
              Notice
            </a>
          </li>
          <li>
            <a href='#' className='hover:text-gray-300'>
              Members
            </a>
          </li>
          <li>
            <a href='#' className='hover:text-gray-300'>
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Nav
