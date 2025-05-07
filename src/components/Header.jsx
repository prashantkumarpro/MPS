import React from 'react'
import logo from '../assets/logo.png'
import Nav from './Nav'

export default function Header () {
  return (
    <>
      <div className='w-full fixed top-0 left-0 z-50 bg-white flex justify-between whitespace-nowrap items-center shadow-[3px_3px_10px_1px_#c1c1c1] md:px-5'>
        <div className='w-full flex items-center'>
          <img src={logo} alt='logo' className='size-20' />
          <h1 className='font-bold text-2xl leading-[0.8]  text-sky-700 '>
            MAX PUBLIC <br /> SCHOOL
          </h1>
        </div>
        <Nav />
      </div>
    </>
  )
}
