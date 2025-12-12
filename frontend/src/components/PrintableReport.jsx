import React, { forwardRef } from 'react'
import logo from '../assets/logo.webp'
import { useNavigate } from 'react-router'

function getPositionText (position) {
  if (!position) return ''

  const j = position % 10
  const k = position % 100

  if (j === 1 && k !== 11) return position + 'st'
  if (j === 2 && k !== 12) return position + 'nd'
  if (j === 3 && k !== 13) return position + 'rd'
  return position + 'th'
}

function getMarkCellClass (mark) {
  if (mark === null || mark < 15) {
    return 'bg-red-200 text-red-800 font-semibold'
  }
  return ''
}

const PrintableReport = forwardRef(({ student, report }, ref) => {
  const navigate = useNavigate()

  // ⭐ FIX: Identify Nursery separately ⭐
  const isNursery = String(student.class).toUpperCase() === 'NURSERY'
  const isPg = String(student.class).toUpperCase() === 'PG'

  // KG subjects
  const kgSubjects = [
    ['ENGLISH', report.english, 50],
    ['MATH', report.math, 50],
    ['HINDI', report.hindi, 50],
    ['TABLE', report.table, 50],
    ['RHYMES', report.rhymes, 50],
    ...(!isNursery && !isPg ? [['GENERAL KNOWLEDGE', report.gk, 50]] : []),
    ['ART/EVS', report.art, isPg ? 50 : 'GRADE']
  ]

  // Primary subjects
  const primarySubjects = [
    ['ENGLISH', report.english, 50],
    ['MATH', report.math, 50],
    ['HINDI', report.hindi, 50],
    ['SCIENCE', report.science, 50],
    ['SOCIAL STUDIES', report.socialStudies, 50],
    ['GENERAL KNOWLEDGE', report.gk, 50],
    ['ART/EVS', report.art, 'GRADE']
  ]

  // Decide table based on classType
  const subjectRows = report.classType === 'KG' ? kgSubjects : primarySubjects

  // ⭐ Nursery = 250 marks, PG/LKG/UKG/Primary = 300 marks ⭐
  const totalFullMarks = isNursery ? 250 : 300
  console.log(report)

  return (
    <>
      <div className='flex justify-center my-4'>
        <button
          onClick={() => navigate('/check-result')}
          className='bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition'
        >
          Check Another Result
        </button>
      </div>
      <div
        ref={ref}
        className='bg-white pb-4  px-4 border border-black shadow-lg text-[15px]'
      >
        <div>
          <img
            src={logo}
            alt='logo'
            width={'65px'}
            height={'65px'}
            className='m-auto block'
            loading='lazy'
          />
        </div>

        {/* School Header */}
        <div className='text-center mb-0'>
          <h1 className='text-2xl font-bold text-sky-700'>MAX PUBLIC SCHOOL</h1>
          <p className='text-xl text-sky-600 uppercase'>
            “An English Medium Co-Educational School”
          </p>
          <h2 className='text-xl font-semibold text-sky-600 uppercase'>
            Class Progress Report
          </h2>
          <p className='text-lg font-semibold uppercase text-sky-600'>
            2<sup>nd</sup> Term 2025–26
          </p>
        </div>

        {/* Student Info */}
        <div className='mb-2 leading-7'>
          <p>
            <b>Class:</b>{' '}
            <span className='font-semibold'>
              {String(student.class).toUpperCase()}
            </span>
          </p>
          <p>
            <b>Name:</b> <span className='font-semibold'>{student.name} </span>
          </p>
          <p>
            <b>Roll no:</b>{' '}
            <span className='font-semibold'>{student.rollNumber} </span>
          </p>
          <p>
            <b>Residential Address:</b> ____________________________
          </p>
          <p>
            <b>Mother’s name:</b> ________________________________
          </p>
          <p>
            <b>Father’s name:</b> _________________________________
          </p>
        </div>

        {/* Title */}
        <p className='text-center font-semibold text-red-600 mb-2 underline'>
          Record of Academic Performance
        </p>
        <p className='uppercase text-center font-semibold  mb-2 underline italic'>
          <b>Note:</b> passing marks for each subject is 15.
        </p>

        {/* Table */}
        <table className='w-full border border-black text-center'>
          <thead>
            <tr className='bg-[#ccffcc] border border-black'>
              <th className='border border-black p-2 uppercase'>SUBJECT</th>
              <th className='border border-black p-2 uppercase'>
                OBTAINED MARKS
              </th>
              <th className='border border-black p-2 uppercase'>FULL MARKS</th>
            </tr>
          </thead>

          <tbody>
            {/* SUBJECT ROWS */}
            {subjectRows.map((row, i) => (
              <tr key={i}>
                <td className='border border-black p-2 bg-[#ccffcc] font-semibold'>
                  {row[0]}
                </td>

                <td
                  className={`border border-black p-2 ${getMarkCellClass(
                    row[1]
                  )}`}
                >
                  {row[1] ?? 'Absent'}
                </td>

                <td className='border border-black p-2'>{row[2]}</td>
              </tr>
            ))}

            {/* COMMON DETAILS */}
            {[
              ['TOTAL OBTAINED MARK', `${report.totalMarks}`],
              ['TOTAL FULL MARKS', totalFullMarks],
              ['PERCENTAGE (%)', report.percentage.toFixed(2)],
              ['RESULT', report.division.toUpperCase()],
              ['GRADE', report.division === 'Fail' ? '' : report.grade],
              [
                'POSITION',
                report.division === 'Fail'
                  ? ''
                  : getPositionText(report.position)
              ],
              ,
              ['ATTENDANCE', report.attendance + '/89'],
              ['REMARKS', report.remarks]
            ].map((row, i) => (
              <tr key={i}>
                <td className='border border-black p-2 bg-[#ccffcc] font-semibold'>
                  {row[0]}
                </td>
                <td className='border border-black p-2' colSpan={2}>
                  {row[1]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Signatures */}
        {/* <div className='flex justify-between mt-10 text-[16px]'>
          <p>
            <b>Teacher’s Signature</b>
          </p>
          <p>
            <b>Principal’s Signature & Seal</b>
          </p>
        </div> */}
      </div>
    </>
  )
})

export default PrintableReport
