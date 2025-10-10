const FeatureCard = ({ icon, title, description }) => (
  <div className='bg-white rounded-xl shadow-md p-6 text-center border hover:shadow-lg transition duration-300 ease-in-out'>
    <div className='bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 mx-auto rounded-full flex items-center justify-center text-white text-2xl mb-4'>
      <div className='animate-bounce'>{icon}</div>
    </div>
    <h3 className='font-abel text-[#44444E] text-2xl md:text-2xl  text-center h-fit'>
      {title}
    </h3>
    <p className='font-poppins text-sm  sm:text-sm md:text-md font-light text-[#44444E] text-center text-balance'>
      {description}
    </p>
  </div>
)

const FeaturesSection = () => {
  const features = [
    {
      icon: '👨‍🏫',
      title: 'Expert Teachers',
      description:
        "Dedicated and qualified educators committed to shaping your child's bright future."
    },
    {
      icon: '📚',
      title: 'Quality Education',
      description:
        'CBSE-aligned curriculum with focus on conceptual clarity and character building.'
    },
    {
      icon: '🤝',
      title: 'Lifetime Support',
      description:
        'We mentor and support students even after school to help them grow and thrive.'
    }
  ]

  return (
    <section className='bg-gray-50 py-12'>
      <div className='max-w-6xl py-2 px-4 md:px-10 mb-10'>
        <h2 className='uppercase font-alumni text-3xl md:text-4xl font-semibold text-primary-blue mb-4'>
          Why Choose Max Public School?
        </h2>
        <p className='text-[#0D0D0D] text-justify font-poppins font-normal leading-6 tracking-wider'>
          We don’t just teach — we empower young minds to dream, explore, and
          succeed in every walk of life.
        </p>
      </div>
      <div className='max-w-[82rem] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4'>
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </section>
  )
}

export default FeaturesSection
