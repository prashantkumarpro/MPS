import logo from '../assets/logo.png'
import { RiHome3Fill, RiHome3Line } from 'react-icons/ri'
import { PiPhoneDuotone, PiPhoneFill } from 'react-icons/pi'
const MobileBottomHeader = () => {
  return (
    <>
      <div className='w-full flex md:hidden items-center justify-between px-4  fixed bottom-0 left-0 z-50 shadow-lg bg-white '>
        <a href='#' className='flex items-center flex-col gap-0'>
          <div className='text-xl text-[#0369A1]'>
            <RiHome3Fill />
            <RiHome3Line />
          </div>
          <p className='text-[8px] text-gray-700'>Home</p>
        </a>
        <a
          href='tel:+916283552938'
          className='flex items-center flex-col gap-0'
        >
          <div className='text-xl text-[#0369A1]'>
            <PiPhoneFill />
            <PiPhoneDuotone />
          </div>
          <p className='text-[8px] text-gray-700'>Phone</p>
        </a>
        <div className='flex items-center flex-col'>
          <img src={`${logo}`} className='size-8' alt='MPS logo' />
          <p className='text-[8px] text-gray-700'>Home</p>
        </div>
        <a
          href='mailto:schoolmaxpublic@email.com?subject=Hello&body=I want to contact you'
          className='flex items-center flex-col gap-0'
        >
          <div className='text-xl text-[#0369A1]'>
            <i className='ri-mail-line'></i>
          </div>
          <p className='text-[8px] text-gray-700'>Email</p>
        </a>
      </div>
    </>
  )
}

export default MobileBottomHeader
