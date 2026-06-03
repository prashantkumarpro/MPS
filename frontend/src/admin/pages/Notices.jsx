import { useEffect, useState } from 'react'
import { deleteNotice, fetchNotices, updateNotice } from '../../api'
import FilePreviewModal from '../../components/FilePreviewModal'
import { Plus, Upload } from 'lucide-react'
import {
  Megaphone,
  Pin,
  Paperclip,
  User,
  Pencil,
  Trash2,
  Save,
  X,
  Image as ImageIcon,
  FileText
} from 'lucide-react'
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

      <div className='bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8'>
        {/* Header */}
        <div className='flex items-start gap-4 mb-8'>
          <div className='w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center'>
            <Plus size={24} className='text-blue-600' />
          </div>

          <div>
            <h2 className='text-2xl font-bold text-slate-800'>Create Notice</h2>

            <p className='text-slate-500 mt-1'>
              Publish announcements for students, teachers and parents.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Title */}
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Notice Title
            </label>

            <input
              type='text'
              placeholder='Enter notice title'
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              className='
          w-full
          h-12
          px-4
          rounded-xl
          border
          border-slate-300
          bg-white
          focus:outline-none
          focus:ring-4
          focus:ring-blue-100
          focus:border-blue-500
          transition-all
        '
            />
          </div>

          {/* Content */}
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Notice Content
            </label>

            <textarea
              placeholder='Write your notice here...'
              value={content}
              onChange={e => setContent(e.target.value)}
              required
              rows={5}
              className='
          w-full
          px-4
          py-3
          rounded-xl
          border
          border-slate-300
          resize-none
          focus:outline-none
          focus:ring-4
          focus:ring-blue-100
          focus:border-blue-500
          transition-all
        '
            />
          </div>

          {/* File Upload */}
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Attach Files
            </label>

            <label
              htmlFor='file-upload'
              className='
          flex
          flex-col
          items-center
          justify-center
          gap-3
          border-2
          border-dashed
          border-slate-300
          rounded-2xl
          p-8
          cursor-pointer
          hover:border-blue-500
          hover:bg-blue-50
          transition-all
        '
            >
              <Upload size={32} className='text-blue-600' />

              <div className='text-center'>
                <p className='font-medium text-slate-700'>
                  Click to upload files
                </p>

                <p className='text-sm text-slate-500'>
                  PDF, DOC, JPG, PNG (Multiple files allowed)
                </p>
              </div>

              <input
                id='file-upload'
                type='file'
                multiple
                className='hidden'
                onChange={e => setFiles([...e.target.files])}
              />
            </label>

            {files?.length > 0 && (
              <div className='mt-3 flex flex-wrap gap-2'>
                {files.map((file, index) => (
                  <span
                    key={index}
                    className='
                px-3
                py-1
                bg-blue-100
                text-blue-700
                rounded-full
                text-sm
                font-medium
              '
                  >
                    {file.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Important Toggle */}
          <label
            className='
        flex
        items-center
        gap-3
        p-4
        border
        rounded-2xl
        cursor-pointer
        hover:bg-slate-50
        transition-all
      '
          >
            <input
              type='checkbox'
              checked={isImportant}
              onChange={e => setIsImportant(e.target.checked)}
              className='
          h-5
          w-5
          rounded
          accent-blue-600
        '
            />

            <Pin size={18} className='text-red-500' />

            <span className='font-medium text-slate-700'>
              Mark as Important Notice
            </span>
          </label>

          {/* Button */}
          <div className='flex justify-end'>
            <button
              type='submit'
              disabled={isUploading}
              className='
          inline-flex
          items-center
          gap-2
          bg-blue-600
          hover:bg-blue-700
          disabled:bg-blue-400
          disabled:cursor-not-allowed
          text-white
          font-medium
          px-6
          py-3
          rounded-xl
          transition-all
          shadow-md
          hover:shadow-lg
        '
            >
              <Upload size={18} />

              {isUploading ? 'Uploading...' : 'Publish Notice'}
            </button>
          </div>
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
      <div className='space-y-6'>
        <div>
          <h1 className='text-3xl font-bold text-slate-800'>📢 All Notices</h1>

          <p className='text-slate-500 mt-1'>
            Manage and review all school announcements
          </p>
        </div>

        {loading ? (
          <div className='bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-sm'>
            <p className='text-slate-500'>Loading notices...</p>
          </div>
        ) : notices.length === 0 ? (
          <div className='bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-sm'>
            <p className='text-slate-400'>No notices available</p>
          </div>
        ) : (
          <div className='space-y-6'>
            {notices.map((notice, index) => {
              const imageFiles =
                notice.files?.filter(
                  file =>
                    file.type?.startsWith('image') ||
                    file.url.match(/\.(jpg|jpeg|png|webp)$/i)
                ) || []

              const pdfFiles =
                notice.files?.filter(
                  file =>
                    file.type === 'application/pdf' || file.url.endsWith('.pdf')
                ) || []

              return (
                <div
                  key={notice._id}
                  className='bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden'
                >
                  {notice.isImportant && <div className='h-1 bg-red-500' />}

                  <div className='p-6'>
                    {/* HEADER */}
                    <div className='flex items-start justify-between gap-4'>
                      <div>
                        <div className='flex flex-wrap items-center gap-2 mb-2'>
                          {notice.isImportant && (
                            <span className='inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-red-50 text-red-600'>
                              <Pin size={12} />
                              Important
                            </span>
                          )}

                          {index === 0 && (
                            <span className='px-3 py-1 text-xs font-medium rounded-full bg-green-50 text-green-600'>
                              New
                            </span>
                          )}
                        </div>

                        {editId === notice._id ? (
                          <input
                            value={editData.title}
                            onChange={e =>
                              setEditData({
                                ...editData,
                                title: e.target.value
                              })
                            }
                            className='w-full border border-slate-300 rounded-xl px-4 py-2'
                          />
                        ) : (
                          <h2 className='text-2xl font-bold text-slate-800'>
                            {notice.title}
                          </h2>
                        )}
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className='mt-3'>
                      {editId === notice._id ? (
                        <textarea
                          value={editData.content}
                          onChange={e =>
                            setEditData({
                              ...editData,
                              content: e.target.value
                            })
                          }
                          rows={3}
                          className='w-full border border-slate-300 rounded-xl p-4'
                        />
                      ) : (
                        <p className='text-slate-600 leading-7'>
                          {notice.content}
                        </p>
                      )}
                    </div>

                    {/* IMPORTANT TOGGLE */}
                    {editId === notice._id && (
                      <label className='flex items-center gap-2 mt-4'>
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
                        Important Notice
                      </label>
                    )}

                    {/* ATTACHMENTS */}
                    {(imageFiles.length > 0 || pdfFiles.length > 0) && (
                      <div className='mt-5 pt-5 border-t border-slate-100'>
                        <div className='flex items-center gap-2 mb-4'>
                          <Paperclip size={16} />
                          <span className='font-medium text-slate-700'>
                            Attachments
                          </span>
                        </div>

                        {/* IMAGES */}
                        {imageFiles.length > 0 && (
                          <div className='flex flex-wrap gap-3'>
                            {imageFiles.slice(0, 4).map((file, idx) => (
                              <div
                                key={idx}
                                onClick={() => setPreviewFile(file.url)}
                                className='group relative cursor-pointer'
                              >
                                <img
                                  src={file.url}
                                  alt='notice'
                                  className='w-44 h-28 object-cover rounded-xl border border-slate-200'
                                />

                                <div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-xl transition' />
                              </div>
                            ))}

                            {imageFiles.length > 4 && (
                              <div
                                className='
                      w-44
                      h-28
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-100
                      flex
                      items-center
                      justify-center
                      font-bold
                      text-xl
                      text-slate-600
                    '
                              >
                                +{imageFiles.length - 4}
                              </div>
                            )}
                          </div>
                        )}

                        {/* PDFs */}
                        {pdfFiles.length > 0 && (
                          <div className='flex flex-wrap gap-3 mt-4'>
                            {pdfFiles.map((file, idx) => (
                              <button
                                key={idx}
                                onClick={() => setPreviewFile(file.url)}
                                className='inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200'
                              >
                                <FileText size={16} />
                                PDF
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* FOOTER */}
                  <div className='border-t border-slate-100 px-6 py-4 flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center'>
                        <User size={18} />
                      </div>

                      <div>
                        <p className='text-xs text-slate-400'>Posted By</p>
                        <p className='font-medium text-slate-700'>
                          {notice.createdBy?.name || 'Admin'}
                        </p>
                      </div>
                    </div>

                    <div className='flex gap-2'>
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
                            className='p-2 rounded-xl bg-green-50 text-green-600 hover:bg-green-100'
                          >
                            <Save size={18} />
                          </button>

                          <button
                            onClick={() => setEditId(null)}
                            className='p-2 rounded-xl bg-slate-100 hover:bg-slate-200'
                          >
                            <X size={18} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setEditId(notice._id)
                              setEditData({
                                title: notice.title,
                                content: notice.content,
                                isImportant: notice.isImportant
                              })
                            }}
                            className='p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100'
                          >
                            <Pencil size={18} />
                          </button>

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
                            className='p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100'
                          >
                            <Trash2 size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* IMPORTANT: Modal Outside Map */}
        <FilePreviewModal
          file={previewFile}
          onClose={() => setPreviewFile(null)}
        />
      </div>
    </div>
  )
}

export default Notices
