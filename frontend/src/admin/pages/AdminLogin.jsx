import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import toast from 'react-hot-toast'

import logo from '../../assets/logo.webp'
import { loginUser } from '../../api/auth.api'
import { useAuth } from '../../context/AuthContext'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('Please fill all fields')
      return
    }

    try {
      setLoading(true)

      const res = await loginUser({ email, password })

      if (!res.success) {
        toast.error(res.message || 'Login failed')
        return
      }

      if (res.user.role !== 'admin') {
        toast.error('Access denied')
        return
      }

      login(res.user, res.token)

      toast.success(`Welcome back, ${res.user.name}!`)

      setTimeout(() => {
        navigate('/admin')
      }, 800)
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-4'>
      {/* Background Blur Effects */}
      <div className='absolute top-0 left-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl' />
      <div className='absolute bottom-0 right-0 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl' />

      <div className='relative w-full max-w-md'>
        <div className='bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8'>
          {/* Logo */}
          <div className='flex items-center gap-3 mb-8'>
            <img
              src={logo}
              alt='Max Public School'
              className='w-16 h-16 object-contain flex-shrink-0'
            />

            <div>
              <h1 className='font-alkatra font-extrabold text-2xl leading-5 mt-3 text-sky-700'>
                MAX PUBLIC SCHOOL
              </h1>

              <p className='text-sm text-slate-500 font-able font-normal leading-[100%]'>
                School ERP Portal
              </p>
            </div>
          </div>

          {/* Heading */}
          <div className='mb-8'>
            <h2 className='text-2xl font-bold text-slate-900 font-able  leading-[100%]'>
              Welcome Back
            </h2>

            <p className='mt-2  text-[#393E46] font-normal text-lg'>
              Sign in to continue to your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-5'>
            {/* Email */}
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>
                Email Address
              </label>

              <div className='relative'>
                <Mail className='absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400' />

                <input
                  type='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder='Enter your email'
                  className='w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all'
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>
                Password
              </label>

              <div className='relative'>
                <Lock className='absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400' />

                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder='Enter your password'
                  className='w-full h-12 pl-11 pr-12 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all'
                  required
                />

                <button
                  type='button'
                  onClick={() => setShowPassword(prev => !prev)}
                  className='absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors'
                >
                  {showPassword ? (
                    <EyeOff className='h-5 w-5' />
                  ) : (
                    <Eye className='h-5 w-5' />
                  )}
                </button>
              </div>
            </div>

            {/* Button */}
            <button
              type='submit'
              disabled={loading}
              className='w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-200 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 disabled:opacity-70 disabled:cursor-not-allowed'
            >
              {loading ? (
                <div className='flex items-center justify-center gap-2'>
                  <div className='h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}