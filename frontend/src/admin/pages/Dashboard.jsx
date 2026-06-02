import React, { useEffect, useState } from 'react'
import StatCard from '../components/StatCard'
import { useNavigate } from 'react-router'
import { Users, UserCheck, Bell, FileText, Plus, Upload } from 'lucide-react'

import { fetchStats } from '../../api'

const activities = [
  {
    color: 'bg-blue-500',
    title: 'New student registered',
    time: '2 minutes ago'
  },
  {
    color: 'bg-emerald-500',
    title: 'Notice published',
    time: '15 minutes ago'
  },
  {
    color: 'bg-purple-500',
    title: 'Report generated',
    time: '1 hour ago'
  },
  {
    color: 'bg-orange-500',
    title: 'Bulk upload completed',
    time: 'Today'
  }
]

const quickActions = [
  {
    icon: <Plus size={18} />,
    title: 'Add Student',
    route: '/admin/students',
    color: 'text-blue-600 bg-blue-50'
  },
  {
    icon: <Bell size={18} />,
    title: 'Add Notice',
    route: '/admin/notices',
    color: 'text-emerald-600 bg-emerald-50'
  },
  {
    icon: <FileText size={18} />,
    title: 'Reports',
    route: '/admin/reports',
    color: 'text-purple-600 bg-purple-50'
  },
  {
    icon: <Upload size={18} />,
    title: 'Bulk Upload',
    route: '/admin/bulk-upload',
    color: 'text-orange-600 bg-orange-50'
  }
]

const Dashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchStats()
        console.log(data)
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
    <div className='space-y-4 md:space-y-6'>
      {/* Welcome Banner */}
      <div
        className='
    relative
    overflow-hidden
    rounded-3xl
    bg-gradient-to-r
    from-blue-600
    to-indigo-600
    p-5 md:p-6
    text-white
    shadow-lg
  '
      >
        {/* Decorative Glow */}
        <div
          className='
      absolute
      -top-10
      -right-10
      h-40
      w-40
      rounded-full
      bg-white/10
      blur-3xl
    '
        />

        <div
          className='
      relative
      flex
      flex-col
      lg:flex-row
      lg:items-center
      lg:justify-between
      gap-5
    '
        >
          {/* Left */}
          <div className='flex-1'>
            <h1 className='text-2xl md:text-3xl font-bold'>
              Welcome Back, Admin 👋
            </h1>

            <p className='mt-2 text-blue-100 text-sm md:text-base'>
              Manage students, notices, reports and school activities.
            </p>

            {/* Stats */}
            <div
              className='
          mt-4
          grid
          grid-cols-1
          sm:grid-cols-3
          gap-2
          text-sm
          text-blue-100
        '
            >
              <div className='flex items-center gap-2'>
                <Users size={14} />
                <span>{stats?.totalStudents || 0} Students</span>
              </div>

              <div className='flex items-center gap-2'>
                <UserCheck size={14} />
                <span>{stats?.totalTeachers || 0} Teachers</span>
              </div>

              <div className='flex items-center gap-2'>
                <Bell size={14} />
                <span>{stats?.totalNotices || 0} Notices</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div
            className='
        flex
        flex-col
        sm:flex-row
        gap-3
        w-full
        lg:w-auto
      '
          >
            <button
              className='
          inline-flex
          items-center
          justify-center
          gap-2
          px-5
          py-3
          rounded-xl
          bg-white
          text-blue-600
          font-semibold
          shadow-sm
          hover:bg-blue-50
          transition-all
          duration-200
          w-full
          sm:w-auto
        '
              onClick={() => navigate('/admin/students')}
            >
              <Plus size={16} />
              Add Student
            </button>

            <button
              className='
          inline-flex
          items-center
          justify-center
          gap-2
          px-5
          py-3
          rounded-xl
          border
          border-white/20
          bg-white/10
          backdrop-blur-sm
          text-white
          font-medium
          hover:bg-white/20
          transition-all
          duration-200
          w-full
          sm:w-auto
        '
              onClick={() => navigate('/admin/notices')}
            >
              <Bell size={16} />
              Add Notice
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5'>
        {loading || !stats ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className='
                p-5
                rounded-2xl
                bg-white
                border
                border-gray-100
                shadow-sm
                animate-pulse
              '
            >
              <div className='flex justify-between items-center'>
                <div>
                  <div className='h-3 w-24 bg-gray-200 rounded mb-3'></div>
                  <div className='h-8 w-16 bg-gray-300 rounded'></div>
                </div>

                <div className='h-12 w-12 rounded-xl bg-gray-200'></div>
              </div>
            </div>
          ))
        ) : (
          <>
            <StatCard
              title='Total Students'
              value={stats?.totalStudents || 0}
              icon={<Users size={22} />}
              color='bg-blue-500'
            />

            <StatCard
              title='Total Teachers'
              value={stats?.totalTeachers || 0}
              icon={<UserCheck size={22} />}
              color='bg-green-500'
            />

            <StatCard
              title='Total Notices'
              value={stats?.totalNotices || 0}
              icon={<Bell size={22} />}
              color='bg-yellow-500'
            />

            <StatCard
              title='Reports Generated'
              value={stats?.totalReports || 0}
              icon={<FileText size={22} />}
              color='bg-purple-500'
            />
          </>
        )}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
        {quickActions.map(action => (
          <button
            key={action.title}
            onClick={() => navigate(action.route)}
            className='
        group
        bg-white
        border
        border-gray-200
        rounded-2xl
        p-4
        flex
        items-center
        justify-between
        hover:border-blue-200
        hover:shadow-md
        hover:-translate-y-1
        transition-all
        duration-200
      '
          >
            <div className='flex items-center gap-3'>
              <div
                className={`
            h-10
            w-10
            rounded-xl
            flex
            items-center
            justify-center
            ${action.color}
          `}
              >
                {action.icon}
              </div>

              <span className='font-semibold text-gray-800'>
                {action.title}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Recent Activity */}
      <div
        className='
    bg-white
    rounded-2xl
    border
    border-gray-100
    shadow-sm
    p-6
  '
      >
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h3 className='text-xl font-bold text-gray-900'>Recent Activity</h3>

            <p className='text-sm text-gray-500 mt-1'>
              Latest actions across the system
            </p>
          </div>

          <button className='text-sm font-medium text-blue-600'>
            View All
          </button>
        </div>

        <div className='relative'>
          <div className='absolute left-1.5 top-0 bottom-0 w-px bg-gray-200'></div>

          <div className='space-y-6'>
            {activities.map(activity => (
              <div key={activity.title} className='relative flex gap-4'>
                <div
                  className={`
              h-3
              w-3
              rounded-full
              mt-1
              shrink-0
              z-10
              ${activity.color}
            `}
                />

                <div>
                  <p className='font-medium text-gray-800'>{activity.title}</p>

                  <p className='text-sm text-gray-500 mt-1'>{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
