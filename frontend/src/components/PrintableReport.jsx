import React, { forwardRef } from 'react'
import logo from '../assets/logo.webp'
const PrintableReport = forwardRef(({ student, report }, ref) => {
  return (
    <div
      ref={ref}
      className='bg-white pb-4 px-10 border border-black shadow-lg text-[15px]'
    >
      <div>
        <img
          src={logo}
          alt='logo'
          width={'75px'}
          height={'75px'}
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
          2 <sup>nd</sup> Term 2025–26
        </p>
      </div>

      {/* Student Info */}
      <div className='mb-2 leading-7'>
        <p>
          <b>Class:</b> {String(student.class).toUpperCase()}
        </p>
        <p>
          <b>Name:</b> {student.name}
        </p>
        <p>
          <b>Roll no:</b> {student.rollNumber}
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

      {/* Record */}
      <p className='text-center font-semibold text-red-600 mb-2 underline'>
        Record of Academic Performance
      </p>

      {/* Table */}
      <table className='w-full border border-black text-center'>
        <thead>
          <tr className='bg-[#ccffcc] border border-black'>
            <th className='border border-black p-2 uppercase'>SUBJECT</th>
            <th className='border border-black p-2 uppercase'>
              Obtained marks
            </th>
            <th className='border border-black p-2 uppercase'>Full marks</th>
          </tr>
        </thead>

        <tbody>
          {[
            ['ENGLISH', report.english, 50],
            ['MATH', report.math, 50],
            ['HINDI', report.hindi, 50],
            ['GENERAL KNOWLEDGE', report.gk, 50],
            ['SOCIAL STUDIES', report.socialStudies, 50],
            ['SCIENCE', report.science, 50],
            ['EVS/ART', report.art, '-']
          ].map((row, i) => (
            <tr key={i}>
              <td className='border border-black p-2 bg-[#ccffcc] font-semibold'>
                {row[0]}
              </td>
              <td className='border border-black p-2'>{row[1]}</td>
              <td className='border border-black p-2'>{row[2]}</td>
            </tr>
          ))}

          {[
            ['TOTAL OBTAINED MARK', `${report.totalMarks}`],
            ['TOTAL FULL MARKS', '300'],
            ['PERCENTAGE (%)', report.percentage.toFixed(2)],
            ['DEVISION', report.division],
            ['GRADE', report.grade],
            ['POSITION', ''],
            ['ATTENDANCE', report.attendance],
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
      <div className='flex justify-between mt-10 text-[16px]'>
        <p>
          <b>Teacher’s Signature</b>
        </p>
        <p>
          <b>Principal’s Signature & Seal</b>
        </p>
      </div>
    </div>
  )
})

export default PrintableReport
