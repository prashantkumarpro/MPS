const WelcomeText = () => {
  return (
    <section
      id='the_school'
      className='w-full py-10 px-4 md:px-10 flex flex-col md:flex-row items-center gap-10 mb-10'
    >
      <div className='w-full text-left'>
        <h2 className='text-2xl md:text-4xl font-bold text-primary-blue mb-4'>
          Welcome to Max Public School
        </h2>
        <h3 className='text-xl font-semibold text-secondary-blue mb-4'>
          A Home of Learning for Nursery to Class 8
        </h3>
        <p className='text-dark-text-gray text-md leading-relaxed'>
          At Max Public School, we believe every child is unique and capable of
          achieving greatness. Our nurturing environment, experienced faculty,
          and activity-based curriculum ensure a joyful and meaningful
          educational journey for students from Nursery to Class 8.
          <br />
          <br />
          Join us in shaping bright futures through creativity, values, and
          excellence in English-medium education.
        </p>
      </div>
    </section>
  )
}

export default WelcomeText
