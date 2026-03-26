const ImagePreviewModal = ({ image, onClose }) => {
  if (!image) return null

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50'
      onClick={onClose}
    >
      <img
        src={image}
        alt='preview'
        className='max-w-[90%] max-h-[90%] rounded-lg shadow-lg'
      />

      {/* Close Button */}
      <button
        className='absolute top-5 right-5 text-white text-3xl'
        onClick={onClose}
      >
        ✕
      </button>
    </div>
  )
}

export default ImagePreviewModal
