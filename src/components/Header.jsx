import logo from '../assets/logo.webp'
import Nav from './Nav'

export default function Header () {
  return (
    <>
      <div className='w-full fixed top-0 left-0 z-50 bg-white flex justify-between whitespace-nowrap items-center shadow-lg md:px-5'>
        <a href='/' className='w-full flex items-center'>
          <img
            src={logo}
            alt='logo'
            width={'80px'}
            height={'80px'}
            className='w-20 h-20'
            loading='lazy'
          />
          <h1 className='font-bold text-2xl leading-[0.8]  text-sky-700 '>
            MAX PUBLIC <br /> SCHOOL
          </h1>
        </a>
        <Nav />
      </div>
    </>
  )
}
