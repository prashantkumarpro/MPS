import React from 'react'

const MarqueeDownload = () => {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/routine.pdf' // Replace with your actual PDF file path
    link.download = 'routine.pdf'
    link.click()
  }

  return (
    <div className="w-full overflow-hidden bg-gray-100 py-4 group-hover:paused transition">
    <div className="flex gap-8 whitespace-nowrap group">
      <div
        className="px-4 py-2 bg-blue-500 text-white rounded-lg inline-block cursor-pointer animate-marquee"
        onClick={handleDownload}
      >
        📄 Download Routine
      </div>
    </div>
  </div>
  
  )
}

export default MarqueeDownload
