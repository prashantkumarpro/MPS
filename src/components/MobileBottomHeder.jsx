import logo from '../assets/logo.png'
import { RiHome3Fill, RiHome3Line } from 'react-icons/ri'
import { PiPhoneDuotone, PiPhoneFill } from 'react-icons/pi'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { IoNotifications } from 'react-icons/io5'
import { GiTeacher } from 'react-icons/gi'
import { LiaChalkboardTeacherSolid } from 'react-icons/lia'
import { TfiGallery } from 'react-icons/tfi'
import { GrGallery } from 'react-icons/gr'
import { useState } from 'react'

const MobileBottomHeader = () => {
  const [activeTab, setActiveTab] = useState('home')
  return (
    <>
      <div className='w-full flex md:hidden items-center justify-between px-4 py-2 fixed bottom-0 left-0 z-50 shadow-lg bg-white'>
        {/* Home */}
        <a
          href='#home'
          onClick={() => setActiveTab('home')}
          className='flex items-center flex-col gap-0'
        >
          <div className='text-2xl text-[#0369A1]'>
            {activeTab === 'home' ? <RiHome3Fill /> : <RiHome3Line />}
          </div>
          <p className='text-[8px] text-gray-700'>Home</p>
        </a>

        {/* Teachers */}
        <a
          href='#contact'
          onClick={() => setActiveTab('teachers')}
          className='flex items-center flex-col gap-0'
        >
          <div className='text-2xl text-[#0369A1]'>
            {activeTab === 'teachers' ? (
              <GiTeacher />
            ) : (
              <LiaChalkboardTeacherSolid />
            )}
          </div>
          <p className='text-[8px] text-gray-700'>Teachers</p>
        </a>

        {/* Notice */}
        <a
          href='#notice'
          onClick={() => setActiveTab('notice')}
          className='flex items-center flex-col'
        >
          <div className='text-2xl text-[#0369A1]'>
            {activeTab === 'notice' ? (
              <IoNotifications />
            ) : (
              <IoMdNotificationsOutline />
            )}
          </div>
          <p className='text-[8px] text-gray-700'>Notice</p>
        </a>

        {/* Gellary */}
        <a
          href='#gallery'
          onClick={() => setActiveTab('gallery')}
          className='flex items-center flex-col gap-0'
        >
          <div className='text-2xl text-[#0369A1]'>
            {activeTab === 'gallery' ? <GrGallery /> : <TfiGallery />}
          </div>
          <p className='text-[8px] text-gray-700'>Gellary</p>
        </a>
      </div>
    </>
  )
}

export default MobileBottomHeader
