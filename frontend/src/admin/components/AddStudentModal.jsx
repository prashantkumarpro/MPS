export default function AddStudentModal ({
  open,
  onClose,
  onSubmit,
  loading
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            ➕ Add Student
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Student Name"
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <select
            name="class"
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Select Class</option>
            <option value="NURSERY">Nursery</option>
            <option value="PG">PG</option>
            <option value="LKG">LKG</option>
            <option value="UKGA">UKGA</option>
            <option value="UKGB">UKGB</option>
            <option value="I">Class I</option>
            <option value="II">Class II</option>
            <option value="III">Class III</option>
            <option value="III">Class IV</option>
            <option value="III">Class V</option>
            <option value="III">Class VI</option>
            <option value="III">Class VII</option>
            <option value="III">Class VIII</option>
          </select>

          <input
            type="number"
            name="rollNumber"
            placeholder="Roll Number"
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
