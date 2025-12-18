import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function ClassResultLiveBanner () {
  const [show, setShow] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // 🔁 Scroll hide / show logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShow(false) // scrolling down → hide
      } else {
        setShow(true) // scrolling up → show
      }
      setLastScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <section
      className={`w-full sticky top-20 z-20 mb-6
        bg-gradient-to-r from-primary-blue via-secondary-blue to-accent-purple
        text-white shadow-md transition-transform duration-500
        ${show ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="max-w-6xl mx-auto py-5 px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* 🔹 Left Content */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
            📢 2ND Term Class-wise Student Results are LIVE
          </h1>
          <p className="text-sm md:text-base opacity-90 mt-1">
            Select your class to view students’ performance and report cards.
          </p>
        </div>

        {/* 🔹 Right CTA */}
        <div className="flex flex-col items-center md:items-end">
          <Link
            to="/class-result"
            className="bg-green-400 hover:bg-green-500
              text-white font-semibold px-6 py-3 rounded-lg
              shadow-lg transition-transform hover:scale-105"
          >
            📊 View Class Results
          </Link>

          <span className="text-xs mt-2 italic opacity-90 text-center md:text-right">
            Available for NURSERY, PG, UKGA, UKGB, Class I – VI
          </span>
        </div>
      </div>
    </section>
  )
}
