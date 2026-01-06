import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { fetchStudentById } from '../../api'
import toast from 'react-hot-toast'

export default function StudentProfile () {
  const { id } = useParams()
  const navigate = useNavigate()

  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStudent = async () => {
      const res = await fetchStudentById(id)

      if (res.success) {
        setStudent(res.data)
      } else {
        toast.error('Student not found')
        navigate('/admin/students')
      }

      setLoading(false)
    }

    loadStudent()
  }, [id])

  if (loading) return <p>Loading student profile...</p>
  if (!student) return null

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className='mb-4 text-blue-600 underline'
      >
        ← Back
      </button>

      <h1 className='text-2xl font-bold mb-4'>👨‍🎓 Student Profile</h1>

      <div className='bg-white p-6 rounded shadow space-y-3'>
        <p>
          <b>Name:</b> {student.name}
        </p>
        <p>
          <b>Class:</b> {student.class}
        </p>
        <p>
          <b>Roll Number:</b> {student.rollNumber}
        </p>

        <hr />

        <p>
          <b>Father's Name:</b> {student.parents?.fatherName || '-'}
        </p>
        <p>
          <b>Mother's Name:</b> {student.parents?.motherName || '-'}
        </p>
        <p>
          <b>Parent Mobile:</b> {student.parents?.mobile || '-'}
        </p>
        <p>
          <b>Email:</b> {student.parents?.email || '-'}
        </p>

        <hr />

        <p>
          <b>Date of Birth:</b>{' '}
          {student.personal?.dob
            ? new Date(student.personal.dob).toLocaleDateString()
            : '-'}
        </p>

        <p>
          <b>Address:</b> {student.personal?.address || '-'}
        </p>
      </div>
    </div>
  )
}
