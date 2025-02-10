import React from 'react'

const Welcome = () => {
  return (
    <div className='w-full pb-8 px-4 md:p-8'>
      <div className='bg-white m-auto shadow-lg rounded-md px-2 md:px-8 py-10 w-full max-w-7xl'>
        <h1 className='text-[25px] md:text-4xl font-bold text-sky-700 mb-4'>
          Welcome to Our School
        </h1>
        <p className='text-gray-600 text-lg leading-relaxed'>
          Max Public School is a well-known institution that provides quality
          education and helps students grow in all areas. It follows a
          well-planned curriculum and uses modern teaching methods to make
          learning easier. The school has excellent facilities, including
          classrooms, a library, laboratories, and activity areas, to support
          students in their studies. It focuses on knowledge, discipline, and
          good values to prepare students for a bright future.
        </p>
      </div>
    </div>
  )
}

export default Welcome
