import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import {
  fetchStudents,
  fetchStudentById,
  updateStudent,
  addStudent,
  deleteStudent
} from '../../api/index.js'
import EditStudentModal from '../components/EditStudentModal'
import { useNavigate } from 'react-router'
import { Pencil, Eye, Trash2, EyeIcon, GraduationCap } from 'lucide-react'
import AddStudentModal from '../components/AddStudentModal.jsx'
import { useLocalStorage } from '../../hooks/useLocalStorage.js'
import ConfirmModal from '../components/ConfirmModal.jsx'
import { ChevronsLeft, ChevronsRight, Plus } from 'lucide-react'
import { classOptions, sortOptions } from '../../constants/reportOptions.js'
import SelectBox from '../../components/SelectBox.jsx'

export default function Students () {
  // ---------------- STATE ----------------
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)

  const [openAddModal, setOpenAddModal] = useState(false)
  const [saving, setSaving] = useState(false)

  const [editStudent, setEditStudent] = useState(null)
  const [editing, setEditing] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState(null)

  const [formState, setFormState] = useLocalStorage('termYear', {
    selectedClass: '',
    sortBy: ''
  })

  const { selectedClass, sortBy } = formState

  const navigate = useNavigate()
  // ---------------- LOAD STUDENTS (REUSABLE) ----------------
  const loadStudents = async () => {
    try {
      setLoading(true)

      const res = await fetchStudents({
        page,
        limit,
        className: selectedClass,
        sort: sortBy
      })

      setStudents(res.data || [])
      setTotalPages(res.totalPages || 1)
    } catch (error) {
      console.error(error)
      toast.error('Failed to load students')
    } finally {
      setLoading(false)
    }
  }

  // ---------------- INITIAL & DEPENDENT LOAD ----------------
  useEffect(() => {
    loadStudents()
  }, [page, selectedClass, sortBy])

  // ---------------- EDIT SUBMIT HANDLER ----------------
  const handleEditStudent = async e => {
    e.preventDefault()
    setEditing(true)

    const form = e.target

    const payload = {
      name: form.name.value,
      parents: {
        fatherName: form.fatherName.value,
        motherName: form.motherName.value,
        mobile: form.mobile.value
      },
      personal: {
        dob: form.dob.value,
        address: form.address.value
      }
    }

    const res = await updateStudent(editStudent._id, payload)

    if (res.success) {
      toast.success('Student updated successfully 🎉') // ✅ SUCCESS TOAST
      setEditStudent(null)
      loadStudents()
    } else {
      toast.error(res.error || 'Failed to update student') // ❌ ERROR TOAST
    }

    setEditing(false)
  }

  // ---------------- Delete HANDLER ----------------
  const handleConfirmDelete = async () => {
    if (!selectedId) return

    const res = await deleteStudent(selectedId)

    if (res.success) {
      toast.success('Student deleted successfully 🗑️')
      loadStudents()
    } else {
      toast.error(res.error || 'Failed to delete student')
    }

    setIsModalOpen(false)
    setSelectedId(null)
  }

  const handleAddStudent = async e => {
    e.preventDefault()
    setSaving(true)

    const form = e.target

    const payload = {
      name: form.name.value,
      class: form.class.value,
      rollNumber: Number(form.rollNumber.value)
    }

    const res = await addStudent(payload)

    if (res.success) {
      toast.success('Student added successfully 🎉')
      setOpenAddModal(false)
      setPage(1)
      loadStudents()
    } else {
      toast.error(res.error || 'Failed to add student')
    }

    setSaving(false)
  }

  // ---------------- RENDER ----------------
  return (
    <div className='space-y-4 md:space-y-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
        <h1 className='text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2'>
          👨‍🎓 STUDENTS
        </h1>

        <button
          onClick={() => setOpenAddModal(true)}
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
      w-full sm:w-auto
    '
        >
          <Plus size={18} strokeWidth={2.5} />
          <span>Add Students</span>
        </button>
      </div>

      {/* Filters */}
      <div className='bg-white rounded-xl shadow p-4 flex flex-row gap-4'>
        <div className='flex flex-col w-full md:w-1/3'>
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
            placeholder='Select Class'
          />
        </div>

        <div className='flex flex-col w-full md:w-1/3'>
          <SelectBox
            label='SORT BY'
            value={sortBy}
            onChange={value => {
              setFormState(prev => ({ ...prev, sortBy: value.target.value }))
            }}
            options={sortOptions.filter(option => option.value !== 'position')}
            placeholder='Sort By'
          />
        </div>
      </div>

      {/* DESKTOP VIEW */}
      <div className='hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
        <table className='w-full'>
          {/* Header */}
          <thead className='bg-gray-50 border-b border-gray-100'>
            <tr>
              <th className='px-6 py-4 text-center text-xs font-semibold tracking-wider text-gray-500 uppercase'>
                Roll No.
              </th>

              <th className='px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase'>
                Student Name
              </th>

              <th className='px-6 py-4 text-center text-xs font-semibold tracking-wider text-gray-500 uppercase'>
                Class
              </th>

              <th className='px-6 py-4 text-center text-xs font-semibold tracking-wider text-gray-500 uppercase'>
                Actions
              </th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-100'>
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <tr key={i} className='animate-pulse'>
                  {/* Roll */}
                  <td className='px-6 py-4'>
                    <div className='h-4 w-10 mx-auto rounded bg-gray-200'></div>
                  </td>

                  {/* Name */}
                  <td className='px-6 py-4'>
                    <div className='h-4 w-40 rounded bg-gray-200'></div>
                  </td>

                  {/* Class */}
                  <td className='px-6 py-4'>
                    <div className='h-6 w-16 mx-auto rounded-full bg-gray-200'></div>
                  </td>

                  {/* Actions */}
                  <td className='px-6 py-4'>
                    <div className='flex justify-center gap-2'>
                      <div className='h-9 w-9 rounded-full bg-gray-200'></div>
                      <div className='h-9 w-9 rounded-full bg-gray-200'></div>
                      <div className='h-9 w-9 rounded-full bg-gray-200'></div>
                    </div>
                  </td>
                </tr>
              ))
            ) : students.length === 0 ? (
              <tr>
                <td colSpan='4' className='py-10 text-center text-gray-500'>
                  No students found
                </td>
              </tr>
            ) : (
              students.map(student => (
                <tr
                  key={student._id}
                  className='
              transition-all
              duration-200
              hover:bg-gray-50
            '
                >
                  {/* Roll Number */}
                  <td className='px-6 py-4 text-center'>
                    <span className='font-semibold text-gray-700'>
                      {student.rollNumber}
                    </span>
                  </td>

                  {/* Name */}
                  <td className='px-6 py-4'>
                    <div className='font-medium text-gray-900'>
                      {student.name}
                    </div>
                  </td>

                  {/* Class */}
                  <td className='px-6 py-4 text-center'>
                    <span
                      className='
                  inline-flex
                  items-center
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  font-semibold
                  bg-blue-50
                  text-blue-600
                '
                    >
                      {student.class}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className='px-6 py-4'>
                    <div className='flex items-center justify-center gap-2'>
                      {/* Edit */}
                      <button
                        title='Edit Student'
                        onClick={async () => {
                          const res = await fetchStudentById(student._id)

                          if (res.success) {
                            setEditStudent(res.data)
                          }
                        }}
                        className='
                    group
                    p-2.5
                    rounded-full
                    bg-blue-50
                    text-blue-600
                    transition-all
                    duration-200
                    hover:bg-blue-100
                    hover:scale-105
                  '
                      >
                        <Pencil
                          size={16}
                          strokeWidth={2.25}
                          className='group-hover:rotate-12 transition-transform'
                        />
                      </button>

                      {/* View */}
                      <button
                        title='View Student'
                        onClick={() =>
                          navigate(`/admin/students/${student._id}`)
                        }
                        className='
                    group
                    p-2.5
                    rounded-full
                    bg-emerald-50
                    text-emerald-600
                    transition-all
                    duration-200
                    hover:bg-emerald-100
                    hover:scale-105
                  '
                      >
                        <Eye
                          size={16}
                          strokeWidth={2.25}
                          className='group-hover:scale-110 transition-transform'
                        />
                      </button>

                      {/* Delete */}
                      <button
                        title='Delete Student'
                        onClick={() => {
                          setSelectedId(student._id)
                          setIsModalOpen(true)
                        }}
                        className='
                    group
                    p-2.5
                    rounded-full
                    bg-red-50
                    text-red-600
                    transition-all
                    duration-200
                    hover:bg-red-100
                    hover:scale-105
                  '
                      >
                        <Trash2 size={16} strokeWidth={2.25} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE VIEW */}
      <div className='md:hidden space-y-3'>
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className='
          bg-white
          rounded-2xl
          border
          border-gray-100
          shadow-sm
          overflow-hidden
          animate-pulse
        '
            >
              <div className='h-1 bg-gray-200' />

              <div className='p-4'>
                <div className='flex items-center gap-3'>
                  <div className='h-12 w-12 rounded-2xl bg-gray-200' />

                  <div className='flex-1'>
                    <div className='h-4 w-36 rounded bg-gray-200 mb-3' />

                    <div className='flex items-center gap-2'>
                      <div className='h-5 w-14 rounded-full bg-gray-200' />
                      <div className='h-4 w-12 rounded bg-gray-200' />
                    </div>
                  </div>
                </div>

                <div className='mt-4 grid grid-cols-3 gap-2'>
                  <div className='h-9 rounded-xl bg-gray-200' />
                  <div className='h-9 rounded-xl bg-gray-200' />
                  <div className='h-9 rounded-xl bg-gray-200' />
                </div>
              </div>
            </div>
          ))
        ) : students.length === 0 ? (
          <div className='bg-white rounded-2xl shadow-sm p-6 text-center text-gray-500'>
            No students found
          </div>
        ) : (
          students.map(student => (
            <div
              key={student._id}
              className='
          bg-white
          rounded-2xl
          border
          border-gray-100
          shadow-sm
          overflow-hidden
          transition-all
          duration-300
          hover:shadow-md
          active:scale-[0.99]
        '
            >
              {/* Accent Line */}
              <div className='h-1 bg-gradient-to-r from-blue-500 to-indigo-500' />

              <div className='p-4'>
                {/* Header */}
                <div className='flex items-center gap-3'>
                  {/* Avatar */}
                  <div
                    className='
                h-12
                w-12
                rounded-2xl
                bg-gradient-to-br
                from-blue-100
                to-indigo-100
                text-blue-700
                flex
                items-center
                justify-center
                font-bold
                text-xl
                shrink-0
              '
                  >
                    {student.name?.charAt(0)?.toUpperCase()}
                  </div>

                  {/* Name + Meta */}
                  <div className='flex-1 min-w-0'>
                    <h3 className='font-semibold text-lg text-gray-900 truncate'>
                      {student.name}
                    </h3>

                    <div className='flex items-center gap-2 mt-1'>
                      <span
                        className='
                    inline-flex
                    items-center
                    gap-1
                    px-2.5
                    py-0.5
                    rounded-full
                    bg-blue-50
                    text-blue-600
                    text-xs
                    font-semibold
                  '
                      >
                        <GraduationCap size={11} />
                        {student.class}
                      </span>

                      <span
                        className='
                    text-xs
                    font-medium
                    text-gray-500
                  '
                      >
                        Roll #{student.rollNumber}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className='mt-4 grid grid-cols-3 gap-2'>
                  {/* Edit */}
                  <button
                    title='Edit Student'
                    onClick={async () => {
                      const res = await fetchStudentById(student._id)

                      if (res.success) {
                        setEditStudent(res.data)
                      }
                    }}
                    className='
                flex
                items-center
                justify-center
                h-9
                rounded-xl
                bg-blue-50
                text-blue-600
                transition-all
                duration-200
                hover:bg-blue-100
                active:scale-95
              '
                  >
                    <Pencil size={17} strokeWidth={2.25} />
                  </button>

                  {/* View */}
                  <button
                    title='View Student'
                    onClick={() => navigate(`/admin/students/${student._id}`)}
                    className='
                flex
                items-center
                justify-center
                h-9
                rounded-xl
                bg-emerald-50
                text-emerald-600
                transition-all
                duration-200
                hover:bg-emerald-100
                active:scale-95
              '
                  >
                    <Eye size={17} strokeWidth={2.25} />
                  </button>

                  {/* Delete */}
                  <button
                    title='Delete Student'
                    onClick={() => {
                      setSelectedId(student._id)
                      setIsModalOpen(true)
                    }}
                    className='
                flex
                items-center
                justify-center
                h-9
                rounded-xl
                bg-red-50
                text-red-600
                transition-all
                duration-200
                hover:bg-red-100
                active:scale-95
              '
                  >
                    <Trash2 size={17} strokeWidth={2.25} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* PEGINATION  */}
      <div className='flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 p-4 bg-white rounded-xl shadow-sm border'>
        {/* Page Info */}
        <div className='flex items-center gap-2 text-sm text-gray-600'>
          <span className='px-3 py-1 rounded-full bg-gray-100'>
            Page <span className='font-semibold text-gray-800'>{page}</span>
          </span>

          <span className='text-gray-300'>/</span>

          <span className='px-3 py-1 rounded-full bg-gray-100'>
            {totalPages} Pages
          </span>
        </div>

        {/* Controls */}
        <div className='flex items-center gap-2'>
          {/* Prev */}
          <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className={`p-2 rounded-full border transition-all duration-200 flex items-center justify-center
        ${
          page === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-gray-100 hover:scale-110 shadow-sm'
        }`}
          >
            <ChevronsLeft size={18} />
          </button>

          {/* Current Page */}
          <div className='px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold shadow'>
            {page}
          </div>

          {/* Next */}
          <button
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
            className={`p-2 rounded-full border transition-all duration-200 flex items-center justify-center
        ${
          page === totalPages
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-gray-100 hover:scale-110 shadow-sm'
        }`}
          >
            <ChevronsRight size={18} />
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      <EditStudentModal
        open={!!editStudent}
        student={editStudent}
        onClose={() => setEditStudent(null)}
        onSubmit={handleEditStudent}
        loading={editing}
      />

      <AddStudentModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onSubmit={handleAddStudent}
        loading={saving}
      />

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title='Delete Student'
        message='This action cannot be undone. Are you sure?'
      />
    </div>
  )
}
