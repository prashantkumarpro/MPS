// Import Swiper styles and modules
import { Swiper, SwiperSlide } from 'swiper/react'
import profiles from '../data/profiles'
import { Link } from 'react-router'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import TeacherCard from './TeacherCard'

const Teachers = () => {
  return (
    <section className='bg-gray-50 py-14 px-4'>
      <div className='max-w-6xl mx-auto px-4 text-center mb-10'>
        <h2 className='text-3xl md:text-4xl font-bold text-gray-800'>
          Meet Our Educators
          <Link
            to='/teachers'
            className='ml-3 text-sm font-normal text-blue-500 hover:underline cursor-pointer'
          >
            View All
          </Link>
        </h2>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        // pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
        className='max-w-[82rem] mx-auto'
      >
        {profiles.map((t, i) => (
          <SwiperSlide key={i}>
            <TeacherCard {...t} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default Teachers
