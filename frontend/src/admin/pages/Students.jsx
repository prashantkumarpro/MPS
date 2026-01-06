import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import {
  fetchStudents,
  fetchStudentById,
  updateStudent,
  deleteStudent
} from '../../api/index.js'
import EditStudentModal from '../components/EditStudentModal'
import { useNavigate } from 'react-router'

// 👇 WRITE THIS INSIDE Students component

export default function Students () {
  // ---------------- STATE ----------------
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)

  const [selectedClass, setSelectedClass] = useState('')
  const [sortBy, setSortBy] = useState('roll')

  const [editStudent, setEditStudent] = useState(null)
  const [editing, setEditing] = useState(false)

  const navigate = useNavigate()
  // ---------------- LOAD STUDENTS (REUSABLE) ----------------
  const loadStudents = async () => {
    setLoading(true)

    const res = await fetchStudents({
      page,
      limit,
      className: selectedClass,
      sort: sortBy
    })

    setStudents(res.data || [])
    setTotalPages(res.totalPages || 1)
    setLoading(false)
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
  const handleDeleteStudent = async id => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this student?'
    )

    if (!confirmed) return

    const res = await deleteStudent(id)

    if (res.success) {
      toast.success('Student deleted successfully 🗑️')
      loadStudents()
    } else {
      toast.error(res.error || 'Failed to delete student')
    }
  }

  // ---------------- RENDER ----------------
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <h1 className='text-3xl font-bold text-gray-800 flex items-center gap-2'>
          👨‍🎓 Students
        </h1>

        <button
          onClick={() => setOpenModal(true)}
          className='self-start md:self-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition'
        >
          ➕ Add Student
        </button>
      </div>

      {/* Filters */}
      <div className='bg-white rounded-xl shadow p-4 flex flex-col md:flex-row gap-4'>
        <div className='flex flex-col w-full md:w-1/3'>
          <label className='text-sm text-gray-600 mb-1'>Class</label>
          <select
            value={selectedClass}
            onChange={e => {
              setSelectedClass(e.target.value)
              setPage(1)
            }}
            className='border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value=''>All Classes</option>
            <option value='NURSERY'>Nursery</option>
            <option value='PG'>PG</option>
            <option value='LKG'>LKG</option>
            <option value='UKGA'>UKGA</option>
            <option value='UKGB'>UKGB</option>
            <option value='I'>Class I</option>
            <option value='II'>Class II</option>
            <option value='III'>Class III</option>
          </select>
        </div>

        <div className='flex flex-col w-full md:w-1/3'>
          <label className='text-sm text-gray-600 mb-1'>Sort By</label>
          <select
            value={sortBy}
            onChange={e => {
              setSortBy(e.target.value)
              setPage(1)
            }}
            className='border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value='roll'>Roll Number</option>
            <option value='name'>Name (A–Z)</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className='bg-white rounded-xl shadow overflow-x-auto'>
        <table className='min-w-full text-sm'>
          <thead className='bg-gray-100 text-gray-700'>
            <tr>
              <th className='px-4 py-3 text-center'>Roll</th>
              <th className='px-4 py-3 text-left'>Name</th>
              <th className='px-4 py-3 text-center'>Class</th>
              <th className='px-4 py-3 text-center'>Actions</th>
            </tr>
          </thead>

          <tbody className='divide-y'>
            {students.length === 0 && (
              <tr>
                <td colSpan='4' className='text-center py-6 text-gray-500'>
                  No students found
                </td>
              </tr>
            )}

            {students.map(student => (
              <tr key={student._id} className='hover:bg-gray-50 transition'>
                <td className='px-4 py-3 text-center font-medium'>
                  {student.rollNumber}
                </td>

                <td className='px-4 py-3 font-medium text-gray-800'>
                  {student.name}
                </td>

                <td className='px-4 py-3 text-center'>
                  <span className='px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold'>
                    {student.class}
                  </span>
                </td>

                <td className='px-4 py-3 text-center space-x-3'>
                  <button
                    className='text-blue-600 hover:text-blue-800 font-medium'
                    onClick={async () => {
                      const res = await fetchStudentById(student._id)
                      if (res.success) setEditStudent(res.data)
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className='text-red-600 hover:text-red-800 font-medium'
                    onClick={() => handleDeleteStudent(student._id)}
                  >
                    Delete
                  </button>

                  <button
                    className='text-green-600 hover:text-green-800 font-medium'
                    onClick={() => navigate(`/admin/students/${student._id}`)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
        <span className='text-sm text-gray-600'>
          Page <b>{page}</b> of <b>{totalPages}</b>
        </span>

        <div className='flex gap-3'>
          <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className='px-4 py-2 rounded-lg border bg-white hover:bg-gray-100 disabled:opacity-50'
          >
            ← Prev
          </button>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
            className='px-4 py-2 rounded-lg border bg-white hover:bg-gray-100 disabled:opacity-50'
          >
            Next →
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
    </div>
  )
}
