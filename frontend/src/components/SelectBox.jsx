export default function SelectBox ({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Select option'
}) {
  return (
    <div className='flex flex-col gap-1'>
      {label && (
        <label className='text-sm font-medium text-gray-700'>{label}</label>
      )}

      <select
        value={value}
        onChange={onChange}
        className='
          w-48
          rounded-lg
          border
          border-gray-300
          bg-white
          px-3
          py-2
          text-sm
          text-gray-800
          shadow-sm
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
          hover:border-gray-400
          transition
        '
      >
        <option value=''>{placeholder}</option>

        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
