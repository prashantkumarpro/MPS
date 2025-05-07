import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import profiles from '../data/profiles'
import { Link } from 'react-router'
import Slider from 'react-slick'

export default function TeacherSlider () {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  }

  return (
    <section id='teachers' className='py-8 px-8 bg-gray-50'>
      <h2 className='text-2xl px-2 font-light text-left text-gray-800 mb-12'>
        Meet Our Educators{' '}
        <Link to='/teachers' className='text-sm text-blue-400'>
          View All
        </Link>
      </h2>

      <Slider {...settings}>
        {profiles.map(profile => (
          <div key={profile.id} className='px-2'>
            <div className='bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition border'>
              <div className='overflow-hidden rounded-full w-32 h-32 mx-auto mb-4'>
                <img
                  src={profile.image}
                  alt={profile.name}
                  className='w-full h-full  rounded-full border-4 border-blue-700 object-cover  shadow-md bg-gray-200'
                />
              </div>
              <h3 className='text-lg text-center font-semibold text-gray-800'>
                {profile.name}
              </h3>
              <p className='text-sm text-center text-blue-300'>
                {profile.role}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  )
}
