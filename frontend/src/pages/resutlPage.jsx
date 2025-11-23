import { useContext } from 'react'
import { ReportContext } from '../context/ReportContext'

export default function ResultPage () {
  const { student, report } = useContext(ReportContext)

  if (!student || !report)
    return <p>No data found. Please check result again.</p>

  return (
    <div className='max-w-2xl mx-auto mt-16 bg-white shadow-lg p-8 rounded-xl'>
      <h1 className='text-3xl font-bold text-center mb-5'>Student Report</h1>

      {/* Student Details */}
      <div className='mb-6'>
        <h2 className='text-xl font-semibold mb-2'>Student Details</h2>
        <p>
          <b>Name:</b> {student.name}
        </p>
        <p>
          <b>Class:</b> {student.class}
        </p>
        <p>
          <b>Roll Number:</b> {student.rollNumber}
        </p>
      </div>

      {/* Subject Marks */}
      <div>
        <h2 className='text-xl font-semibold mb-2'>Marks (Out of 50)</h2>

        <div className='grid grid-cols-2 gap-3'>
          <p>
            <b>English:</b> {report.english} / 50
          </p>
          <p>
            <b>Math:</b> {report.math} / 50
          </p>
          <p>
            <b>Hindi:</b> {report.hindi} / 50
          </p>
          <p>
            <b>Science:</b> {report.science} / 50
          </p>
          <p>
            <b>Social Studies:</b> {report.socialStudies} / 50
          </p>
          <p>
            <b>G.K:</b> {report.gk} / 50
          </p>
        </div>

        {/* Summary */}
        <h2 className='text-xl font-semibold mt-6 mb-2'>Summary</h2>
        <p>
          <b>Total Marks:</b> {report.totalMarks} / 300
        </p>
        <p>
          <b>Percentage:</b> {report.percentage.toFixed(2)}%
        </p>
        <p>
          <b>Grade:</b> {report.grade}
        </p>
        <p>
          <b>Attendance:</b> {report.attendance}%
        </p>
        <p>
          <b>Teacher’s Remarks:</b> {report.remarks}
        </p>
      </div>
    </div>
  )
}
