import { NavLink } from 'react-router'

export default function SidebarLink ({ to, icon, children, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `relative flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200
        ${
          isActive
            ? 'bg-blue-600 text-white shadow-md'
            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
        }`
      }
    >
      <span className='text-xl'>{icon}</span>
      <span className='text-sm font-medium'>{children}</span>
    </NavLink>
  )
}
