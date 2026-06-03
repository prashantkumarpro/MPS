import {
  Download,
  ExternalLink,
  X,
  Image as ImageIcon,
  FileText
} from 'lucide-react'

const getFilenameFromUrl = url => {
  const fullName = decodeURIComponent(url.split('/').pop())

  return fullName.replace(/^\d{10,15}-/, '')
}

const getFileType = url => {
  if (!url) return 'other'

  if (url.match(/\.(jpg|jpeg|png|webp)$/i)) return 'image'

  if (url.match(/\.pdf$/i)) return 'pdf'

  return 'other'
}

const handleDownload = async file => {
  try {
    const fileUrl = typeof file === 'string' ? file : file?.url

    if (!fileUrl) return

    const rawName = decodeURIComponent(fileUrl.split('/').pop())

    const filename = rawName.replace(/^[0-9]+-/, '')

    const response = await fetch(fileUrl)

    const blob = await response.blob()

    const blobUrl = window.URL.createObjectURL(blob)

    const a = document.createElement('a')

    a.href = blobUrl
    a.download = filename

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

  const fileUrl = typeof file === 'string' ? file : file?.url

  const type = getFileType(fileUrl)

  const filename =
    file?.originalname ||
    file?.filename ||
    file?.name ||
    fileUrl?.split('/').pop()

  return (
    <div
      className='fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4'
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        className='
          relative
          w-full
          h-full
          sm:h-[95vh]
          sm:max-w-7xl
          bg-white
          rounded-none
          sm:rounded-3xl
          overflow-hidden
          shadow-2xl
          border-0
          sm:border
          border-slate-200
        '
      >
        {/* Header */}
        <div
          className='
            border-b
            border-slate-200
            bg-white
            px-4
            sm:px-6
            py-3
            flex
            flex-col
            sm:flex-row
            sm:items-center
            justify-between
            gap-3
          '
        >
          <div className='flex items-center gap-3 min-w-0'>
            <div className='p-2 rounded-xl bg-blue-50'>
              {type === 'image' ? (
                <ImageIcon size={18} className='text-blue-600' />
              ) : (
                <FileText size={18} className='text-red-600' />
              )}
            </div>

            <div className='min-w-0'>
              <h3 className='font-semibold text-slate-800 truncate'>
                {filename}
              </h3>

              <p className='text-xs text-slate-500'>Preview File</p>
            </div>
          </div>

          <div className='flex flex-wrap items-center gap-2'>
            <button
              onClick={() => handleDownload(file)}
              className='
                flex
                items-center
                gap-2
                px-4
                py-2
                rounded-xl
                bg-blue-50
                text-blue-600
                hover:bg-blue-100
                transition
              '
            >
              <Download size={16} />

              <span className='hidden sm:inline'>Download</span>
            </button>

            <a
              href={fileUrl}
              target='_blank'
              rel='noreferrer'
              className='
                flex
                items-center
                gap-2
                px-4
                py-2
                rounded-xl
                bg-green-50
                text-green-600
                hover:bg-green-100
                transition
              '
            >
              <ExternalLink size={16} />

              <span className='hidden sm:inline'>Open</span>
            </a>

            <button
              onClick={onClose}
              className='
                p-2
                rounded-xl
                bg-red-50
                text-red-600
                hover:bg-red-100
                transition
              '
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className='h-[calc(100%-72px)] bg-slate-900'>
          {type === 'image' && (
            <div className='w-full h-full flex items-center justify-center p-3 sm:p-6'>
              <img
                src={fileUrl}
                alt='Preview'
                className='
                  max-w-full
                  max-h-full
                  object-contain
                  rounded-lg
                  sm:rounded-2xl
                  shadow-2xl
                '
              />
            </div>
          )}

          {type === 'pdf' && (
            <iframe
              src={fileUrl}
              title='PDF Preview'
              className='w-full h-full'
            />
          )}

          {type === 'other' && (
            <div className='w-full h-full flex flex-col items-center justify-center text-white gap-4'>
              <FileText size={48} />

              <p className='text-lg'>Preview not supported</p>

              <a
                href={fileUrl}
                target='_blank'
                rel='noreferrer'
                className='
                  px-4
                  py-2
                  bg-white
                  text-black
                  rounded-xl
                  hover:bg-slate-100
                '
              >
                Open File
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FilePreviewModal
