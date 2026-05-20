export default function SelectBox({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Select option',
  name
}) {

  return (
    <div className="w-full">

      {label && (
        <label
          className="
            block
            mb-2
            text-sm
            font-semibold
            text-gray-700
          "
        >
          {label}
        </label>
      )}

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="
          w-full
          h-12
          rounded-xl
          border
          border-gray-200
          bg-white
          px-4
          text-sm
          text-gray-700
          shadow-sm
          outline-none
          transition-all
          duration-200

          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-100

          hover:border-gray-300
        "
      >

        <option value="">
          {placeholder}
        </option>

        {options.map(option => (

          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>

        ))}

      </select>
    </div>
  )
}