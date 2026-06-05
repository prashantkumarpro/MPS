import { useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'

export default function Logout () {
  const navigate = useNavigate()
  const hasLoggedOut = useRef(false)

  useEffect(() => {
    if (hasLoggedOut.current) return
    hasLoggedOut.current = true

    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('termYear')

    toast.success('You have been logged out successfully.')

    const timer = setTimeout(() => {
      navigate('/admin/login', { replace: true })
    }, 1500)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className='min-h-[60vh] flex items-center justify-center px-4'>
      <div className='text-center'>
        <div className='w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center'>
          <LogOut className='w-8 h-8 text-red-600' />
        </div>

        <h2 className='text-xl font-semibold text-gray-800'>Logging out...</h2>

        <p className='text-gray-500 mt-2'>
          Please wait while we securely sign you out.
        </p>
      </div>
    </div>
  )
}
