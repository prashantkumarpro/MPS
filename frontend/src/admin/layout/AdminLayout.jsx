import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
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
import { GrHome } from 'react-icons/gr'
import SidebarLink from '../components/SidebarLink'
import { useLocation } from 'react-router'
import toast from 'react-hot-toast'

export default function AdminLayout () {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('termYear')

    toast.success('You have been logged out successfully.')

    navigate('/admin/login', { replace: true })
  }

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])
  return (
    <div className='flex h-screen bg-slate-100 overflow-hidden'>
      {/* ================= MOBILE OVERLAY ================= */}
      {open && (
        <div
          className='fixed inset-0 bg-black/40 z-40 lg:hidden'
          onClick={() => setOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
    fixed lg:static
    top-0 left-0
    z-50
    h-full
    w-60
    bg-white
    border-r border-slate-200
    flex flex-col
    px-3 py-4
    transform transition-transform duration-300
    ${open ? 'translate-x-0' : '-translate-x-full'}
    lg:translate-x-0
  `}
      >
        {/* Logo */}
        <div className='flex items-center justify-between h-14 mb-5'>
          <h1 className='text-2xl font-extrabold tracking-tight text-blue-700'>
            MPS Admin
          </h1>

          <button className='lg:hidden' onClick={() => setOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className='flex flex-col gap-2'>
          <SidebarLink to='/admin' icon={<LayoutGrid size={20} />} end>
            Dashboard
          </SidebarLink>

          <SidebarLink to='/admin/students' icon={<Users size={20} />}>
            Students
          </SidebarLink>

          <SidebarLink to='/admin/notices' icon={<Megaphone size={20} />}>
            Notices
          </SidebarLink>

          <SidebarLink to='/admin/reports' icon={<FileText size={20} />}>
            Reports
          </SidebarLink>

          <SidebarLink to='/admin/bulk-upload' icon={<Upload size={20} />}>
            Bulk Upload
          </SidebarLink>

          <SidebarLink to='/admin/settings' icon={<Settings size={20} />}>
            Settings
          </SidebarLink>

          <SidebarLink to='/' icon={<GrHome size={18} />}>
            Home
          </SidebarLink>
        </nav>

        {/* Logout */}
        <div className='mt-auto pt-4 border-t border-gray-200'>
            <button
              onClick={handleLogout}
              className='w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all'
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <div className='flex-1 flex flex-col min-w-0'>
        {/* ================= HEADER ================= */}
        <header
          className='
    h-16
    bg-white
    border-b border-slate-200
    px-4 sm:px-6
    flex items-center justify-between
  '
        >
          <button className='lg:hidden' onClick={() => setOpen(true)}>
            <Menu size={22} />
          </button>

          <h2 className='text-lg font-semibold text-slate-800'>Dashboard</h2>

          <div className='flex items-center gap-3'>
            <span className='hidden sm:block text-sm text-slate-600'>
              Welcome, Admin
            </span>

            <div className='w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold shadow-sm'>
              A
            </div>
          </div>
        </header>

        {/* ================= PAGE CONTENT ================= */}
        <main className='flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
