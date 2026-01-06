import { useState } from 'react'
import { Outlet } from 'react-router'
import {
  LayoutGrid,
  Users,
  Megaphone,
  FileText,
  Upload,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import SidebarLink from '../components/SidebarLink'

export default function AdminLayout () {
  const [open, setOpen] = useState(false)

  return (
    <div className='flex h-screen bg-gray-100 overflow-hidden'>
      {/* ================= MOBILE SIDEBAR OVERLAY ================= */}
      {open && (
        <div
          className='fixed inset-0 bg-black/40 z-40 lg:hidden'
          onClick={() => setOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed lg:static z-50 top-0 left-0 h-full w-64 bg-white shadow-xl
        transform transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 flex flex-col p-4`}
      >
        {/* Logo */}
        <div className='flex items-center justify-between mb-8'>
          <h1 className='text-2xl font-bold text-blue-700'>MPS Admin</h1>

          {/* Close (mobile) */}
          <button className='lg:hidden' onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        {/* Navigation */}
        <nav className='flex flex-col gap-2'>
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

        {/* Logout */}
        <div className='mt-auto pt-4 border-t'>
          <SidebarLink to='/admin/logout' icon={<LogOut />}>
            Logout
          </SidebarLink>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <div className='flex-1 flex flex-col'>
        {/* ===== TOP BAR ===== */}
        <header className='h-16 bg-white shadow-sm flex items-center justify-between px-6'>
          {/* Hamburger */}
          <button className='lg:hidden' onClick={() => setOpen(true)}>
            <Menu />
          </button>

          <h2 className='text-lg font-semibold text-gray-700'>
            Admin Dashboard
          </h2>

          {/* Right section (future: profile / avatar) */}
          <div className='flex items-center gap-3'>
            <span className='text-sm text-gray-600 hidden sm:block'>
              Welcome, Admin
            </span>
            <div className='w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold'>
              A
            </div>
          </div>
        </header>

        {/* ===== PAGE CONTENT ===== */}
        <main className='flex-1 overflow-y-auto p-4 sm:p-6'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
