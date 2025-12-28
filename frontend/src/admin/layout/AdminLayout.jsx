import { Outlet } from 'react-router'
import {
  LayoutGrid,
  Users,
  Megaphone,
  FileText,
  Upload,
  Settings,
  LogOut
} from 'lucide-react'
import SidebarLink from '../components/SidebarLink'

export default function AdminLayout () {
  return (
    <div className='flex h-screen bg-gray-100'>
      {/* Sidebar */}
      <aside className='w-64 bg-white shadow-xl flex flex-col p-4'>
        <h1 className='text-2xl font-bold mb-8 text-blue-700'>MPS Admin</h1>

        <nav className='flex flex-col gap-3'>
          <SidebarLink to='/admin' icon={<LayoutGrid />}>
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
