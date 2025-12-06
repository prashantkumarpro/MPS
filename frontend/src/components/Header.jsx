import logo from '../assets/logo.webp'
import Nav from './Nav'

export default function Header () {
  return (
    <>
      <div className='w-full fixed top-0 left-0 z-50 bg-white flex justify-between whitespace-nowrap items-center   md:px-5'>
        <a href='/' className='w-full flex items-center '>
          <img
            src={logo}
            alt='logo'
            width={'80px'}
            height={'80px'}
            className=''
            loading='lazy'
          />
          <h1 className='font-alkatra font-extrabold text-2xl leading-5 mt-3 text-sky-700'>
            MAX PUBLIC <br /> SCHOOL
          </h1>
        </a>
        <Nav />
      </div>
    </>
  )
}
