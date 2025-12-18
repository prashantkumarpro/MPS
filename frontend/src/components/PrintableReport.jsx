import React, { forwardRef } from 'react'
import logo from '../assets/logo.webp'
import { useNavigate } from 'react-router'
import {
  getMarkCellClass,
  getPositionText,
  getSubjectRows,
  getTotalFullMarks
} from '../utils/reportUtils'

const PrintableReport = forwardRef(({ student, report }, ref) => {
  const navigate = useNavigate()

  // ✅ All subject logic handled by utils
  const subjectRows = getSubjectRows(report, student.class)

  // ✅ Full marks logic handled by utils
  const totalFullMarks = getTotalFullMarks(student.class)

  return (
    <>
      {/* Back Button */}
      <div className="flex justify-center my-4">
        <button
          onClick={() => navigate('/check-result')}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
        >
          Check Another Result
        </button>
      </div>

      {/* Printable Area */}
      <div
        ref={ref}
        className="bg-white pb-4 px-4 border border-black shadow-lg text-[15px]"
      >
        {/* Logo */}
        <div>
          <img
            src={logo}
            alt="logo"
            width="65"
            height="65"
            className="m-auto block"
            loading="lazy"
          />
        </div>

        {/* School Header */}
        <div className="text-center mb-0">
          <h1 className="text-2xl font-bold text-sky-700">
            MAX PUBLIC SCHOOL
          </h1>
          <p className="text-xl text-sky-600 uppercase">
            “An English Medium Co-Educational School”
          </p>
          <h2 className="text-xl font-semibold text-sky-600 uppercase">
            Class Progress Report
          </h2>
          <p className="text-lg font-semibold uppercase text-sky-600">
            2<sup>nd</sup> Term 2025–26
          </p>
        </div>

        {/* Student Info */}
        <div className="mb-2 leading-7">
          <p>
            <b>Class:</b>{' '}
            <span className="font-semibold">
              {String(student.class).toUpperCase()}
            </span>
          </p>
          <p>
            <b>Name:</b>{' '}
            <span className="font-semibold">{student.name}</span>
          </p>
          <p>
            <b>Roll no:</b>{' '}
            <span className="font-semibold">{student.rollNumber}</span>
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

        {/* Notes */}
        <p className="text-center font-semibold text-red-600 mb-2 underline">
          Record of Academic Performance
        </p>
        <p className="uppercase text-center font-semibold mb-2 underline italic">
          <b>Note:</b> passing marks for each subject is 15.
        </p>

        {/* Marks Table */}
        <table className="w-full border border-black text-center">
          <thead>
            <tr className="bg-[#ccffcc] border border-black">
              <th className="border border-black p-2 uppercase">
                Subject
              </th>
              <th className="border border-black p-2 uppercase">
                Obtained Marks
              </th>
              <th className="border border-black p-2 uppercase">
                Full Marks
              </th>
            </tr>
          </thead>

          <tbody>
            {/* Subject Rows */}
            {subjectRows.map((row, i) => (
              <tr key={i}>
                <td className="border border-black p-2 bg-[#ccffcc] font-semibold">
                  {row[0]}
                </td>
                <td
                  className={`border border-black p-2 ${getMarkCellClass(
                    row[1]
                  )}`}
                >
                  {row[1] ?? 'Absent'}
                </td>
                <td className="border border-black p-2">
                  {row[2]}
                </td>
              </tr>
            ))}

            {/* Summary Rows */}
            {[
              ['TOTAL OBTAINED MARK', report.totalMarks],
              ['TOTAL FULL MARKS', totalFullMarks],
              ['PERCENTAGE (%)', report.percentage?.toFixed(2)],
              ['RESULT', report.division?.toUpperCase()],
              [
                'GRADE',
                report.division === 'Fail' ? '' : report.grade
              ],
              [
                'POSITION',
                report.division === 'Fail'
                  ? ''
                  : getPositionText(report.position)
              ],
              ['ATTENDANCE', `${report.attendance}/89`],
              ['REMARKS', report.remarks]
            ].map((row, i) => (
              <tr key={i}>
                <td className="border border-black p-2 bg-[#ccffcc] font-semibold">
                  {row[0]}
                </td>
                <td className="border border-black p-2" colSpan={2}>
                  {row[1]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Signatures (optional) */}
        {/* 
        <div className="flex justify-between mt-10 text-[16px]">
          <p><b>Teacher’s Signature</b></p>
          <p><b>Principal’s Signature & Seal</b></p>
        </div>
        */}
      </div>
    </>
  )
})

export default PrintableReport
