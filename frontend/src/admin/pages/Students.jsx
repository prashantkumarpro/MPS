import { useEffect, useState } from 'react'
import { fetchStudents } from '../../api/index.js'

export default function Students () {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStudents = async () => {
      const data = await fetchStudents()
      setStudents(data)
      setLoading(false)
     
    }
    loadStudents()
  }, [])
console.log(students)
  if (loading) {
    return <p className='text-lg'>Loading students...</p>
  }

 return (
  <div>
    <h1 className="text-2xl font-bold mb-6">👨‍🎓 Students</h1>

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
        {students.data.map(student => (
          <tr key={student._id}>
            <td className="border p-2 text-center">
              {student.rollNumber}
            </td>
            <td className="border p-2">
              {student.name}
            </td>
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
  </div>
)

}
