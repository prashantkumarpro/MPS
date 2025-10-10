const TeacherCard = ({ image, name, role }) => {
  return (
    <div className='bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 text-center border border-gray-100'>
      <div className='w-24 h-24 mx-auto mb-4 rounded-full border-4 border-blue-600 overflow-hidden shadow-sm'>
        <img
          src={image}
          alt={name}
          className='w-full h-full object-cover'
          loading='lazy'
        />
      </div>
      <h3 className='font-alumni text-3xl  lg:text-3xl font-medium leading-[100%] text-[#363636] uppercase'>
        {name}
      </h3>
      <p className='font-alumni font-normal text-2xl text-[#0D0D0D] leading-[100%]  uppercase'>
        {role}
      </p>
    </div>
  )
}

export default TeacherCard
