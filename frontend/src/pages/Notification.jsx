import React, { useEffect, useState } from 'react'
import { fetchNotices } from '../api'
import MarqueeDownload from '../components/MarqueeDownload '
import ResultBannerLive from '../components/ResultBannerLive'
import ClassResultLiveBanner from '../components/ClassResultLiveBanner'
import ImagePreviewModal from '../components/ImagePreviewModal'

const Notification = () => {
  const [notices, setNotices] = useState([])
  const [previewImage, setPreviewImage] = useState(null)
  const API_BASE = import.meta.env.VITE_API_URL

  useEffect(() => {
    const loadNotices = async () => {
      try {
        const data = await fetchNotices()
        console.log(data)
        setNotices(data)
      } catch (error) {
        console.log('Error:', error)
      }
    }

    loadNotices()
  }, [])

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      {/* 🔥 Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-800'>📢 Notice Board</h1>
        <p className='text-gray-500 text-sm mt-1'>
          Stay updated with latest school announcements
        </p>
      </div>
      <div className='space-y-6 mb-12'>
        {notices.map((notice, index) => (
          <div
            key={notice._id}
            className='bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100'
          >
            {/* 🔥 Header */}
            <div className='flex justify-between items-start'>
              <div className='flex items-center gap-2'>
                {/* 📌 IMPORTANT BADGE */}
                {notice.isImportant && (
                  <span className='bg-red-500 text-white text-xs px-2 py-1 rounded-md'>
                    📌 Important
                  </span>
                )}

                <h2 className='text-lg font-semibold text-gray-800'>
                  {notice.title}
                </h2>
              </div>

              {/* 🎯 Latest Badge */}
              {index === 0 && (
                <span className='bg-green-100 text-green-600 text-xs px-2 py-1 rounded-md'>
                  New
                </span>
              )}
            </div>

            {/* Content */}
            <p className='text-gray-600 mt-2 leading-relaxed'>
              {notice.content}
            </p>

            {/* ✅ FILES */}
            {notice.files?.length > 0 && (
              <div className='mt-4 border-t pt-3'>
                <p className='text-sm font-medium text-gray-700 mb-3'>
                  📎 Attachments:
                </p>

                {/* 🔥 IMAGE SLIDER */}
                <div className='flex gap-3 overflow-x-auto pb-2 scrollbar-hide'>
                  {notice.files
                    .filter(file => file.url.match(/\.(jpg|jpeg|png|webp)$/i))
                    .map((file, index) => (
                      <div
                        key={index}
                        onClick={() => setPreviewImage(file.url)}
                        className='min-w-[140px] h-28 rounded-lg overflow-hidden border cursor-pointer flex-shrink-0'
                      >
                        <img
                          src={file.url}
                          alt='notice'
                          loading='lazy'
                          className='w-full h-full object-cover hover:scale-110 transition'
                        />
                      </div>
                    ))}
                </div>

                {/* 🔥 PDF FILES */}
                <div className='mt-3 flex flex-wrap gap-2'>
                  {notice.files
                    .filter(file => file.url.endsWith('.pdf'))
                    .map((file, index) => (
                      <a
                        key={index}
                        href={file.url}
                        target='_blank'
                        rel='noreferrer'
                        className='text-sm bg-gray-100 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-100'
                      >
                        📄 File {index + 1}
                      </a>
                    ))}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className='mt-4 text-xs text-gray-400'>
              By: {notice.createdBy?.name || 'Admin'}
            </div>
          </div>
        ))}
      </div>
      <ImagePreviewModal
        image={previewImage}
        onClose={() => setPreviewImage(null)}
      />

      {/* 🔥 Extra Sections */}
      <div className='flex flex-col gap-10'>
        <ClassResultLiveBanner />
        <ResultBannerLive />
        <MarqueeDownload />
      </div>
    </div>
  )
}

export default Notification
