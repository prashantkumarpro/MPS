import { ChevronDown } from 'lucide-react'
export default function SelectBox ({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Select option',
  name
}) {
  return (
    <div className='w-full'>
      {label && (
        <label className='block mb-2 text-sm font-semibold text-gray-700'>
          {label}
        </label>
      )}

      <div className='relative'>
        <select
          name={name}
          value={value}
          onChange={onChange}
          className='
            w-full
            h-12

            appearance-none

            rounded-xl

            border
            border-slate-200

            bg-white

            pl-4
            pr-11

            text-sm
            font-medium

            text-slate-700

            shadow-sm

            outline-none

            transition-all
            duration-200

            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-50

            hover:border-slate-300
          '
        >
          <option value=''>{placeholder}</option>

          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={18}
          className='
            pointer-events-none
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-slate-500
          '
        />
      </div>
    </div>
  )
}
