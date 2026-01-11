import { useState } from 'react'
import { useNavigate } from 'react-router'
import { loginUser } from '../../api/auth.api'
import { useAuth } from '../../context/AuthContext'

export default function AdminLogin () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await loginUser({ email, password })

    if (!res.success) {
      setError(res.message)
      setLoading(false)
      return
    }

    // 🚨 Only admin allowed here
    if (res.user.role !== 'admin') {
      setError('Access denied')
      setLoading(false)
      return
    }

    login(res.user, res.token)
    navigate('/admin')
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md'
      >
        <h1 className='text-2xl font-bold text-center mb-6 text-blue-700'>
          Admin Login
        </h1>

        {error && (
          <p className='bg-red-100 text-red-600 p-2 mb-4 rounded text-sm'>
            {error}
          </p>
        )}

        <div className='mb-4'>
          <label className='block text-sm mb-1'>Email</label>
          <input
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            className='w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
        </div>

        <div className='mb-6'>
          <label className='block text-sm mb-1'>Password</label>
          <input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            className='w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
        </div>

        <button
          type='submit'
          disabled={loading}
          className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition disabled:opacity-50'
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}
