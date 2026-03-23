import { useEffect, useState } from 'react'
import { fetchNotices } from '../../api'

const Notices = () => {
  const [notices, setNotices] = useState([])

  // 🔥 CREATE STATE
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [files, setFiles] = useState([])
  const [isImportant, setIsImportant] = useState(false)

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
    const data = await fetchNotices()
    setNotices(data)
  }

  useEffect(() => {
    loadData()
  }, [])

  // 🚀 CREATE NOTICE
  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    formData.append('isImportant', isImportant)

    for (let file of files) {
      formData.append('files', file)
    }

    await fetch(`${API_BASE}/api/notices`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    })

    setTitle('')
    setContent('')
    setFiles([])
    setIsImportant(false)

    loadData()
  }

  return (
    <div className='p-6 space-y-8'>

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

          <button className='bg-blue-600 text-white px-4 py-2 rounded'>
            Upload Notice
          </button>
        </form>
      </div>

      {/* 🔥 NOTICE LIST */}
      <div>
        <h1 className='text-2xl font-bold mb-4'>📢 All Notices</h1>

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
                      onChange={(e) =>
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
                  onChange={(e) =>
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
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        isImportant: e.target.checked
                      })
                    }
                  />
                  Important 📌
                </label>
              )}

              {/* Files */}
              <div className='mt-3 flex flex-wrap gap-2'>
                {notice.files?.map((file, i) => (
                  <a
                    key={i}
                    href={`${API_BASE}/${file}`}
                    target='_blank'
                    rel='noreferrer'
                    className='text-blue-500 text-sm bg-gray-100 px-2 py-1 rounded'
                  >
                    📄 File {i + 1}
                  </a>
                ))}
              </div>

              {/* Footer */}
              <div className='flex justify-between items-center mt-3 text-sm text-gray-400'>
                <span>By: {notice.createdBy?.name}</span>

                <div className='flex gap-3'>
                  {editId === notice._id ? (
                    <>
                      <button
                        onClick={async () => {
                          await fetch(`${API_BASE}/api/notices/${notice._id}`, {
                            method: 'PUT',
                            headers: {
                              'Content-Type': 'application/json',
                              Authorization: `Bearer ${localStorage.getItem('token')}`
                            },
                            body: JSON.stringify(editData)
                          })

                          setEditId(null)
                          loadData()
                        }}
                        className='text-green-600'
                      >
                        💾 Save
                      </button>

                      <button onClick={() => setEditId(null)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={async () => {
                          await fetch(`${API_BASE}/api/notices/${notice._id}`, {
                            method: 'DELETE',
                            headers: {
                              Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                          })

                          setNotices(prev =>
                            prev.filter(n => n._id !== notice._id)
                          )
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
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Notices