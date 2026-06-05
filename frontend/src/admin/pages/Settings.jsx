import {
  Settings as SettingsIcon,
  Shield,
  Bell,
  Database,
  Palette,
  Construction
} from 'lucide-react'

export default function Settings () {
  return (
    <div className='space-y-4 md:space-y-6'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900'>Settings</h1>
        <p className='mt-2 text-gray-500'>
          Configure and manage your school ERP system.
        </p>
      </div>

      {/* Setting Cards */}
      <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-4'>
        <div className='bg-white rounded-2xl border border-gray-200 p-6'>
          <div className='w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4'>
            <Shield className='w-6 h-6 text-blue-600' />
          </div>

          <h3 className='font-semibold text-gray-900'>Security Settings</h3>

          <p className='text-sm text-gray-500 mt-2'>
            Password policies, roles, permissions, and access control.
          </p>
        </div>

        <div className='bg-white rounded-2xl border border-gray-200 p-6'>
          <div className='w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4'>
            <Bell className='w-6 h-6 text-green-600' />
          </div>

          <h3 className='font-semibold text-gray-900'>Notifications</h3>

          <p className='text-sm text-gray-500 mt-2'>
            Manage alerts, announcements, and system notifications.
          </p>
        </div>

        <div className='bg-white rounded-2xl border border-gray-200 p-6'>
          <div className='w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4'>
            <Database className='w-6 h-6 text-purple-600' />
          </div>

          <h3 className='font-semibold text-gray-900'>Backup & Data</h3>

          <p className='text-sm text-gray-500 mt-2'>
            Backup records, export data, and manage database settings.
          </p>
        </div>

        <div className='bg-white rounded-2xl border border-gray-200 p-6'>
          <div className='w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center mb-4'>
            <Palette className='w-6 h-6 text-pink-600' />
          </div>

          <h3 className='font-semibold text-gray-900'>Appearance</h3>

          <p className='text-sm text-gray-500 mt-2'>
            Customize theme, branding, and UI preferences.
          </p>
        </div>
      </div>

      {/* Coming Soon */}
      <div className='mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-6 flex items-start gap-4'>
        <div className='w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center shrink-0'>
          <Construction className='w-6 h-6 text-amber-600' />
        </div>

        <div>
          <h3 className='font-semibold text-amber-900'>
            Settings Module Under Development
          </h3>

          <p className='text-sm text-amber-700 mt-1'>
            Advanced ERP settings and configuration options will be available in
            a future update.
          </p>
        </div>
      </div>

      {/* Empty State */}
      <div className='mt-8 bg-white border border-dashed border-gray-300 rounded-2xl p-10 text-center'>
        <SettingsIcon className='w-12 h-12 mx-auto text-gray-400 mb-4' />

        <h3 className='text-lg font-semibold text-gray-900'>
          Settings Coming Soon
        </h3>

        <p className='text-gray-500 mt-2'>
          We're building a powerful settings module for administrators.
        </p>
      </div>
    </div>
  )
}
