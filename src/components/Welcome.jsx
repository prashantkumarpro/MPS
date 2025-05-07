import React from 'react'

const Welcome = () => {
  return (
    <div id='about' className='w-full px-4 pb-16 md:px-8 bg-background-white'>
      <section className='px-4 py-16 md:py-24 mt-12 flex flex-col-reverse md:flex-row items-start justify-between gap-12'>
        {/* Text Content */}
        <div className='max-w-3xl mx-auto text-center md:text-left'>
          <h3 className='text-center md:text-left mt-20 text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary-blue via-accent-purple to-secondary-blue animate-gradient mb-2'>
            MPS, Mohanpur – A place where little minds grow big dreams!
          </h3>
          <p className='text-lg text-dark-text-gray mb-6'>
            Empowering students with knowledge, values, and vision to achieve
            greatness.
          </p>
          <div className='flex items-center justify-center md:items-start md:justify-start gap-4'>
            <button className='bg-accent-purple hover:bg-purple-600 text-white font-medium px-6 py-3 rounded-lg shadow transition duration-200'>
              Join Us
            </button>
            <button className='border border-accent-purple text-accent-purple hover:bg-accent-purple hover:text-white font-medium px-6 py-3 rounded-lg transition duration-200'>
              Learn More
            </button>
          </div>
        </div>

        {/* Image */}
        <div className='w-full md:w-1/2'>
          <img
            src='/images/welcome3.jpg'
            alt='Smiling student'
            className='w-full max-w-md mx-auto object-contain'
          />
        </div>
      </section>

      {/* Welcome Section */}
      <section className='w-full py-12 px-4 flex flex-col md:flex-row items-center gap-10'>
        <div className='w-full text-center md:text-left'>
          <h2 className='text-3xl md:text-4xl font-bold text-primary-blue mb-4'>
            Welcome to Max Public School
          </h2>
          <h3 className='text-xl font-semibold text-secondary-blue mb-4'>
            A Home of Learning for Nursery to Class 8
          </h3>
          <p className='text-dark-text-gray text-md leading-relaxed'>
            At Max Public School, we believe every child is unique and capable
            of achieving greatness. Our nurturing environment, experienced
            faculty, and activity-based curriculum ensure a joyful and
            meaningful educational journey for students from Nursery to Class 8.
            <br />
            <br />
            Join us in shaping bright futures through creativity, values, and
            excellence in English-medium education.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Welcome
