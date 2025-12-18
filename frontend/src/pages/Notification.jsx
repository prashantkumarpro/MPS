import React from 'react'
import MarqueeDownload from '../components/MarqueeDownload '
import ResultBannerLive from '../components/ResultBannerLive'
import ClassResultLiveBanner from '../components/ClassResultLiveBanner'

const Notification = () => {
  return (
    <div>
      Notification
      <div className='flex flex-col gap-10'>
        <ClassResultLiveBanner />
        <ResultBannerLive />
        <MarqueeDownload />
      </div>
    </div>
  )
}

export default Notification
