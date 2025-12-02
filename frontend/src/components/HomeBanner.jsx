import HomeText from './HomeText'
import Image from './Image'
import ResultBanner from './ResultBanner'

const HomeBanner = () => {
  return (
    <section id='/' className='w-full px-4 pb-4 md:px-8 bg-background-white'>
      <div className='md:px-3 py-16 md:py-24 mt-12 md:mt-6 flex flex-col-reverse md:flex-row items-start justify-between gap-12'>
        <HomeText />
        <div className='w-full'>
          <Image
            image={'/images/welcome3.webp'}
            name={'Smiling student'}
            className={'max-w-md object-contain mx-auto'}
          />
        </div>
      </div>
    </section>
  )
}

export default HomeBanner
