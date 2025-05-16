import { useState } from 'react'
import {
  BookOpen,
  Atom,
  Globe,
  Code,
  Palette,
  Languages,
  Dumbbell
} from 'lucide-react'

const categoryIcons = {
  Languages: <Languages className='text-blue-600 animate-bounce' />,
  Mathematics: <BookOpen className='text-green-600 animate-bounce' />,
  Science: <Atom className='text-purple-600 animate-bounce' />,
  'Social Studies': <Globe className='text-yellow-600 animate-bounce' />,
  'Computer & Tech': <Code className='text-pink-600 animate-bounce' />,
  'Creative & Co-curricular': <Palette className='text-orange-500 animate-bounce' />,
  'Physical & Life Skills': <Dumbbell className='text-teal-600 animate-bounce' />
}

const subjects = [
  { name: 'English', category: 'Languages' },
  { name: 'Hindi', category: 'Languages' },
  { name: 'Sanskrit', category: 'Languages' },
  { name: 'Mathematics', category: 'Mathematics' },
  { name: 'Science', category: 'Science' },
  { name: 'EVS', category: 'Science' },
  { name: 'Social Science', category: 'Social Studies' },
  { name: 'History', category: 'Social Studies' },
  { name: 'Geography', category: 'Social Studies' },
  { name: 'Civics', category: 'Social Studies' },
  { name: 'Computer Basics', category: 'Computer & Tech' },
  { name: 'Information Technology', category: 'Computer & Tech' },
  { name: 'Drawing & Crafts', category: 'Creative & Co-curricular' },
  { name: 'Art & Culture', category: 'Creative & Co-curricular' },
  { name: 'Physical Education', category: 'Physical & Life Skills' },
  { name: 'General Knowledge', category: 'Physical & Life Skills' }
]

const CoursesAndPrograms = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', ...new Set(subjects.map(subj => subj.category))]

  const filteredSubjects =
    selectedCategory === 'All'
      ? subjects
      : subjects.filter(s => s.category === selectedCategory)

  return (
    <section className='bg-gray-50 py-16 px-4 sm:px-6 lg:px-10'>
      <div className=' mx-auto text-left mb-10'>
        <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4'>
          Courses & Programs
        </h2>
        <p className='text-gray-600'>
          Discover the wide range of subjects we offer to nurture every child's
          potential.
        </p>
      </div>

      <div className='mb-8 overflow-x-auto'>
        <div className='flex sm:flex-wrap flex-nowrap sm:justify-start gap-3 min-w-max sm:min-w-0 pb-2 sm:pb-0'>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 text-sm rounded-full border transition font-medium shadow-sm ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-blue-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto'>
        {filteredSubjects.map((subject, i) => (
          <div
            key={i}
            className='bg-white border rounded-xl shadow-md p-4 flex items-center gap-4 hover:shadow-lg transition duration-300 hover:scale-[1.02]'
          >
            <div className='text-2xl shrink-0'>
              {categoryIcons[subject.category]}
            </div>
            <div>
              <h3 className='text-base sm:text-lg font-semibold text-gray-800'>
                {subject.name}
              </h3>
              <p className='text-sm text-gray-500'>{subject.category}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default CoursesAndPrograms
