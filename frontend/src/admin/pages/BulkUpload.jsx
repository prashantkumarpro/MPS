import { UploadCloud, Construction, FileSpreadsheet } from 'lucide-react'

export default function BulkUpload () {
  return (
    <div className='flex flex-col items-center justify-center min-h-[70vh] px-6 text-center'>
      <div className='w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center mb-6'>
        <UploadCloud className='w-10 h-10 text-blue-600' />
      </div>

      <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-3'>
        Bulk Upload
      </h1>

      <p className='max-w-xl text-gray-600 mb-8'>
        Upload multiple teachers, students, or records at once using Excel
        spreadsheets. This feature is currently under development and will be
        available soon.
      </p>

      <div className='grid gap-4 w-full max-w-2xl md:grid-cols-2'>
        <div className='bg-white border border-gray-200 rounded-2xl p-6'>
          <FileSpreadsheet className='w-8 h-8 text-green-600 mb-3 mx-auto' />
          <h3 className='font-semibold text-gray-900 mb-2'>
            Excel Import Support
          </h3>
          <p className='text-sm text-gray-500'>
            Import hundreds of records using Excel and CSV files.
          </p>
        </div>

        <div className='bg-white border border-gray-200 rounded-2xl p-6'>
          <Construction className='w-8 h-8 text-amber-500 mb-3 mx-auto' />
          <h3 className='font-semibold text-gray-900 mb-2'>Coming Soon</h3>
          <p className='text-sm text-gray-500'>
            We're working on a fast and secure bulk upload experience.
          </p>
        </div>
      </div>

      <div className='mt-8 inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-4 py-2 text-sm font-medium text-amber-700'>
        🚧 Feature under development
      </div>
    </div>
  )
}
