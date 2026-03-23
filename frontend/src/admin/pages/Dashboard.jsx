import React, { useEffect, useState } from 'react'
import StatCard from '../components/StatCard'
import { Users, UserCheck, Bell, FileText } from 'lucide-react'
import { fetchStats } from '../../api'

const Dashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchStats()
        setStats(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  if (loading) return <p>Loading...</p>
  return (
    <div className='p-6 space-y-6'>
      <h1 className='text-3xl font-bold'>📊 Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        <StatCard
          title='Total Students'
          value={stats.totalStudents}
          icon={<Users className='text-white' size={22} />}
          color='bg-blue-500'
        />

        <StatCard
          title='Total Teachers'
          value='15'
          icon={<UserCheck className='text-white' size={22} />}
          color='bg-green-500'
        />

        <StatCard
          title='Total Notices'
          value='12'
          icon={<Bell className='text-white' size={22} />}
          color='bg-yellow-500'
        />

        <StatCard
          title='Reports Generated'
          value={stats.totalReports}
          icon={<FileText className='text-white' size={22} />}
          color='bg-purple-500'
        />
      </div>
    </div>
  )
}

export default Dashboard
