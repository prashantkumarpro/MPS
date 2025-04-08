import React, { useRef } from 'react'
import '../styles/Marquee.css'
import routineImg from '../assets/Routine.jpg'
const MarqueeDownload = () => {
  const marqueeRef = useRef(null)
  const handlePause = () => {
    marqueeRef.current.style.animationPlayState = 'paused' // Pause scrolling
    console.log(marqueeRef)
  }
  const handleResume = () => {
    marqueeRef.current.style.animationPlayState = 'running' // Resume scrolling
    console.log(marqueeRef)
  }

  return (
    <div
      className='w-full flex flex-col mt-24 md:mt-48 overflow-hidden bg-gray-100 py-4'
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
      onTouchStart={handlePause}
      onTouchEnd={handleResume}
    >
      <a
        className='w-fit px-4 py-2 mx-3 rounded-lg bg-[#1A5F9F] hover:bg-[#275d8f] text-white'
        href='/routine.pdf'
        download='routine.pdf'
      >
        📄 Download Routine
      </a>
      <div
        ref={marqueeRef}
        className='w-fit marquee px-4 py-2 my-3 bg-[#1A5F9F]  hover:bg-[#275d8f] text-white rounded-lg  cursor-pointer'
      >
        <img src={routineImg} alt='routine_image' className='object-cover' />
      </div>
    </div>
  )
}

export default MarqueeDownload
