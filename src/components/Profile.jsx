import React from 'react'
import p1 from '../assets/p1.png'

const Profile = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='size-24 bg-gray-200 rounded-full overflow-hidden'>
        <img src={p1} alt='profile_pic' className=' size-full' />
      </div>
    </div>
  )
}

export default Profile
