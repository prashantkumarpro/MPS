import { useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import { ReportContext } from '../context/ReportContext'
import { fetchReport } from '../api'
import SelectBox from '../components/SelectBox'
import { useLocalStorage } from '../hooks/useLocalStorage'

// ---------------- OPTIONS ----------------

const termOptions = [
  { label: '1st Term', value: 'TERM_1' },
  { label: '2nd Term', value: 'TERM_2' },
  { label: '3rd Term', value: 'TERM_3' }
]

const yearOptions = [
  { label: '2025–26', value: '2025-26' },
  { label: '2026–27', value: '2026-27' }
]

// ---------------- COMPONENT ----------------

const CheckResult = () => {
  const [studentClass, setStudentClass] = useState('')
  const [rollNumber, setRollNumber] = useState('')
  const [loading, setLoading] = useState(false)

  const { setStudent, setReport } = useContext(ReportContext)
  const navigate = useNavigate()

  const [formState, setFormState] = useLocalStorage('termYear', {
    term: '',
    academicYear: ''
  })

  const { term, academicYear } = formState

  const handleSubmit = async e => {
    e.preventDefault()

    if (!studentClass || !rollNumber || !term || !academicYear) {
      alert('Please fill all fields')
      return
    }

    setLoading(true)

    const result = await fetchReport({
      studentClass,
      rollNumber,
      term,
      academicYear
    })

    setLoading(false)

    if (result.success) {
      setStudent(result.student)
      setReport(result.report)
      navigate('/result')
    } else {
      alert(result.message || 'Invalid details. Please check again.')
    }
  }

  return (
    <div
      className='min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100
                flex items-center justify-center px-4'
    >
      <form
        onSubmit={handleSubmit}
        id='checkresult'
        className='mt-6
      w-full
      max-w-md
      bg-white
      shadow-2xl
      rounded-2xl
      p-6 sm:p-8
      flex
      flex-col
      gap-5
    '
      >
        {/* Header */}
        <div className='text-center'>
          <h2 className='text-xl sm:text-2xl font-bold text-gray-800'>
            🎓 Check Your Result
          </h2>
          <p className='text-xs sm:text-sm text-gray-500 mt-1'>
            Enter your details to view your marks
          </p>
        </div>

        {/* Term & Year */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
          <SelectBox
            label='Term'
            value={term}
            onChange={value => {
              console.log('VALUE:', value.target.value)
              setFormState(prev => ({ ...prev, term: value.target.value }))
            }}
            options={termOptions}
            placeholder='Select'
          />

          <SelectBox
            label='Academic Year'
            value={academicYear}
            onChange={value => {
              console.log('VALUE:', value.target.value)
              setFormState(prev => ({
                ...prev,
                academicYear: value.target.value
              }))
            }}
            options={yearOptions}
            placeholder='Year'
          />
        </div>

        {/* Class */}
        <div>
          <label className='text-xs sm:text-sm font-medium text-gray-700'>
            Class
          </label>
          <input
            type='text'
            placeholder='e.g. III, V, LKG'
            value={studentClass}
            onChange={e => setStudentClass(e.target.value.trim())}
            className='
          mt-1
          w-full
          px-4
          py-3
          border
          border-gray-300
          rounded-xl
          focus:ring-2
          focus:ring-blue-500
          focus:outline-none
        '
          />
        </div>

        {/* Roll Number */}
        <div>
          <label className='text-xs sm:text-sm font-medium text-gray-700'>
            Roll Number
          </label>
          <input
            type='number'
            placeholder='e.g. 12'
            value={rollNumber}
            onChange={e => setRollNumber(e.target.value.trim())}
            className='
          w-full
          px-4
          py-3
          border
          border-gray-300
          rounded-xl
          focus:ring-2
          focus:ring-blue-500
          focus:outline-none
        '
          />
        </div>

        {/* Info Box */}
        {/* <div
          className='text-xs sm:text-sm text-gray-600 bg-yellow-50
                    border-l-4 border-yellow-400 p-4 rounded-lg'
        >
          <p>
            <span className='font-semibold'>Note:</span> Classes I–VI → roman (
            <span className='font-medium'> i, ii, iii, iv, v, vi</span>)
          </p>
          <p className='mt-1'>
            KG →
            <span className='font-medium'> ukga, ukgb, lkg, nursery, pg</span>
          </p>
        </div> */}

        {/* Submit Button */}
        <button
          type='submit'
          disabled={loading}
          className={`
        w-full
        py-3
        rounded-xl
        text-base sm:text-lg
        font-semibold
        text-white
        flex
        justify-center
        items-center
        transition
        ${
          loading
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.98]'
        }
      `}
        >
          {loading ? (
            <div
              className='h-6 w-6 border-4 border-white
                        border-t-transparent rounded-full animate-spin'
            ></div>
          ) : (
            'View Result'
          )}
        </button>
      </form>
    </div>
  )
}

export default CheckResult
