import React from 'react'

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className='bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-all duration-300 border border-gray-100'>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-gray-500 text-sm font-medium'>{title}</p>
          <h2 className='text-2xl font-bold mt-2'>{value}</h2>
        </div>

        <div
          className={`w-12 h-12 flex items-center justify-center rounded-xl ${color}`}
        >
          {icon}
        </div>
      </div>
    </div>
  )
}

export default StatCard
