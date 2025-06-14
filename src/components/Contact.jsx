const ContactForm = () => {
  return (
    <section id='contact' className='bg-white py-16 px-6 md:px-12'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
        {/* Contact Info */}
        <div className='space-y-6 -mt-10 md:-mt-20'>
          <h2 className='text-2xl md:text-4xl font-semibold text-[#2C3E50]'>
            Get in Touch
          </h2>
          <p className='text-gray-600 text-lg'>
            Have a question or want to learn more? We're here to help!
          </p>

          <div className='space-y-4 text-gray-700 text-base'>
            <div className='flex items-start gap-3'>
              <i className='fas fa-map-marker-alt text-blue-600 mt-1'></i>
              <p>F4P5+7PV, Vijay Mohanpur, Bihar – 853204</p>
            </div>
            <div className='flex items-start gap-3'>
              <i className='fa-solid fa-phone text-blue-600 mt-1'></i>
              <p>+91 62835 52938</p>
            </div>
            <div className='flex items-start gap-3'>
              <i className='fas fa-envelope text-blue-600 mt-1'></i>
              <p>schoolmaxpublic@gmail.com</p>
            </div>
          </div>

          <a
            href='tel:+916206293108'
            id="contact-button"
            className='inline-block mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow transition-all'
          >
            Quick Enquiry
          </a>
        </div>

        {/* Map */}
        <div className='w-full h-80 md:h-[450px] rounded-xl overflow-hidden shadow-md border border-gray-200'>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3601.579139353124!2d87.1093022!3d25.485725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f025dd19210725%3A0xefe9a9735eb8d8cd!2sMAX%20PUBLIC%20SCHOOL!5e0!3m2!1sen!2sin!4v1746631072936!5m2!1sen!2sin'
            width='600'
            height='450'
            style={{ border: 0 }}
            allowFullScreen=''
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          />
        </div>
      </div>
    </section>
  )
}

export default ContactForm
