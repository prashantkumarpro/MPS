import React, { useEffect, useState } from 'react'
import { fetchNotices } from '../api'
import MarqueeDownload from '../components/MarqueeDownload '
import ResultBannerLive from '../components/ResultBannerLive'
import ClassResultLiveBanner from '../components/ClassResultLiveBanner'

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
        {notices.map((notice,index) => (
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

            {/* ✅ FILES SECTION */}
            {notice.files?.length > 0 && (
              <div className='mt-4 border-t pt-3'>
                <p className='text-sm font-medium text-gray-700 mb-3'>
                  📎 Attachments:
                </p>

                {/* 🔥 Grid Layout */}
                <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
                  {notice.files.map((file, index) => {
                    const fileUrl = `${API_BASE}/${file}`

                    const isImage =
                      file.endsWith('.jpg') ||
                      file.endsWith('.jpeg') ||
                      file.endsWith('.png') ||
                      file.endsWith('.webp')

                    return isImage ? (
                      <div
                        key={index}
                        className='overflow-hidden rounded-lg border cursor-pointer group'
                        onClick={() => setPreviewImage(fileUrl)}
                      >
                        <img
                          src={fileUrl}
                          alt='notice'
                          className='w-full h-28 object-cover group-hover:scale-110 transition duration-300'
                        />
                      </div>
                    ) : (
                      <a
                        key={index}
                        href={fileUrl}
                        target='_blank'
                        rel='noreferrer'
                        className='flex items-center justify-center text-sm bg-gray-100 text-blue-600 rounded-lg p-2 hover:bg-blue-100 transition'
                      >
                        📄 File {index + 1}
                      </a>
                    )
                  })}
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

      {previewImage && (
        <div
          className='fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50'
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            alt='preview'
            className='max-w-[90%] max-h-[90%] rounded-lg shadow-lg'
          />

          {/* Close Button */}
          <button
            className='absolute top-5 right-5 text-white text-3xl'
            onClick={() => setPreviewImage(null)}
          >
            ✕
          </button>
        </div>
      )}
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
