import { useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import { ReportContext } from '../context/ReportContext'
import { fetchReport } from '../api'

const CheckResult = () => {
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
      id='checkresult'
      className='absolute top-0 bottom-0 left-0 right-0 
               m-auto w-full max-w-md h-fit
               bg-white shadow-lg rounded-xl p-8 flex flex-col gap-5'
    >
      <h2 className='text-2xl font-semibold text-gray-800 text-center'>
        Check Your Result
      </h2>
{/* <div className="bg-red-50 border border-red-400 text-red-700 p-3 rounded-lg text-sm">
  <strong>Important:</strong> Class lkg results are available.
  <br />
  <strong>महत्वपूर्ण:</strong> कक्षा lkg का परिणाम अभी उपलब्ध है।
</div> */}
      <input
        type='text'
        placeholder='Class in roman e.g iii'
        value={studentClass}
        onChange={e => setStudentClass(e.target.value.trim())}
        className='px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
      />

      <input
        type='number'
        placeholder='Rollnumber in digit e.g 1'
        value={rollNumber}
        onChange={e => setRollNumber(e.target.value.trim())}
        className='px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
      />

      <p className='text-sm text-gray-600 bg-yellow-50 border border-yellow-300 p-3 rounded-lg'>
        <span className='font-semibold'>Note:</span> Class 1 (I) – 6 (VI)
        students must enter their class in roman like:{' '}
        <span className='font-medium'>i, ii, iii, iv, v, vi</span>.
        <br />
        For KG classes enter:{' '}
        <span className='font-medium'>ukga, ukgb, lkg, nursery, pg</span>.
      </p>

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

export default CheckResult
