import { useCountUp } from '../hooks/useCountUp'

const StatCard = ({ title, value, icon, color }) => {
  const animatedValue = useCountUp(value)

  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        border-gray-100
        shadow-sm
        p-5
        hover:shadow-md
        transition-all
        duration-300
      "
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            {animatedValue.toLocaleString()}
          </h2>

          <p className="text-xs text-emerald-600 font-medium mt-2">
            Active
          </p>
        </div>

        <div
          className={`
            h-12
            w-12
            rounded-xl
            flex
            items-center
            justify-center
            text-white
            ${color}
          `}
        >
          {icon}
        </div>
      </div>
    </div>
  )
}

export default StatCard