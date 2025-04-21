import React from 'react'
import logo from '../assets/logo.png'
import { PiPhoneFill } from 'react-icons/pi'
import { MdOutlineMailOutline } from 'react-icons/md'
import { FaLocationDot } from 'react-icons/fa6'
const ContactSection = () => {
  return (
    <div
      id='contact'
      className='bg-[#00192A] bg-center min-h-screen flex items-center justify-center'
    >
      <div className='bg-[#0b2232] bg-opacity-50 text-white p-6 rounded-md flex flex-col md:flex-row gap-6 w-full max-w-6xl'>
        {/* Contact Details */}
        <div className='flex-1 space-y-4'>
          <h2 className='text-3xl font-bold mb-4 text-center'>
            Contact Details
          </h2>

          <div className='flex items-start gap-4'>
            <div className='flex items-center gap-4 '>
              <img src={`${logo}`} className='size-6 radius-8' alt='MPS logo' />
              <h3 className='text-2xl'>Max Public School Mohanpur Bazar</h3>
            </div>
          </div>

          <div className='flex items-center gap-4'>
            <div className=' text-[#0369A1]'>
              <FaLocationDot className='size-6' />
            </div>
            <p>F4P5+7PV, Vijay Mohanpur, Bihar – 853204</p>
          </div>

          <div className='flex items-center gap-4'>
            <div className=' text-[#0369A1]'>
              <PiPhoneFill className='size-6' />
            </div>
            <p>+916283552938</p>
          </div>

          <div className='flex items-center gap-4'>
            <div className='text-xl text-[#0369A1]'>
              <MdOutlineMailOutline className='size-6' />
            </div>
            <p>schoolmaxpublic@gmail.com</p>
          </div>

          <div className='mt-8'>
            <a
              href='tel:+916283552938'
              className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-semibold'
            >
              QUICK ENQUIRY
            </a>
          </div>
        </div>

        {/* Map Section */}
        <div className='flex-1'>
          <iframe
            title='School Location'
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2968.489056263707!2d87.1093022!3d25.485725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f025dd19210725%3A0xefe9a9735eb8d8cd!2sMAX%20PUBLIC%20SCHOOL!5e1!3m2!1sen!2sin!4v1745227305557!5m2!1sen!2sin'
            width='100%'
            height='420'
            className='rounded-md'
            style={{ border: 0 }}
            allowFullScreen=''
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default ContactSection
