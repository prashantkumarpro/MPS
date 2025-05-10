const TeacherCard = ({ image, name, role }) => {
  return (
    <div className='bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 text-center border border-gray-100'>
      <div className='w-24 h-24 mx-auto mb-4 rounded-full border-4 border-blue-600 overflow-hidden shadow-sm'>
        <img src={image} alt={name} className='w-full h-full object-cover' />
      </div>
      <h3 className='text-xl font-semibold text-gray-800'>{name}</h3>
      <p className='text-blue-500 font-medium'>{role}</p>
    </div>
  )
}

export default TeacherCard
