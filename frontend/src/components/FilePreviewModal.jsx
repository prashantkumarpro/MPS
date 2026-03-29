const getFileType = url => {
  if (url.match(/\.(jpg|jpeg|png|webp)$/i)) return 'image'
  if (url.endsWith('.pdf')) return 'pdf'
  return 'other'
}

const handleDownload = async (file, name) => {
  try {
    // 🔥 HANDLE BOTH CASES
    const url = typeof file === 'string' ? file : file?.url
    const filename = name || file?.originalname
    console.log(file)
console.log("filename", filename)
    if (!url) {
      console.error('Invalid file:', file)
      return
    }

    const response = await fetch(url)
    const blob = await response.blob()

    // 🔥 SAFE TYPE
    const fileType = filename?.split('.').pop() || url.split('.').pop()

    const fixedBlob = new Blob([blob], {
      type: fileType === 'pdf' ? 'application/pdf' : `image/${fileType}`
    })

    const blobUrl = window.URL.createObjectURL(fixedBlob)

    const a = document.createElement('a')
    a.href = blobUrl
    a.download = filename || `file.${fileType}`

    document.body.appendChild(a)
    a.click()

    a.remove()
    window.URL.revokeObjectURL(blobUrl)
  } catch (error) {
    console.error('Download failed:', error)
  }
}
const FilePreviewModal = ({ file, onClose }) => {
  if (!file) return null

  const type = getFileType(file)

  return (
    <div
      className='fixed inset-0 bg-black/80 flex items-center justify-center z-50'
      onClick={onClose}
    >
      <div
        className='bg-white w-[95%] max-w-5xl h-[90%] rounded-lg relative overflow-hidden'
        onClick={e => e.stopPropagation()}
      >
        {/* 🔥 TOP BAR */}
        <div className='absolute top-3 right-3 z-50 flex gap-3'>
          {/* DOWNLOAD */}
          <button
            onClick={() => handleDownload(file)}
            className='bg-white/90 backdrop-blur px-3 py-1 rounded-lg shadow text-blue-600 hover:bg-white text-sm'
          >
            ⬇️ Download
          </button>

          {/* OPEN */}
          <a
            href={file}
            target='_blank'
            rel='noreferrer'
            className='bg-white/90 backdrop-blur px-3 py-1 rounded-lg shadow text-green-600 hover:bg-white text-sm'
          >
            🔗 Open
          </a>

          {/* CLOSE */}
          <button
            onClick={onClose}
            className='bg-white/90 backdrop-blur px-3 py-1 rounded-lg shadow text-red-600 hover:bg-white text-sm'
          >
            ✕
          </button>
        </div>

        {/* 🔥 CONTENT */}
        {type === 'image' && (
          <img
            src={file}
            alt='preview'
            className='w-full h-full object-contain'
          />
        )}

        {type === 'pdf' && (
          <iframe src={file} className='w-full h-full' title='PDF Preview' />
        )}

        {type === 'other' && (
          <div className='flex items-center justify-center h-full'>
            <p className='text-gray-500'>Preview not supported</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default FilePreviewModal
