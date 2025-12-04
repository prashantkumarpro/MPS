import React, { useContext, useRef } from 'react'
import { ReportContext } from '../context/ReportContext'
import { useReactToPrint } from 'react-to-print'
import PrintableReport from '../components/PrintableReport'

export default function ResultPage () {
  const { student, report } = useContext(ReportContext)
  const printRef = useRef()
  console.log(report)
  if (!student || !report) return <p>No data found.</p>

  const handlePrint = useReactToPrint({
    contentRef: printRef, // <-- v3 uses contentRef
    documentTitle: `${student.name}-ReportCard`,
    pageStyle: `
      @page { size: A4; margin: 12mm; }
      body { -webkit-print-color-adjust: exact !important; }
    `
  })

  return (
    <div className='max-w-3xl mx-auto mt-24'>
      {/* Printable Component */}
      <PrintableReport ref={printRef} student={student} report={report} />
      {/* Download Button */}
      <div className='text-right mb-4 mt-4'>
        <button
          onClick={handlePrint}
          className='bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700'
        >
          Download Result
        </button>
      </div>
    </div>
  )
}
