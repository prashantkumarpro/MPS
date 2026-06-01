import { useContext, useEffect, useMemo, useState } from 'react'
import ReportFormModal from '../components/ReportFormModal'
import { getReports, deleteReport as deleteReportApi } from '../../api'
import ConfirmModal from '../components/ConfirmModal'
import { ReportContext } from '../../context/ReportContext'
import { useNavigate } from 'react-router'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import SelectBox from '../../components/SelectBox'
import { Plus, Search } from 'lucide-react'
import {
  classOptions,
  sortOptions,
  termOptions,
  yearOptions
} from '../../constants/reportOptions'
import { useLocalStorage } from '../../hooks/useLocalStorage'

const Reports = () => {
  const [reports, setReports] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedId, setSelectedId] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const [loading, setLoading] = useState(true)

  const [selectedReport, setSelectedReport] = useState(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const [search, setSearch] = useState('')
  const reportsPerPage = 10

  const { setStudent, setReport } = useContext(ReportContext)

  const navigate = useNavigate()

  const [formState, setFormState] = useLocalStorage('termYear', {
    selectedClass: '',
    term: '',
    academicYear: '',
    sortBy: ''
  })

  const { selectedClass, term, academicYear, sortBy } = formState

  // ===============================
  // FETCH REPORTS
  // ===============================
  const fetchReports = async () => {
    try {
      setLoading(true)

      const data = await getReports({
        className: selectedClass,
        term,
        academicYear
      })

      setReports(data?.data || [])
    } catch (error) {
      console.log(error)

      setReports([])
    } finally {
      setLoading(false)
    }
  }

  // ===============================
  // FETCH WHEN FILTERS CHANGE
  // ===============================
  useEffect(() => {
    if (!selectedClass || !term || !academicYear) {
      setReports([])
      setLoading(false)
      return
    }

    fetchReports()
  }, [selectedClass, term, academicYear])

  // ===============================
  // RESET PAGE ON FILTER/SORT CHANGE
  // ===============================
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedClass, term, academicYear, sortBy])

  const filteredReports = useMemo(() => {
    if (!search.trim()) return reports

    return reports.filter(report =>
      report.studentId?.name?.toLowerCase().includes(search.toLowerCase())
    )
  }, [reports, search])

  // ===============================
  // FRONTEND SORTING
  // ===============================
  const sortedReports = useMemo(() => {
    const sorted = [...filteredReports]

    switch (sortBy) {
      case 'roll':
        sorted.sort(
          (a, b) =>
            (a.studentId?.rollNumber || 0) - (b.studentId?.rollNumber || 0)
        )
        break

      case 'name':
        sorted.sort((a, b) =>
          (a.studentId?.name || '').localeCompare(b.studentId?.name || '')
        )
        break

      default:
        break
    }

    return sorted
  }, [filteredReports, sortBy])

  // ===============================
  // PAGINATION
  // ===============================
  const totalPages = Math.max(
    1,
    Math.ceil(sortedReports.length / reportsPerPage)
  )

  const currentReports = useMemo(() => {
    const startIndex = (currentPage - 1) * reportsPerPage

    return sortedReports.slice(startIndex, startIndex + reportsPerPage)
  }, [sortedReports, currentPage, reportsPerPage])

  // ---------------- VIEW REPORT ----------------
  const viewHandler = report => {
    setStudent(report.studentId)

    setReport(report)

    navigate('/result')
  }

  // ---------------- EDIT REPORT ----------------
  const editHandler = report => {
    setSelectedReport(report)

    setIsEditModalOpen(true)
  }
  // ===============================
  // DELETE REPORT
  // ===============================
  const deleteReport = async () => {
    if (!selectedId) return

    const idToDelete = selectedId

    try {
      const res = await deleteReportApi(idToDelete)

      if (res.success) {
        // ✅ Instant UI update
        setReports(prev => prev.filter(report => report._id !== idToDelete))

        toast.success('Report deleted successfully 🗑️')
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
    flex-col
    sm:flex-row

    items-stretch
    sm:items-center

    gap-3
  '
        >
          {/* SEARCH */}
          <div className='relative'>
            <Search
              size={16}
              className='
        absolute
        left-3
        top-1/2
        -translate-y-1/2

        text-slate-400
      '
            />

            <input
              type='text'
              placeholder='Search student...'
              className='
        h-11

        w-full
        sm:w-64

        rounded-xl

        border
        border-slate-200

        bg-white

        pl-10
        pr-4

        text-sm

        outline-none

        transition-all

        focus:border-blue-500
        focus:ring-4
        focus:ring-blue-50
      '
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className='
      group

      flex
      items-center
      justify-center

      gap-2

      h-11

      rounded-xl

      bg-gradient-to-r
      from-blue-600
      to-indigo-600

      px-5

      text-sm
      font-semibold

      text-white

      shadow-md
      shadow-blue-100

      transition-all
      duration-300

      hover:-translate-y-0.5
      hover:shadow-lg
      hover:shadow-blue-200

      active:scale-[0.98]
    '
          >
            <Plus size={18} strokeWidth={2.5} />

            <span>Add Result</span>
          </button>
        </div>
      </div>

      {/* FILTERE */}
      <div
        className='
    bg-white

    rounded-2xl

    border
    border-slate-200

    shadow-sm

    p-4
  '
      >
        <div
          className='
      flex

      gap-3

      overflow-x-auto

      scrollbar-none
      [-ms-overflow-style:none]
      [scrollbar-width:none]

      [&::-webkit-scrollbar]:hidden
    '
        >
          <div className='min-w-[140px]'>
            <SelectBox
              label='CLASS'
              value={selectedClass}
              onChange={value => {
                setFormState(prev => ({
                  ...prev,
                  selectedClass: value.target.value
                }))
                setPage(1)
              }}
              options={classOptions}
              placeholder='Class'
            />
          </div>

          <div className='min-w-[140px]'>
            <SelectBox
              label='SORT BY'
              value={sortBy}
              onChange={value => {
                setFormState(prev => ({
                  ...prev,
                  sortBy: value.target.value
                }))
              }}
              options={sortOptions.filter(
                option => option.value !== 'position'
              )}
              placeholder='Sort'
            />
          </div>

          <div className='min-w-[140px]'>
            <SelectBox
              label='TERM'
              value={term}
              onChange={value => {
                setFormState(prev => ({
                  ...prev,
                  term: value.target.value
                }))
              }}
              options={termOptions}
              placeholder='Term'
            />
          </div>

          <div className='min-w-[140px]'>
            <SelectBox
              label='YEAR'
              value={academicYear}
              onChange={value => {
                setFormState(prev => ({
                  ...prev,
                  academicYear: value.target.value
                }))
              }}
              options={yearOptions}
              placeholder='Year'
            />
          </div>
        </div>
      </div>
      <br />

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

        {/* SKELETON */}
        {loading && (
          <>
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className='
            border-b
            border-slate-100

            animate-pulse
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
                  <div>
                    <div className='h-4 w-32 rounded bg-slate-200'></div>

                    <div className='h-3 w-20 rounded bg-slate-100 mt-2'></div>
                  </div>

                  <div className='h-4 w-16 rounded bg-slate-200'></div>

                  <div className='h-4 w-20 rounded bg-slate-200'></div>

                  <div className='h-4 w-14 rounded bg-slate-200'></div>

                  <div className='h-6 w-10 rounded-md bg-slate-200'></div>

                  <div className='flex items-center gap-2'>
                    <div className='h-4 w-10 rounded bg-slate-200'></div>

                    <div className='h-4 w-10 rounded bg-slate-200'></div>

                    <div className='h-4 w-12 rounded bg-slate-200'></div>
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
                  <div className='flex items-start justify-between'>
                    <div>
                      <div className='h-4 w-28 rounded bg-slate-200'></div>

                      <div className='h-3 w-24 rounded bg-slate-100 mt-2'></div>
                    </div>

                    <div>
                      <div className='h-4 w-12 rounded bg-slate-200'></div>

                      <div className='h-3 w-6 rounded bg-slate-100 mt-2'></div>
                    </div>
                  </div>

                  <div className='flex items-center justify-between mt-4'>
                    <div className='h-3 w-20 rounded bg-slate-100'></div>

                    <div className='flex items-center gap-3'>
                      <div className='h-3 w-8 rounded bg-slate-200'></div>

                      <div className='h-3 w-8 rounded bg-slate-200'></div>

                      <div className='h-3 w-10 rounded bg-slate-200'></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {/* EMPTY */}
        {!loading && currentReports.length === 0 && (
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
        {!loading &&
          currentReports.map(report => (
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
                      editHandler(report)
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
                        editHandler(report)
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
      flex flex-col sm:flex-row
      justify-between items-center
      gap-4

      mt-6
      p-4

      bg-white
      rounded-xl
      shadow-sm
      border
    '
        >
          {/* PAGE INFO */}
          <div className='flex items-center gap-2 text-sm text-gray-600'>
            <span className='px-3 py-1 rounded-full bg-gray-100'>
              Page{' '}
              <span className='font-semibold text-gray-800'>{currentPage}</span>
            </span>

            <span className='text-gray-300'>/</span>

            <span className='px-3 py-1 rounded-full bg-gray-100'>
              {totalPages} Pages
            </span>
          </div>

          {/* CONTROLS */}
          <div className='flex items-center gap-2'>
            {/* PREV */}
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-full border transition-all duration-200 flex items-center justify-center
        ${
          currentPage === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-gray-100 hover:scale-110 shadow-sm'
        }`}
            >
              <ChevronsLeft size={18} />
            </button>

            {/* CURRENT PAGE */}
            <div className='px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold shadow'>
              {currentPage}
            </div>

            {/* NEXT */}
            <button
              onClick={() =>
                setCurrentPage(prev => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full border transition-all duration-200 flex items-center justify-center
        ${
          currentPage === totalPages
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-gray-100 hover:scale-110 shadow-sm'
        }`}
            >
              <ChevronsRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ADD MODAL */}
      <ReportFormModal
        mode='add'
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        fetchReports={fetchReports}
      />

      {/* EDIT MODAL */}
      <ReportFormModal
        mode='edit'
        report={selectedReport}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)

          setSelectedReport(null)
        }}
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
