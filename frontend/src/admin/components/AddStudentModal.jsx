import { useState } from 'react'
import { UserPlus, X } from 'lucide-react'

import SelectBox from '../../components/SelectBox'
import { classOptions } from '../../constants/reportOptions'

export default function AddStudentModal({
  open,
  onClose,
  onSubmit,
  loading
}) {
  const [selectedClass, setSelectedClass] = useState('')

  if (!open) return null

  return (
    <div
      className='
        fixed
        inset-0
        z-50

        flex
        items-center
        justify-center

        bg-black/50
        backdrop-blur-sm

        p-4
      '
    >
      <div
        className='
          w-full
          max-w-md

          overflow-hidden

          rounded-3xl

          bg-white

          shadow-[0_25px_80px_-12px_rgba(0,0,0,0.25)]

          animate-fadeIn
        '
      >
        {/* Header */}
        <div className='border-b border-slate-100 px-6 py-5'>
          <div className='flex items-start justify-between'>
            <div>
              <div className='flex items-center gap-3'>
                <div
                  className='
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center

                    rounded-2xl

                    bg-blue-50

                    text-blue-600
                  '
                >
                  <UserPlus size={20} />
                </div>

                <div>
                  <h2 className='text-xl font-bold text-slate-900'>
                    Add Student
                  </h2>

                  <p className='mt-1 text-sm text-slate-500'>
                    Create a new student record
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className='
                flex
                h-10
                w-10
                items-center
                justify-center

                rounded-xl

                text-slate-400

                transition-all

                hover:bg-slate-100
                hover:text-slate-700
              '
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit}>
          <div className='space-y-5 p-6'>
            {/* Student Name */}
            <div>
              <label
                className='
                  mb-2
                  block

                  text-xs
                  font-semibold

                  uppercase
                  tracking-wider

                  text-slate-500
                '
              >
                Student Name
              </label>

              <input
                name='name'
                required
                placeholder='Enter student name'
                className='
                  h-12
                  w-full

                  rounded-2xl

                  border
                  border-slate-200

                  bg-slate-50

                  px-4

                  text-slate-700

                  outline-none

                  transition-all

                  focus:border-blue-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-blue-100
                '
              />
            </div>

            {/* Class */}
            <SelectBox
              name='class'
              label='CLASS'
              value={selectedClass}
              onChange={e => setSelectedClass(e.target.value)}
              options={classOptions}
              placeholder='Select Class'
            />

            {/* Roll Number */}
            <div>
              <label
                className='
                  mb-2
                  block

                  text-xs
                  font-semibold

                  uppercase
                  tracking-wider

                  text-slate-500
                '
              >
                Roll Number
              </label>

              <input
                type='number'
                name='rollNumber'
                required
                placeholder='Enter roll number'
                className='
                  h-12
                  w-full

                  rounded-2xl

                  border
                  border-slate-200

                  bg-slate-50

                  px-4

                  text-slate-700

                  outline-none

                  transition-all

                  focus:border-blue-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-blue-100
                '
              />
            </div>
          </div>

          {/* Footer */}
          <div
            className='
              flex
              items-center
              justify-end
              gap-3

              border-t
              border-slate-100

              px-6
              py-5
            '
          >
            <button
              type='button'
              onClick={onClose}
              className='
                rounded-xl

                bg-slate-100

                px-5
                py-2.5

                font-medium
                text-slate-700

                transition-all

                hover:bg-slate-200
              '
            >
              Cancel
            </button>

            <button
              type='submit'
              disabled={loading}
              className='
                rounded-xl

                bg-blue-600

                px-5
                py-2.5

                font-medium
                text-white

                shadow-lg
                shadow-blue-200

                transition-all

                hover:bg-blue-700

                disabled:cursor-not-allowed
                disabled:opacity-60
              '
            >
              {loading ? 'Saving...' : 'Save Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}