import { useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import { ReportContext } from '../context/ReportContext'
import { fetchReport } from '../api'

export default function ViewReportForm () {
  const [studentClass, setStudentClass] = useState('')
  const [rollNumber, setRollNumber] = useState('')
  const [loading, setLoading] = useState(false)

  const { setStudent, setReport } = useContext(ReportContext)
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    const result = await fetchReport({ studentClass, rollNumber })

    setLoading(false)

    if (result.success) {
      setStudent(result.student)
      setReport(result.report)
      navigate('/result')
    } else {
      alert('Invalid class or roll number!')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full max-w-md mx-auto mt-10 bg-white shadow-lg rounded-xl p-8 flex flex-col gap-5'
    >
      <h2 className='text-2xl font-semibold text-gray-800 text-center'>
        Check Your Result
      </h2>

      <input
        type='text'
        placeholder='Enter your class'
        value={studentClass}
        onChange={e => setStudentClass(e.target.value.toUpperCase())}
        className='px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
      />

      <input
        type='number'
        placeholder='Enter your roll number'
        value={rollNumber}
        onChange={e => setRollNumber(e.target.value)}
        className='px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
      />

      <button
        type='submit'
        disabled={loading}
        className={`w-full py-3 rounded-lg text-lg text-white flex justify-center items-center
          ${
            loading
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
      >
        {loading ? (
          <div className='h-6 w-6 border-4 border-white border-t-transparent rounded-full animate-spin'></div>
        ) : (
          'See Result'
        )}
      </button>
    </form>
  )
}
