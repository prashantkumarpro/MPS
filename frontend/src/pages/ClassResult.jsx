import { useEffect, useMemo, useState } from 'react'
import SelectBox from '../components/SelectBox'
import { fetchClassReport } from '../api'
import {
  getSubjectRows,
  getTotalFullMarks
} from '../utils/reportUtils'

// ---------------- OPTIONS ----------------

const classOptions = [
  { label: 'UKGA', value: 'UKGA' },
  { label: 'UKGB', value: 'UKGB' },
  { label: 'LKG', value: 'LKG' },
  { label: 'PG', value: 'PG' },
  { label: 'NURSERY', value: 'NURSERY' },
  { label: 'Class I', value: 'I' },
  { label: 'Class II', value: 'II' },
  { label: 'Class III', value: 'III' },
  { label: 'Class IV', value: 'IV' },
  { label: 'Class V', value: 'V' },
  { label: 'Class VI', value: 'VI' }
]

const sortOptions = [
  { label: 'Roll Number', value: 'roll' },
  { label: 'Position', value: 'position' },
  { label: 'Name (A–Z)', value: 'name' }
]

// ---------------- COMPONENT ----------------

const ClassResult = () => {
  const [selectedClass, setSelectedClass] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(false)

  // ---------------- FETCH DATA ----------------
  useEffect(() => {
    if (!selectedClass) return

    const loadData = async () => {
      setLoading(true)
      try {
        const data = await fetchClassReport({ className: selectedClass })
        setReports(data?.data || data || [])
      } catch (err) {
        console.error(err)
        setReports([])
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [selectedClass])

  // ---------------- FRONTEND SORTING ----------------
  const sortedReports = useMemo(() => {
    if (!sortBy) return reports

    const sorted = [...reports]

    if (sortBy === 'roll') {
      sorted.sort(
        (a, b) => a.studentId.rollNumber - b.studentId.rollNumber
      )
    }

    if (sortBy === 'position') {
      sorted.sort((a, b) => (a.position || 0) - (b.position || 0))
    }

    if (sortBy === 'name') {
      sorted.sort((a, b) =>
        a.studentId.name.localeCompare(b.studentId.name)
      )
    }

    return sorted
  }, [reports, sortBy])

  // ---------------- DYNAMIC SUBJECT HEADERS ----------------
  const subjectHeaders =
    sortedReports.length > 0
      ? getSubjectRows(
          sortedReports[0],
          sortedReports[0].studentId.class
        )
      : []

  const totalFullMarks = selectedClass
    ? getTotalFullMarks(selectedClass)
    : 300

  // ---------------- UI ----------------
  return (
    <div className="mt-24 px-4">
      {/* Dropdowns */}
      <div className="flex gap-6 items-end mb-6">
        <SelectBox
          label="Class"
          value={selectedClass}
          onChange={e => setSelectedClass(e.target.value)}
          options={classOptions}
          placeholder="Select Class"
        />

        <SelectBox
          label="Sort By"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          options={sortOptions}
          placeholder="Sort By"
        />
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center text-lg text-gray-600">
          Loading reports...
        </div>
      )}

      {/* Table */}
      {!loading && sortedReports.length > 0 && (
        <table className="border w-full mt-4 text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-center">ROLL</th>
              <th className="border p-2 text-center">NAME</th>

              {subjectHeaders.map(([subject]) => (
                <th
                  key={subject}
                  className="border p-2 text-center"
                >
                  {subject}
                </th>
              ))}

              <th className="border p-2 text-center">OM</th>
              <th className="border p-2 text-center">FM</th>
              <th className="border p-2 text-center">%</th>
              <th className="border p-2 text-center">Grade</th>
              <th className="border p-2 text-center">Position</th>
              <th className="border p-2 text-center">Attendance/89</th>
            </tr>
          </thead>

          <tbody>
            {sortedReports.map(r => {
              const subjects = getSubjectRows(
                r,
                r.studentId.class
              )

              return (
                <tr key={r._id}>
                  <td className="border p-2 text-center">
                    {r.studentId.rollNumber}
                  </td>
                  <td className="border p-2 text-center">
                    {r.studentId.name}
                  </td>

                  {subjects.map(([_, value], i) => (
                    <td
                      key={i}
                      className="border p-2 text-center"
                    >
                      {value ?? '—'}
                    </td>
                  ))}

                  <td className="border p-2 text-center">
                    {r.totalMarks}
                  </td>
                  <td className="border p-2 text-center">
                    {totalFullMarks}
                  </td>
                  <td className="border p-2 text-center">
                    {r.percentage?.toFixed(1)}%
                  </td>
                  <td className="border p-2 text-center">
                    {r.grade}
                  </td>
                  <td className="border p-2 text-center">
                    {r.position}
                  </td>
                  <td className="border p-2 text-center">
                    {r.attendance}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}

      {/* No Data */}
      {!loading && selectedClass && sortedReports.length === 0 && (
        <div className="text-center text-gray-500 mt-6">
          No records found for this class.
        </div>
      )}
    </div>
  )
}

export default ClassResult
