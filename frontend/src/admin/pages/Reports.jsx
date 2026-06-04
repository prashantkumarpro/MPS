import { useContext, useEffect, useMemo, useState } from 'react'
import ReportFormModal from '../components/ReportFormModal'
import { getReports, deleteReport as deleteReportApi } from '../../api'
import ConfirmModal from '../components/ConfirmModal'
import { ReportContext } from '../../context/ReportContext'
import { useNavigate } from 'react-router'
import SelectBox from '../../components/SelectBox'
import {
  Plus,
  Search,
  ChevronsLeft,
  ChevronsRight,
  Eye,
  Pencil,
  Trash2
} from 'lucide-react'
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
    sm:p-5

    grid
    grid-cols-2
    lg:grid-cols-4

    gap-4
  '
      >
        <SelectBox
          label='CLASS'
          value={selectedClass}
          onChange={value => {
            setFormState(prev => ({
              ...prev,
              selectedClass: value.target.value
            }))
          }}
          options={classOptions}
          placeholder='Class'
        />

        <SelectBox
          label='SORT BY'
          value={sortBy}
          onChange={value => {
            setFormState(prev => ({
              ...prev,
              sortBy: value.target.value
            }))
          }}
          options={sortOptions.filter(option => option.value !== 'position')}
          placeholder='Sort'
        />

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
      <br />

      {loading ? (
        <div className='overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm'>
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className='
          animate-pulse

          border-b
          border-slate-100

          px-6
          py-5
        '
            >
              <div className='hidden md:grid grid-cols-[2.5fr_1fr_1fr_1fr_0.8fr_1fr] gap-4 items-center'>
                {/* Student */}
                <div className='flex items-center gap-3'>
                  <div className='h-10 w-10 rounded-xl bg-slate-200' />

                  <div>
                    <div className='h-4 w-32 rounded bg-slate-200' />
                    <div className='h-3 w-20 rounded bg-slate-100 mt-2' />
                  </div>
                </div>

                <div className='h-4 w-16 rounded bg-slate-200' />
                <div className='h-4 w-20 rounded bg-slate-200' />
                <div className='h-4 w-16 rounded bg-slate-200' />
                <div className='h-8 w-10 rounded-full bg-slate-200' />

                <div className='flex gap-2'>
                  <div className='h-9 w-9 rounded-lg bg-slate-200' />
                  <div className='h-9 w-9 rounded-lg bg-slate-200' />
                  <div className='h-9 w-9 rounded-lg bg-slate-200' />
                </div>
              </div>

              {/* Mobile */}
              <div className='md:hidden p-3'>
                <div
                  className='
      animate-pulse

      rounded-2xl

      border
      border-slate-200

      bg-white

      p-4
    '
                >
                  {/* Header */}
                  <div className='flex items-start justify-between gap-3'>
                    <div className='flex items-center gap-3 flex-1'>
                      <div className='h-11 w-11 rounded-xl bg-slate-200' />

                      <div className='flex-1'>
                        <div className='h-4 w-32 rounded bg-slate-200' />

                        <div className='h-3 w-24 rounded bg-slate-100 mt-2' />
                      </div>
                    </div>

                    <div className='h-8 w-10 rounded-full bg-slate-200' />
                  </div>

                  {/* Term + Score */}
                  <div
                    className='
        mt-4

        py-3

        border-y
        border-slate-100

        flex
        items-center
        justify-between
      '
                  >
                    <div>
                      <div className='h-3 w-10 rounded bg-slate-100' />
                      <div className='h-4 w-16 rounded bg-slate-200 mt-2' />
                    </div>

                    <div className='text-right'>
                      <div className='h-3 w-12 rounded bg-slate-100 ml-auto' />
                      <div className='h-5 w-16 rounded bg-slate-200 mt-2 ml-auto' />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className='flex justify-end gap-2 mt-3'>
                    <div className='h-9 w-9 rounded-lg bg-slate-200' />
                    <div className='h-9 w-9 rounded-lg bg-slate-200' />
                    <div className='h-9 w-9 rounded-lg bg-slate-200' />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className='
    overflow-hidden

    rounded-3xl

    border
    border-slate-200

    bg-white

    shadow-sm
  '
        >
          {/* TABLE HEADER */}
          <div
            className='
      hidden
      md:grid

      grid-cols-[2.5fr_1fr_1fr_1fr_0.8fr_1fr]

      gap-4

      px-6
      py-4

      bg-slate-50

      border-b
      border-slate-200

      text-xs
      font-semibold

      uppercase

      tracking-wider

      text-slate-500
    '
          >
            <div>Student</div>
            <div>Class</div>
            <div>Term</div>
            <div>Percentage</div>
            <div>Grade</div>
            <div>Actions</div>
          </div>

          {/* REPORTS */}
          {!loading &&
            currentReports.map(report => {
              const initials =
                report.studentId?.name
                  ?.split(' ')
                  ?.map(word => word[0])
                  ?.slice(0, 2)
                  ?.join('')
                  ?.toUpperCase() || 'S'

              return (
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
            grid-cols-[2.5fr_1fr_1fr_1fr_0.8fr_1fr]
            gap-4
            items-center
            px-6
            py-5
          '
                  >
                    {/* STUDENT */}
                    <div className='flex items-center gap-3'>
                      <div
                        className='
                h-9
                w-9
                rounded-full
                bg-blue-100
                text-blue-700
                flex
                items-center
                justify-center
                text-xs
                font-semibold
              '
                      >
                        {initials}
                      </div>

                      <div>
                        <h3 className='text-sm font-medium text-slate-900'>
                          {report.studentId?.name}
                        </h3>

                        <p className='text-xs text-slate-500 mt-1'>
                          Roll #{report.studentId?.rollNumber}
                        </p>
                      </div>
                    </div>

                    {/* CLASS */}
                    <p className='text-sm text-slate-700'>
                      {report.studentId?.class}
                    </p>

                    {/* TERM */}
                    <p className='text-sm text-slate-700'>
                      {report.term?.replace('_', ' ')}
                    </p>

                    {/* PERCENTAGE */}
                    <p className='text-sm font-semibold text-slate-900'>
                      {report.percentage?.toFixed(1)}%
                    </p>

                    {/* GRADE */}
                    <div>
                      <span
                        className={`
                inline-flex
                items-center
                justify-center
                min-w-[36px]
                h-8
                rounded-full
                text-xs
                font-semibold

                ${
                  report.grade === 'A'
                    ? 'bg-green-100 text-green-700'
                    : report.grade === 'B'
                    ? 'bg-blue-100 text-blue-700'
                    : report.grade === 'C'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }
              `}
                      >
                        {report.grade}
                      </span>
                    </div>

                    {/* ACTIONS */}
                    <div className='flex items-center gap-4'>
                      <button
                        onClick={() => viewHandler(report)}
                        className='
                text-slate-500
                hover:text-slate-900
                transition-colors
              '
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => editHandler(report)}
                        className='
                text-blue-600
                hover:text-blue-700
                transition-colors
              '
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => {
                          setSelectedId(report._id)
                          setIsDeleteModalOpen(true)
                        }}
                        className='
                text-red-500
                hover:text-red-600
                transition-colors
              '
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  {/* MOBILE */}
                  {/* MOBILE */}
                  <div className='md:hidden p-3'>
                    <div
                      className='
      bg-white

      rounded-2xl

      border
      border-slate-200

      p-4

      shadow-sm
    '
                    >
                      {/* TOP */}
                      <div className='flex items-start justify-between gap-3'>
                        <div className='flex items-center gap-3 min-w-0'>
                          <div
                            className='
            h-11
            w-11

            shrink-0

            rounded-xl

            bg-gradient-to-br
            from-blue-600
            to-indigo-600

            text-white

            flex
            items-center
            justify-center

            text-sm
            font-bold
          '
                          >
                            {initials}
                          </div>

                          <div className='min-w-0'>
                            <h3
                              className='
              text-sm
              font-semibold

              text-slate-900

              truncate
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
                              Roll #{report.studentId?.rollNumber}
                              {' • '}
                              {report.studentId?.class}
                            </p>
                          </div>
                        </div>

                        {/* Grade */}
                        <span
                          className={`
          flex
          items-center
          justify-center

          h-8
          min-w-[32px]

          px-2

          rounded-full

          text-xs
          font-bold

          ${
            report.grade === 'A'
              ? 'bg-green-100 text-green-700'
              : report.grade === 'B'
              ? 'bg-blue-100 text-blue-700'
              : report.grade === 'C'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-red-100 text-red-700'
          }
        `}
                        >
                          {report.grade}
                        </span>
                      </div>

                      {/* TERM + SCORE */}
                      <div
                        className='
        flex
        items-center
        justify-between

        mt-4

        py-3

        border-y
        border-slate-100
      '
                      >
                        <div>
                          <p
                            className='
            text-[11px]

            uppercase

            tracking-wider

            text-slate-400
          '
                          >
                            Term
                          </p>

                          <p
                            className='
            mt-1

            text-sm

            font-semibold

            text-slate-800
          '
                          >
                            {report.term?.replace('_', ' ')}
                          </p>
                        </div>

                        <div className='text-right'>
                          <p
                            className='
            text-[11px]

            uppercase

            tracking-wider

            text-slate-400
          '
                          >
                            Score
                          </p>

                          <p
                            className='
            mt-1

            text-lg

            font-bold

            text-slate-900
          '
                          >
                            {report.percentage?.toFixed(1)}%
                          </p>
                        </div>
                      </div>

                      {/* ACTIONS */}
                      <div className='flex items-center justify-end gap-2 mt-3'>
                        <button
                          onClick={() => viewHandler(report)}
                          className='
          h-9
          w-9

          rounded-lg

          flex
          items-center
          justify-center

          text-slate-500

          hover:bg-slate-100
          hover:text-blue-600

          transition-all
        '
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          onClick={() => editHandler(report)}
                          className='
          h-9
          w-9

          rounded-lg

          flex
          items-center
          justify-center

          text-slate-500

          hover:bg-amber-50
          hover:text-amber-600

          transition-all
        '
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          onClick={() => {
                            setSelectedId(report._id)
                            setIsDeleteModalOpen(true)
                          }}
                          className='
          h-9
          w-9

          rounded-lg

          flex
          items-center
          justify-center

          text-slate-500

          hover:bg-red-50
          hover:text-red-600

          transition-all
        '
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      )}

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
