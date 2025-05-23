import { RiHome3Fill, RiHome3Line } from 'react-icons/ri'

import { IoMdNotificationsOutline } from 'react-icons/io'
import { IoNotifications } from 'react-icons/io5'
import { GiTeacher } from 'react-icons/gi'
import { LiaChalkboardTeacherSolid } from 'react-icons/lia'
import { TfiGallery } from 'react-icons/tfi'
import { GrGallery } from 'react-icons/gr'
import { useState } from 'react'
import { Link } from 'react-router'

const MobileBottomHeader = () => {
  const [activeTab, setActiveTab] = useState('home')
  return (
    <>
      <div className='w-full flex md:hidden items-center justify-between px-4 py-2 fixed bottom-0 left-0 z-50 shadow-lg bg-white border-t border-gray-200'>
        {/* Home */}
        <Link
          to='/'
          onClick={() => setActiveTab('home')}
          className='relative group text-sky-600 hover:text-sky-800'
        >
          <div className='text-2xl text-[#0369A1]'>
            {activeTab === 'home' ? <RiHome3Fill /> : <RiHome3Line />}
          </div>
          <span className='sr-only'>Home</span>
          <div className='absolute bottom-full mb-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition'>
            Home
          </div>
        </Link>

        {/* Teachers */}
        <Link
          to='/teachers'
          onClick={() => setActiveTab('teachers')}
          className='relative group text-sky-600 hover:text-sky-800'
        >
          <div className='text-2xl text-[#0369A1]'>
            {activeTab === 'teachers' ? (
              <GiTeacher />
            ) : (
              <LiaChalkboardTeacherSolid />
            )}
          </div>
          <span className='sr-only'>Teachers</span>
          <div className='absolute bottom-full mb-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition'>
            Teachers
          </div>
        </Link>

        {/* Notice */}
        <Link
          to='/notification'
          onClick={() => setActiveTab('notice')}
          className='relative group text-sky-600 hover:text-sky-800'
        >
          <div className='text-2xl text-[#0369A1]'>
            {activeTab === 'notice' ? (
              <IoNotifications />
            ) : (
              <IoMdNotificationsOutline />
            )}
          </div>
          <span className='sr-only'>Notice</span>
          <div className='absolute bottom-full mb-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition'>
            Notice
          </div>
        </Link>

        {/* Gellary */}
        <Link
          to='/allgallery'
          onClick={() => setActiveTab('gallery')}
          className='relative group text-sky-600 hover:text-sky-800'
        >
          <div className='text-2xl text-[#0369A1]'>
            {activeTab === 'gallery' ? <GrGallery /> : <TfiGallery />}
          </div>
          <span className='sr-only'>Gellary</span>
          <div className='absolute bottom-full mb-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition'>
            Gellary
          </div>
        </Link>
      </div>
    </>
  )
}

export default MobileBottomHeader
