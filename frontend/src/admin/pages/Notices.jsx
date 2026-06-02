import { useEffect, useState } from 'react'
import { deleteNotice, fetchNotices, updateNotice } from '../../api'
import FilePreviewModal from '../../components/FilePreviewModal'

const Notices = () => {
  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  // 🔥 CREATE STATE
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [files, setFiles] = useState([])
  const [isImportant, setIsImportant] = useState(false)
  const [previewFile, setPreviewFile] = useState(null)

  // 🔥 EDIT STATE
  const [editId, setEditId] = useState(null)
  const [editData, setEditData] = useState({
    title: '',
    content: '',
    isImportant: false
  })

  const API_BASE = import.meta.env.VITE_API_URL

  // 🔁 LOAD DATA
  const loadData = async () => {
    try {
      setLoading(true)
      const data = await fetchNotices()
      setNotices(data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleSubmit = e => {
    e.preventDefault()

    const token = localStorage.getItem('token')

    if (!token) {
      alert('User not logged in')
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    formData.append('isImportant', isImportant)

    for (let file of files) {
      formData.append('files', file)
    }

    const xhr = new XMLHttpRequest()

    xhr.open('POST', `${API_BASE}/api/notices`)
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    setIsUploading(true)

    // 🔥 TRACK PROGRESS
    xhr.upload.onprogress = e => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100)
        setUploadProgress(percent)
      }
    }

    // ✅ SUCCESS
    xhr.onload = () => {
      setIsUploading(false)

      if (xhr.status === 201) {
        setUploadProgress(0)

        // reset form
        setTitle('')
        setContent('')
        setFiles([])
        setIsImportant(false)

        loadData()
      } else {
        const data = JSON.parse(xhr.responseText)
        alert(data.message || 'Upload failed')
      }
    }

    // ❌ ERROR
    xhr.onerror = () => {
      setIsUploading(false)
      alert('Upload failed')
    }

    xhr.send(formData)
  }

  return (
    <div className='space-y-4 md:space-y-6'>
      {/* 🔥 CREATE NOTICE FORM */}
      <div className='bg-white p-6 rounded-2xl shadow border'>
        <h2 className='text-xl font-semibold mb-4'>➕ Create Notice</h2>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <input
            type='text'
            placeholder='Title'
            value={title}
            onChange={e => setTitle(e.target.value)}
            className='w-full border p-2 rounded-lg'
            required
          />

          <textarea
            placeholder='Content'
            value={content}
            onChange={e => setContent(e.target.value)}
            className='w-full border p-2 rounded-lg'
            rows={3}
            required
          />

          <input
            type='file'
            multiple
            onChange={e => setFiles([...e.target.files])}
          />

          <label className='flex items-center gap-2'>
            <input
              type='checkbox'
              checked={isImportant}
              onChange={e => setIsImportant(e.target.checked)}
            />
            Mark as Important 📌
          </label>

          <button
            disabled={isUploading}
            className='bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50'
          >
            {isUploading ? 'Uploading...' : 'Upload Notice'}
          </button>
        </form>
      </div>
      {isUploading && (
        <div className='mt-3'>
          <p className='text-sm text-gray-600 mb-1'>
            Uploading... {uploadProgress}%
          </p>

          <div className='w-full bg-gray-200 rounded h-2'>
            <div
              className='bg-blue-500 h-2 rounded transition-all'
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* 🔥 NOTICE LIST */}
      <div>
        <h1 className='text-2xl font-bold mb-4'>📢 All Notices</h1>

        {loading ? (
          <p className='text-center text-gray-500'>Loading notices...</p>
        ) : notices.length === 0 ? (
          <p className='text-center text-gray-400'>No notices available</p>
        ) : (
          <div className='space-y-5'>
            {notices.map((notice, index) => (
              <div
                key={notice._id}
                className={`p-5 rounded-2xl shadow border ${
                  notice.isImportant ? 'bg-red-50 border-red-200' : 'bg-white'
                }`}
              >
                {/* Header */}
                <div className='flex justify-between'>
                  <div className='flex items-center gap-2'>
                    {notice.isImportant && (
                      <span className='bg-red-500 text-white text-xs px-2 py-1 rounded'>
                        📌 Important
                      </span>
                    )}

                    {editId === notice._id ? (
                      <input
                        value={editData.title}
                        onChange={e =>
                          setEditData({ ...editData, title: e.target.value })
                        }
                        className='border p-1 rounded'
                      />
                    ) : (
                      <h2 className='text-lg font-semibold'>{notice.title}</h2>
                    )}
                  </div>

                  {index === 0 && (
                    <span className='bg-green-100 text-green-600 text-xs px-2 py-1 rounded'>
                      New
                    </span>
                  )}
                </div>

                {/* Content */}
                {editId === notice._id ? (
                  <textarea
                    value={editData.content}
                    onChange={e =>
                      setEditData({ ...editData, content: e.target.value })
                    }
                    className='border p-2 w-full rounded mt-2'
                  />
                ) : (
                  <p className='text-gray-600 mt-2'>{notice.content}</p>
                )}

                {/* Important toggle */}
                {editId === notice._id && (
                  <label className='flex items-center gap-2 mt-2'>
                    <input
                      type='checkbox'
                      checked={editData.isImportant}
                      onChange={e =>
                        setEditData({
                          ...editData,
                          isImportant: e.target.checked
                        })
                      }
                    />
                    Important 📌
                  </label>
                )}

                {/* ✅ FILES */}
                {notice.files?.length > 0 && (
                  <div className='mt-4 border-t pt-3'>
                    <p className='text-sm font-medium text-gray-700 mb-3'>
                      📎 Attachments:
                    </p>

                    {/* 🔥 IMAGE SLIDER */}
                    <div className='flex gap-3 overflow-x-auto pb-2 scrollbar-hide'>
                      {notice.files
                        .filter(
                          file =>
                            file.type?.startsWith('image') ||
                            file.url.match(/\.(jpg|jpeg|png|webp)$/i)
                        )
                        .map((file, index) => (
                          <div
                            key={index}
                            onClick={() => setPreviewFile(file.url)}
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
                    .filter(
                      file =>
                        file.type === 'application/pdf' ||
                        file.url.endsWith('.pdf')
                    )
                    .map((file, index) => (
                      <div
                        key={index}
                        onClick={() => setPreviewFile(file.url)} // 🔥 open modal
                        className='text-sm bg-gray-100 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-100 cursor-pointer'
                      >
                        📄 File {index + 1}
                      </div>
                    ))}
                </div>
                  </div>
                )}

                {/* Footer */}
                <div className='flex justify-between items-center mt-3 text-sm text-gray-400'>
                  <span>By: {notice.createdBy?.name}</span>

                  <div className='flex gap-3'>
                    {editId === notice._id ? (
                      <>
                        <button
                          onClick={async () => {
                            try {
                              await updateNotice(notice._id, editData)

                              setEditId(null)
                              loadData()
                            } catch (error) {
                              alert(error.message)
                            }
                          }}
                          className='text-green-600'
                        >
                          💾 Save
                        </button>

                        <button onClick={() => setEditId(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={async () => {
                            try {
                              await deleteNotice(notice._id)

                              setNotices(prev =>
                                prev.filter(n => n._id !== notice._id)
                              )
                            } catch (error) {
                              alert(error.message)
                            }
                          }}
                          className='text-red-500'
                        >
                          🗑 Delete
                        </button>

                        <button
                          onClick={() => {
                            setEditId(notice._id)
                            setEditData({
                              title: notice.title,
                              content: notice.content,
                              isImportant: notice.isImportant
                            })
                          }}
                          className='text-blue-500'
                        >
                          ✏️ Edit
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <FilePreviewModal
                  file={previewFile}
                  onClose={() => setPreviewFile(null)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Notices
