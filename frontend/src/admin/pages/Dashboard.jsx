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

  return (
    <div className='p-6 space-y-6'>
      {/* Header */}
      <div className='flex items-center gap-3'>
        <div className='p-2 bg-blue-100 rounded-lg'>📊</div>
        <h1 className='text-2xl sm:text-3xl font-bold text-gray-800'>
          Dashboard Overview
        </h1>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {loading || !stats ? (
          // 🔄 Skeleton
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className='p-5 rounded-xl bg-white shadow-sm border animate-pulse'
            >
              <div className='flex justify-between items-center'>
                <div className='space-y-2'>
                  <div className='h-3 w-24 bg-gray-200 rounded'></div>
                  <div className='h-6 w-12 bg-gray-300 rounded'></div>
                </div>
                <div className='h-10 w-10 rounded-lg bg-gray-200'></div>
              </div>
            </div>
          ))
        ) : (
          // ✅ Real Data
          <>
            <StatCard
              title='Total Students'
              value={stats?.totalStudents || 0}
              icon={<Users className='text-white' size={22} />}
              color='bg-blue-500'
            />

            <StatCard
              title='Total Teachers'
              value={stats?.totalTeachers || 15}
              icon={<UserCheck className='text-white' size={22} />}
              color='bg-green-500'
            />

            <StatCard
              title='Total Notices'
              value={stats?.totalNotices || 2}
              icon={<Bell className='text-white' size={22} />}
              color='bg-yellow-500'
            />

            <StatCard
              title='Reports Generated'
              value={stats?.totalReports || 0}
              icon={<FileText className='text-white' size={22} />}
              color='bg-purple-500'
            />
          </>
        )}
      </div>
    </div>
  )
}

export default Dashboard
