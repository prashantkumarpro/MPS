import { useEffect, useState } from 'react'
import AddReportModal from '../components/AddReportModal'
import { getReports, deleteReport as deleteReportApi } from '../../api'


const Reports = () => {
  const [reports, setReports] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  // ===============================
  // FETCH REPORTS
  // ===============================
 const fetchReports = async () => {

  try {

    const data = await getReports()

    setReports(data.data)

  } catch (error) {
    console.log(error)
  }
}

useEffect(() => {
  fetchReports()
}, [])

const deleteReport = async (id) => {

  try {

    await deleteReportApi(id)

    fetchReports()

  } catch (error) {
    console.log(error)
  }
}

  return (
    <div className='p-6'>
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-3xl font-bold'>Results Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className='
    bg-blue-600
    text-white
    px-5
    py-2
    rounded-lg
  '
        >
          Add Result
        </button>
      </div>

      {/* Table */}
      <div
        className='
          bg-white
          rounded-xl
          shadow
          overflow-x-auto
        '
      >
        <table className='w-full'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='p-4 text-left'>Student</th>

              <th className='p-4 text-left'>Roll</th>

              <th className='p-4 text-left'>Class</th>

              <th className='p-4 text-left'>Term</th>

              <th className='p-4 text-left'>Percentage</th>

              <th className='p-4 text-left'>Grade</th>

              <th className='p-4 text-left'>Position</th>

              <th className='p-4 text-left'>Actions</th>
            </tr>
          </thead>

          <tbody>
            {reports.map(report => (
              <tr key={report._id} className='border-t'>
                <td className='p-4'>{report.studentId?.name}</td>

                <td className='p-4'>{report.studentId?.rollNumber}</td>

                <td className='p-4'>{report.studentId?.class}</td>

                <td className='p-4'>{report.term}</td>

                <td className='p-4'>{report.percentage?.toFixed(2)}%</td>

                <td className='p-4'>{report.grade}</td>

                <td className='p-4'>#{report.position}</td>

                <td className='p-4'>
                  <button
                    onClick={() => deleteReport(report._id)}
                    className='
                      text-red-500
                      font-semibold
                    '
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fetchReports={fetchReports}
      />
    </div>
  )
}

export default Reports
