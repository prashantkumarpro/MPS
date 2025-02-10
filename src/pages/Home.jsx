import React from 'react'
import schoolFront from '../assets/front.png'

const Home = () => {
  return (
    <>
      <div className='m-auto mt-32 md:mt-40 px-2 md:text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-slate-600 font-extrabold leading-tight md:px-4'>
        <h3 className='text-center md:text-left'>
        "MPS, Mohanpur – A place where little minds grow big dreams!"
        </h3>
      </div>
      <div className='py-5 my-5'>
        <div
          className='w-full min-h-[50vh] md:min-h-[75vh] lg:min-h-screen bg-cover bg-center md:bg-bottom'
          style={{ backgroundImage: `url(${schoolFront})` }}
        ></div>
      </div>
    </>
  )
}

export default Home
