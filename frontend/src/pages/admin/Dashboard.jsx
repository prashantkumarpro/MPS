import React from 'react'
import { NavLink, Outlet } from 'react-router'
import {
  LayoutGrid,
  Users,
  Megaphone,
  FileText,
  Upload,
  Settings,
  LogOut
} from 'lucide-react'

// =============================
// Admin Layout (Sidebar + Header)
// =============================
export default function AdminLayout () {
  return (
    <div className='flex h-screen bg-gray-100'>
      {/* Sidebar */}
      <aside className='w-64 bg-white shadow-xl flex flex-col p-4'>
        <h1 className='text-2xl font-bold mb-8 text-blue-700'>MPS Admin</h1>

        <nav className='flex flex-col gap-3'>
          <SidebarLink to='/admin/dashboard' icon={<LayoutGrid />}>
            Dashboard
          </SidebarLink>
          <SidebarLink to='/admin/students' icon={<Users />}>
            Students
          </SidebarLink>
          <SidebarLink to='/admin/notices' icon={<Megaphone />}>
            Notices
          </SidebarLink>
          <SidebarLink to='/admin/reports' icon={<FileText />}>
            Reports
          </SidebarLink>
          <SidebarLink to='/admin/bulk-upload' icon={<Upload />}>
            Bulk Upload
          </SidebarLink>
          <SidebarLink to='/admin/settings' icon={<Settings />}>
            Settings
          </SidebarLink>
        </nav>

        <div className='mt-auto'>
          <SidebarLink to='/admin/logout' icon={<LogOut />}>
            Logout
          </SidebarLink>
        </div>
      </aside>

      {/* Main Content */}
      <main className='flex-1 overflow-y-auto p-6'>
        <Outlet />
      </main>
    </div>
  )
}

// =============================
// Reusable Sidebar Link Component
// =============================
function SidebarLink ({ to, icon, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-xl text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-all ${
          isActive ? 'bg-blue-600 text-white' : ''
        }`
      }
    >
      <span className='text-xl'>{icon}</span>
      <span className='text-md font-medium'>{children}</span>
    </NavLink>
  )
}

// =============================
// Placeholder Admin Pages
// Replace these with real content later
// =============================
export function AdminDashboard () {
  return <h2 className='text-3xl font-bold'>📊 Dashboard</h2>
}

export function AdminStudents () {
  return <h2 className='text-3xl font-bold'>👨‍🎓 Students</h2>
}

export function AdminNotices () {
  return <h2 className='text-3xl font-bold'>📢 Notices</h2>
}

export function AdminReports () {
  return <h2 className='text-3xl font-bold'>📝 Reports</h2>
}

export function AdminBulkUpload () {
  return <h2 className='text-3xl font-bold'>📦 Bulk Upload</h2>
}

export function AdminSettings () {
  return <h2 className='text-3xl font-bold'>⚙️ Settings</h2>
}

export function AdminLogout () {
  return <h2 className='text-3xl font-bold'>🚪 Logout</h2>
}
