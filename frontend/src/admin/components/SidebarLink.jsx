import { NavLink } from 'react-router'

export default function SidebarLink ({ to, icon, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-xl transition-all ${
          isActive
            ? 'bg-blue-600 text-white'
            : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'
        }`
      }
    >
      <span className='text-xl'>{icon}</span>
      <span className='text-md font-medium'>{children}</span>
    </NavLink>
  )
}
