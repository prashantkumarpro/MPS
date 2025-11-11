import { MdOutlineShare } from 'react-icons/md'

const ShareButton = () => {
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          url: 'https://maxpublicschool.site/'
        })
        .then(() => console.log('Shared successfully!'))
        .catch(error => console.error('Error sharing:', error))
    } else {
      alert('Sharing not supported on this browser.')
    }
  }

  return (
    <button onClick={handleShare} className='relative group '>
      <div>
        <MdOutlineShare className='text-lg text-blue-600 hover:text-primary-blue' />
      </div>
      <span className='sr-only'>Share</span>
      <div className='absolute bottom-full mb-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition'>
        Share
      </div>
    </button>
  )
}

export default ShareButton
