import { useEffect, useState } from 'react'
import { fetchStudents } from '../../api/index.js'

export default function Students () {
  // ---------------- STATE ----------------
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)

  const [selectedClass, setSelectedClass] = useState('')
  const [sortBy, setSortBy] = useState('roll')

  // ---------------- FETCH DATA ----------------
  useEffect(() => {
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

    loadStudents()
  }, [page, selectedClass, sortBy, limit])

  // ---------------- UI STATES ----------------
  if (loading) {
    return <p className="text-lg">Loading students...</p>
  }

  // ---------------- RENDER ----------------
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">👨‍🎓 Students</h1>

      {/* FILTER + SORT */}
      <div className="flex gap-4 mb-4">
        <select
          value={selectedClass}
          onChange={e => {
            setSelectedClass(e.target.value)
            setPage(1)
          }}
          className="border p-2 rounded"
        >
          <option value="">All Classes</option>
          <option value="NURSERY">NURSERY</option>
          <option value="PG">PG</option>
          <option value="LKG">LKG</option>
          <option value="UKGA">UKGA</option>
          <option value="UKGB">UKGB</option>
          <option value="I">I</option>
          <option value="II">II</option>
          <option value="III">III</option>
        </select>

        <select
          value={sortBy}
          onChange={e => {
            setSortBy(e.target.value)
            setPage(1)
          }}
          className="border p-2 rounded"
        >
          <option value="roll">Sort by Roll</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>

      {/* TABLE */}
      <table className="w-full border border-gray-300 bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Roll</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Class</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center p-4">
                No students found
              </td>
            </tr>
          )}

          {students.map(student => (
            <tr key={student._id}>
              <td className="border p-2 text-center">
                {student.rollNumber}
              </td>
              <td className="border p-2">{student.name}</td>
              <td className="border p-2 text-center">
                {student.class}
              </td>
              <td className="border p-2 text-center">
                <button className="text-blue-600 hover:underline mr-3">
                  Edit
                </button>
                <button className="text-red-600 hover:underline">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-4 py-2 font-semibold">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(p => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}
