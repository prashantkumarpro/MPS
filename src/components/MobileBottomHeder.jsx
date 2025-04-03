import React, { useState } from 'react'
// import '../styles/MobileBottomHeader.css'
// import Social from './Social';
import logo from '../assets/logo.png'

const MobileBottomHeader = () => {
  const [isMenu, setIsMenu] = useState(false)

  const handleMenu = () => {
    if (isMenu) {
      setIsMenu(false)
      const sideNav = document.querySelector('.sideNav')
      sideNav.classList.remove('open')
    } else {
      setIsMenu(true)
      const sideNav = document.querySelector('.sideNav')
      sideNav.classList.add('open')
    }
  }
  return (
    <>
      <div className='w-full flex items-center justify-between px-8 gap-5 fixed bottom-0 left-0 z-50 shadow-md bg-white '>
        
        <div className='flex items-center flex-col gap-1'>
          <div className='text-xl text-[#0369A1]'>
            {' '}
            <i className='fa-solid fa-user-plus'></i>
          </div>
          <p>Phone</p>
        </div>
        <div className='flex items-center flex-col'>
          <img src={`${logo}`} className='size-10' alt='MPS logo' />
          Home
        </div>
        <div className='flex items-center flex-col gap-1'>
          <div className='text-xl text-[#0369A1]'>
            {' '}
            <i className='fa-solid fa-user-plus'></i>
          </div>
          <p>WhatsApp</p>
        </div>
      </div>

      
    </>
  )
}

export default MobileBottomHeader
