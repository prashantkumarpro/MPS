import React from 'react'
import { Link } from 'react-router'

const HomeText = () => {
  return (
    <div className='max-w-3xl text-left'>
      <h3 className='text-left mt-4 md:mt-20 text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary-blue via-accent-purple to-secondary-blue animate-gradient mb-2'>
        MPS, Mohanpur – A place where little minds grow big dreams!
      </h3>
      <p className='text-lg text-dark-text-gray mb-6'>
        Empowering students with knowledge, values, and vision to achieve
        greatness.
      </p>
      <div className='flex items-start justify-start gap-4'>
        <a
          href='tel:+916206293108'
          className='bg-accent-purple hover:bg-purple-600 text-white font-medium px-6 py-3 rounded-lg shadow transition duration-200'
        >
          Join Us
        </a>
        <a href='#the_school' className='border border-accent-purple text-accent-purple hover:bg-accent-purple hover:text-white font-medium px-6 py-3 rounded-lg transition duration-200'>
          Learn More
        </a>
      </div>
    </div>
  )
}

export default HomeText
