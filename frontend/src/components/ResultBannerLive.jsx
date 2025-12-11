import { useState, useEffect } from 'react'
import { Link } from 'react-router'

export default function ResultBannerLive () {
  const [show, setShow] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)


  // Scroll-hide effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) setShow(false)
      else setShow(true)
      setLastScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])



  return (
    <section
      className={`w-full bg-gradient-to-r from-primary-blue via-secondary-blue to-accent-purple
        text-white font-montserrat shadow-md sticky top-20 z-50 transition-transform duration-500
        ${show ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className='max-w-6xl mx-auto py-6 px-4 flex flex-col md:flex-row items-center justify-between'>
        {/* Left: Title */}
        <div className='text-center md:text-left mb-4 md:mb-0'>
          <h1 className='text-2xl md:text-3xl font-bold tracking-wide'>
            📢 2nd Term Exam Result 2025-26
          </h1>
          <p className='text-sm md:text-base opacity-90 mt-1'>
            Results are now live! Click below to check your report card.
          </p>
        </div>

        {/* Right: Button */}
        <div className='flex flex-col items-center md:items-end'>
          <Link
           to='/check-result'
            className='bg-green-400 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-transform hover:scale-105'
          >
            ✅ Check Result Now
          </Link>
          <span className='text-xs mt-2 italic opacity-90'>
            Available for all students
          </span>
        </div>
      </div>
    </section>
  )
}
