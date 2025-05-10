import React from 'react'
import profiles from '../data/profiles'
import TeacherCard from './TeacherCard'

const Profile = () => {
  return (
    <div className='min-h-screen bg-gray-100 px-6 py-8 mt-36'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-6 max-w-7xl mx-auto'>
        {profiles.map(profile => (
          <TeacherCard key={profile.id} {...profile} />
        ))}
      </div>
    </div>
  )
}

export default Profile
