import React from 'react'
import logo from '../assets/logo.png'
import Nav from './Nav'

export default function Header () {
  return (
    <div className='w-full fixed top-0 left-0 z-50 bg-white flex justify-between items-center md:flex-col  shadow-[3px_3px_10px_1px_#c1c1c1] md:shadow-none md:py-2'>
      <div className='flex items-center justify-center md:py-3'>
        <img src={logo} alt='logo' className='size-20 md:size-26' />
        <h1 className='font-bold text-2xl leading-[0.8] md:text-3xl text-sky-700'>
          MAX PUBLIC <br /> SCHOOL
        </h1>
      </div>
      <Nav />
    </div>
  )
}
