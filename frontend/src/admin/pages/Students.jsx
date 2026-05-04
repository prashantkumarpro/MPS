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
import { GrEdit, GrView } from 'react-icons/gr'
import AddStudentModal from '../components/AddStudentModal.jsx'
import { useLocalStorage } from '../../hooks/useLocalStorage.js'
import ConfirmModal from '../components/ConfirmModal.jsx'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'

// 👇 WRITE THIS INSIDE Students component

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
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-row md:flex-row items-center justify-between gap-4'>
        <h1 className='text-3xl font-bold text-gray-800 flex items-center gap-2'>
          👨‍🎓 STUDENTS
        </h1>

        <button
          onClick={() => setOpenAddModal(true)}
          className='self-start md:self-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition'
        >
          ➕ Add
        </button>
      </div>

      {/* Filters */}
      <div className='bg-white rounded-xl shadow p-4 flex flex-row gap-4'>
        <div className='flex flex-col w-full md:w-1/3'>
          <label className='text-sm text-gray-600 mb-1'>CLASS</label>
          <select
            value={selectedClass}
            onChange={value => {
              setFormState(prev => ({
                ...prev,
                selectedClass: value.target.value
              }))
              setPage(1)
            }}
            className='border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value=''>All</option>
            <option value='NURSERY'>Nursery</option>
            <option value='PG'>PG</option>
            <option value='LKG'>LKG</option>
            <option value='UKGA'>UKGA</option>
            <option value='UKGB'>UKGB</option>
            <option value='I'> I</option>
            <option value='II'> II</option>
            <option value='III'> III</option>
            <option value='IV'> IV</option>
            <option value='V'> V</option>
            <option value='VI'> VI</option>
          </select>
        </div>

        <div className='flex flex-col w-full md:w-1/3'>
          <label className='text-sm text-gray-600 mb-1'>SORT BY</label>
          <select
            value={sortBy}
            onChange={value => {
              setFormState(prev => ({ ...prev, sortBy: value.target.value }))
              setPage(1)
            }}
            className='border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value='roll'>Roll </option>
            <option value='name'>Name (A–Z)</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className='bg-white rounded-xl shadow overflow-x-auto'>
        <table className='min-w-full text-sm'>
          <thead className='bg-gray-100 text-gray-700'>
            <tr>
              <th className='px-4 py-3 text-center'>ROLL</th>
              <th className='px-4 py-3 text-left'>NAME</th>
              <th className='px-4 py-3 text-center'>CLASS</th>
              <th className='px-4 py-3 text-center'>ACTIONS</th>
            </tr>
          </thead>

          <tbody className='divide-y'>
            {/* 🔄 Loading State */}
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <tr key={i} className='animate-pulse'>
                  <td className='px-4 py-3 text-center'>
                    <div className='h-4 bg-gray-200 rounded w-10 mx-auto'></div>
                  </td>

                  <td className='px-4 py-3'>
                    <div className='h-4 bg-gray-200 rounded w-32'></div>
                  </td>

                  <td className='px-4 py-3 text-center'>
                    <div className='h-4 bg-gray-200 rounded w-16 mx-auto'></div>
                  </td>

                  <td className='px-4 py-3'>
                    <div className='flex justify-center gap-2'>
                      <div className='h-8 w-8 bg-gray-200 rounded-full'></div>
                      <div className='h-8 w-8 bg-gray-200 rounded-full'></div>
                      <div className='h-8 w-8 bg-gray-200 rounded-full'></div>
                    </div>
                  </td>
                </tr>
              ))
            ) : students.length === 0 ? (
              /* ❌ Empty State */
              <tr>
                <td colSpan='4' className='text-center py-6 text-gray-500'>
                  No students found
                </td>
              </tr>
            ) : (
              /* ✅ Data Rows */
              students.map(student => (
                <tr key={student._id} className='hover:bg-gray-50 transition'>
                  <td className='px-4 py-3 text-center font-medium'>
                    {student.rollNumber}
                  </td>

                  <td className='px-4 py-3 font-medium text-gray-800'>
                    {student.name}
                  </td>

                  <td className='px-4 py-3 text-center'>
                    <span className='px-3 py-1 rounded-sm text-xs font-semibold bg-gray-50'>
                      {student.class}
                    </span>
                  </td>

                  <td className='px-4 py-3'>
                    <div className='flex items-center justify-center gap-2'>
                      {/* Edit */}
                      <button
                        title='Edit Student'
                        className='group p-2 rounded-full bg-blue-50 text-blue-600 
                         hover:bg-blue-100 hover:scale-110 transition-all duration-200'
                        onClick={async () => {
                          const res = await fetchStudentById(student._id)
                          if (res.success) setEditStudent(res.data)
                        }}
                      >
                        <GrEdit
                          size={16}
                          className='group-hover:rotate-12 transition'
                        />
                      </button>

                      {/* View */}
                      <button
                        title='View Student'
                        className='group p-2 rounded-full bg-emerald-50 text-emerald-600 
                         hover:bg-emerald-100 hover:scale-110 transition-all duration-200'
                        onClick={() =>
                          navigate(`/admin/students/${student._id}`)
                        }
                      >
                        <GrView
                          size={16}
                          className='group-hover:scale-110 transition'
                        />
                      </button>

                      {/* Delete */}
                      <button
                        title='Delete Student'
                        className='p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition'
                        onClick={() => {
                          setSelectedId(student._id)
                          setIsModalOpen(true)
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

     <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 p-4 bg-white rounded-xl shadow-sm border">

  {/* Page Info */}
  <div className="flex items-center gap-2 text-sm text-gray-600">
    <span className="px-3 py-1 rounded-full bg-gray-100">
      Page <span className="font-semibold text-gray-800">{page}</span>
    </span>

    <span className="text-gray-300">/</span>

    <span className="px-3 py-1 rounded-full bg-gray-100">
      {totalPages} Pages
    </span>
  </div>

  {/* Controls */}
  <div className="flex items-center gap-2">

    {/* Prev */}
    <button
      disabled={page === 1}
      onClick={() => setPage(p => p - 1)}
      className={`p-2 rounded-full border transition-all duration-200 flex items-center justify-center
        ${
          page === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-100 hover:scale-110 shadow-sm"
        }`}
    >
      <ChevronsLeft size={18} />
    </button>

    {/* Current Page */}
    <div className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold shadow">
      {page}
    </div>

    {/* Next */}
    <button
      disabled={page === totalPages}
      onClick={() => setPage(p => p + 1)}
      className={`p-2 rounded-full border transition-all duration-200 flex items-center justify-center
        ${
          page === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-100 hover:scale-110 shadow-sm"
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
