import { useContext, useEffect, useState } from 'react'

import AddReportModal from '../components/AddReportModal'

import {
  getReports,
  deleteReport as deleteReportApi,
  fetchStudentById
} from '../../api'
import ConfirmModal from '../components/ConfirmModal'
import { ReportContext } from '../../context/ReportContext'
import { useNavigate } from 'react-router'

const Reports = () => {
  const [reports, setReports] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedId, setSelectedId] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const reportsPerPage = 10

  const { setStudent, setReport } = useContext(ReportContext)

  const navigate = useNavigate()
  // ===============================
  // PAGINATION
  // ===============================
  const totalPages = Math.ceil(reports.length / reportsPerPage)
  const startIndex = (currentPage - 1) * reportsPerPage
  const endIndex = startIndex + reportsPerPage
  const currentReports = reports.slice(startIndex, endIndex)

  // ===============================
  // FETCH REPORTS
  // ===============================
  const fetchReports = async () => {
    try {
      const data = await getReports()

      setReports(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchReports()
  }, [])

  // ---------------- VIEW REPORT ----------------
  const viewHandler = report => {
    setStudent(report.studentId)

    setReport(report)

    navigate('/result')
  }

  const editHandler = () => {
    console.log('clicked')
    alert("Work in progress")
  }
  // ===============================
  // DELETE REPORT
  // ===============================
  // ---------------- DELETE REPORT ----------------
  const deleteReport = async () => {
    if (!selectedId) return

    try {
      const res = await deleteReportApi(selectedId)

      if (res.success) {
        toast.success('Report deleted successfully 🗑️')

        fetchReports()
      } else {
        toast.error(res.error || 'Failed to delete report')
      }
    } catch (error) {
      console.log(error)

      toast.error('Failed to delete report')
    } finally {
      setIsDeleteModalOpen(false)

      setSelectedId(null)
    }
  }

  return (
    <div
      className='
      min-h-screen

      bg-slate-50

      p-4
      md:p-6
    '
    >
      {/* TOP */}
      <div
        className='
        flex
        flex-col

        gap-4

        md:flex-row
        md:items-center
        md:justify-between

        mb-6
      '
      >
        {/* LEFT */}
        <div>
          <h1
            className='
            text-2xl
            md:text-3xl

            font-semibold

            text-slate-900
          '
          >
            Results
          </h1>

          <p
            className='
            text-sm
            text-slate-500

            mt-1
          '
          >
            Manage student reports
          </p>
        </div>

        {/* RIGHT */}
        <div
          className='
          flex
          items-center

          gap-3
        '
        >
          {/* SEARCH */}
          <input
            type='text'
            placeholder='Search...'
            className='
            h-10

            w-full
            sm:w-60

            rounded-lg

            border
            border-slate-200

            bg-white

            px-3

            text-sm

            outline-none

            focus:border-slate-400
          '
          />

          {/* BUTTON */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className='
            h-10

            whitespace-nowrap

            rounded-lg

            bg-slate-900
            hover:bg-black

            px-4

            text-sm
            font-medium

            text-white

            transition-all
          '
          >
            Add Result
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div
        className='
        overflow-hidden

        rounded-xl

        border
        border-slate-200

        bg-white
      '
      >
        {/* DESKTOP HEADER */}
        <div
          className='
          hidden
          md:grid

          grid-cols-[2fr_1fr_1fr_1fr_1fr_1.5fr]

          gap-4

          border-b
          border-slate-200

          bg-slate-50

          px-5
          py-3
        '
        >
          {['Student', 'Class', 'Term', 'Percentage', 'Grade', 'Actions'].map(
            item => (
              <p
                key={item}
                className='
              text-xs
              font-semibold

              uppercase

              tracking-wide

              text-slate-500
            '
              >
                {item}
              </p>
            )
          )}
        </div>

        {/* EMPTY */}
        {currentReports.length === 0 && (
          <div
            className='
            py-20

            text-center
          '
          >
            <p
              className='
              text-sm
              text-slate-500
            '
            >
              No reports found
            </p>
          </div>
        )}

        {/* REPORTS */}
        {currentReports.map(report => (
          <div
            key={report._id}
            className='
            border-b
            border-slate-100

            last:border-b-0

            hover:bg-slate-50

            transition-colors
          '
          >
            {/* DESKTOP */}
            <div
              className='
              hidden
              md:grid

              grid-cols-[2fr_1fr_1fr_1fr_1fr_1.5fr]

              gap-4

              items-center

              px-5
              py-4
            '
            >
              {/* STUDENT */}
              <div>
                <h3
                  className='
                  text-sm
                  font-medium

                  text-slate-900
                '
                >
                  {report.studentId?.name}
                </h3>

                <p
                  className='
                  text-xs
                  text-slate-500

                  mt-1
                '
                >
                  Roll: {report.studentId?.rollNumber}
                </p>
              </div>

              {/* CLASS */}
              <p
                className='
                text-sm
                text-slate-700
              '
              >
                {report.studentId?.class}
              </p>

              {/* TERM */}
              <p
                className='
                text-sm
                text-slate-700
              '
              >
                {report.term?.replace('_', ' ')}
              </p>

              {/* PERCENT */}
              <p
                className='
                text-sm
                font-medium

                text-slate-900
              '
              >
                {report.percentage?.toFixed(1)}%
              </p>

              {/* GRADE */}
              <div>
                <span
                  className={`
                  inline-flex
                  items-center

                  rounded-md

                  px-2
                  py-1

                  text-xs
                  font-medium

                  ${
                    report.grade === 'A'
                      ? `
                        bg-green-100
                        text-green-700
                      `
                      : report.grade === 'B'
                      ? `
                        bg-blue-100
                        text-blue-700
                      `
                      : `
                        bg-red-100
                        text-red-700
                      `
                  }
                `}
                >
                  {report.grade}
                </span>
              </div>

              {/* ACTIONS */}
              <div
                className='
                flex
                items-center

                gap-2
              '
              >
                <button
                  className='
                  text-xs
                  font-medium

                  text-slate-600

                  hover:text-slate-900
                '
                  onClick={() => viewHandler(report)}
                >
                  View
                </button>

                <button
                  className='
                  text-xs
                  font-medium

                  text-blue-600

                  hover:text-blue-800
                '
                  onClick={() => {
                    editHandler()
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    setSelectedId(report._id)

                    setIsDeleteModalOpen(true)
                  }}
                  className='
    text-xs
    font-medium

    text-red-600

    hover:text-red-800
  '
                >
                  Delete
                </button>
              </div>
            </div>

            {/* MOBILE */}
            <div
              className='
              md:hidden

              px-4
              py-4
            '
            >
              {/* TOP */}
              <div
                className='
                flex
                items-start
                justify-between
              '
              >
                {/* LEFT */}
                <div>
                  <h3
                    className='
                    text-sm
                    font-medium

                    text-slate-900
                  '
                  >
                    {report.studentId?.name}
                  </h3>

                  <p
                    className='
                    text-xs
                    text-slate-500

                    mt-1
                  '
                  >
                    {report.studentId?.class} • Roll:{' '}
                    {report.studentId?.rollNumber}
                  </p>
                </div>

                {/* PERCENT */}
                <div
                  className='
                  text-right
                '
                >
                  <p
                    className='
                    text-sm
                    font-semibold

                    text-slate-900
                  '
                  >
                    {report.percentage?.toFixed(0)}%
                  </p>

                  <p
                    className='
                    text-[11px]
                    text-slate-500
                  '
                  >
                    {report.grade}
                  </p>
                </div>
              </div>

              {/* BOTTOM */}
              <div
                className='
                flex
                items-center
                justify-between

                mt-3
              '
              >
                <p
                  className='
                  text-xs
                  text-slate-500
                '
                >
                  {report.term?.replace('_', ' ')}
                </p>

                {/* ACTIONS */}
                <div
                  className='
                  flex
                  items-center

                  gap-3
                '
                >
                  <button
                    className='
                    text-xs
                    font-medium

                    text-slate-600
                  '
                    onClick={() => viewHandler(report)}
                  >
                    View
                  </button>

                  <button
                    className='
                    text-xs
                    font-medium

                    text-blue-600
                  '
                  onClick={() => {
                    editHandler()
                  }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteReport(report._id)}
                    className='
                    text-xs
                    font-medium

                    text-red-600
                  '
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {reports.length > reportsPerPage && (
        <div
          className='
          flex
          items-center
          justify-between

          mt-5
        '
        >
          {/* PREV */}
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className='
            h-9

            rounded-lg

            border
            border-slate-200

            bg-white

            px-4

            text-sm

            disabled:opacity-40
          '
          >
            Previous
          </button>

          {/* INFO */}
          <p
            className='
            text-sm
            text-slate-500
          '
          >
            Page {currentPage} of {totalPages}
          </p>

          {/* NEXT */}
          <button
            onClick={() =>
              setCurrentPage(prev => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className='
            h-9

            rounded-lg

            border
            border-slate-200

            bg-white

            px-4

            text-sm

            disabled:opacity-40
          '
          >
            Next
          </button>
        </div>
      )}

      {/* MODAL */}
      <AddReportModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        fetchReports={fetchReports}
      />
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={deleteReport}
        title='Delete Report'
        message='This action cannot be undone. Are you sure?'
      />
    </div>
  )
}

export default Reports
