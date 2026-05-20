import { useEffect, useMemo, useState } from 'react'
import SelectBox from '../components/SelectBox'
import { fetchClassReport } from '../api'
import { getSubjectRows, getTotalFullMarks } from '../utils/reportUtils'
import { useLocalStorage } from '../hooks/useLocalStorage'
import {
  classOptions,
  termOptions,
  yearOptions,
  sortOptions
} from '../constants/reportOptions'

// ---------------- OPTIONS ----------------


// ---------------- COMPONENT ----------------

const ClassResult = () => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(false)

  const [formState, setFormState] = useLocalStorage('termYear', {
    selectedClass: '',
    term: '',
    academicYear: '',
    sortBy: ''
  })

  const { selectedClass, term, academicYear, sortBy } = formState

  // ---------------- FETCH DATA ----------------
  useEffect(() => {
    if (!selectedClass || !term || !academicYear) {
      setReports([])
      return
    }

    const loadData = async () => {
      setLoading(true)
      try {
        const res = await fetchClassReport({
          className: selectedClass,
          term,
          academicYear
        })

        // 🔑 STRICT response handling
        if (res?.success && Array.isArray(res.data)) {
          setReports(res.data)
        } else {
          console.warn('Unexpected response shape:', res)
          setReports([])
        }
      } catch (error) {
        console.error('Failed to load class reports:', error)
        setReports([])
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [selectedClass, term, academicYear])

  // ---------------- FRONTEND SORTING ----------------
  const sortedReports = useMemo(() => {
    if (!sortBy) return reports

    const sorted = [...reports]

    if (sortBy === 'roll') {
      sorted.sort((a, b) => a.studentId.rollNumber - b.studentId.rollNumber)
    }

    if (sortBy === 'position') {
      sorted.sort((a, b) => (a.position || 0) - (b.position || 0))
    }

    if (sortBy === 'name') {
      sorted.sort((a, b) => a.studentId.name.localeCompare(b.studentId.name))
    }

    return sorted
  }, [reports, sortBy])

  // ---------------- DYNAMIC SUBJECT HEADERS ----------------
  const subjectHeaders =
    sortedReports.length > 0
      ? getSubjectRows(sortedReports[0], sortedReports[0].studentId.class)
      : []

  const totalFullMarks = selectedClass ? getTotalFullMarks(selectedClass) : 300

  // ---------------- UI ----------------
  return (
    <div className='mt-24 px-4'>
      {/* Dropdowns */}
      <div className='flex gap-6 items-end mb-6 flex-wrap'>
        <SelectBox
          label='Class'
          value={selectedClass}
          onChange={value => {
            setFormState(prev => ({
              ...prev,
              selectedClass: value.target.value
            }))
          }}
          options={classOptions}
          placeholder='Select Class'
        />

        <SelectBox
          label='Term'
          value={term}
          onChange={value => {
            setFormState(prev => ({ ...prev, term: value.target.value }))
          }}
          options={termOptions}
          placeholder='Select Term'
        />

        <SelectBox
          label='Academic Year'
          value={academicYear}
          onChange={value => {
            setFormState(prev => ({
              ...prev,
              academicYear: value.target.value
            }))
          }}
          options={yearOptions}
          placeholder='Select Year'
        />

        <SelectBox
          label='Sort By'
          value={sortBy}
          onChange={value => {
            setFormState(prev => ({ ...prev, sortBy: value.target.value }))
          }}
          options={sortOptions}
          placeholder='Sort By'
        />
      </div>

      {/* Loading */}
      {loading && (
        <div className='text-center text-lg text-gray-600'>
          Loading reports...
        </div>
      )}

      {/* Table */}
      {!loading && sortedReports.length > 0 && (
        <table className='border w-full mt-4 text-sm'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='border p-2'>ROLL</th>
              <th className='border p-2'>NAME</th>

              {subjectHeaders.map(([subject]) => (
                <th key={subject} className='border p-2'>
                  {subject}
                </th>
              ))}

              <th className='border p-2'>OM</th>
              <th className='border p-2'>FM</th>
              <th className='border p-2'>%</th>
              <th className='border p-2'>Grade</th>
              <th className='border p-2'>Position</th>
              <th className='border p-2'>Attendance</th>
            </tr>
          </thead>

          <tbody>
            {sortedReports.map(r => {
              const subjects = getSubjectRows(r, r.studentId.class)

              return (
                <tr key={r._id}>
                  <td className='border p-2 text-center'>
                    {r.studentId.rollNumber}
                  </td>
                  <td className='border p-2'>{r.studentId.name}</td>

                  {subjects.map(([_, value], i) => (
                    <td key={i} className='border p-2 text-center'>
                      {value ?? '—'}
                    </td>
                  ))}

                  <td className='border p-2 text-center'>{r.totalMarks}</td>
                  <td className='border p-2 text-center'>{totalFullMarks}</td>
                  <td className='border p-2 text-center'>
                    {r.percentage?.toFixed(1)}%
                  </td>
                  <td className='border p-2 text-center'>{r.grade}</td>
                  <td className='border p-2 text-center'>{r.position}</td>
                  <td className='border p-2 text-center'>{r.attendance}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}

      {/* No Data */}
      {!loading &&
        selectedClass &&
        term &&
        academicYear &&
        sortedReports.length === 0 && (
          <div className='text-center text-gray-500 mt-6'>
            No records found for this class.
          </div>
        )}
    </div>
  )
}

export default ClassResult
