import React from 'react'
import profiles from '../data/profiles'

const Profile = () => {
  return (
    <div className='min-h-screen bg-gray-100 px-6 py-8 mt-36'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-6 max-w-7xl mx-auto'>
        {profiles.map(profile => (
          <div
            key={profile.id}
            className='bg-white rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden border border-blue-800 flex flex-col items-center p-6'
          >
            <img
              src={profile.image}
              alt={profile.name}
              className='size-32 rounded-full border-4 border-blue-700 object-cover  shadow-md bg-gray-200'
            />
            <h2 className='text-gray-800 font-bold text-lg mt-4'>
              {profile.name}
            </h2>
            <p className='text-blue-300 text-sm'>{profile.role}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profile
