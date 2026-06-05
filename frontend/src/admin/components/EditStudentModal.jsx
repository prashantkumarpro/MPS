import { UserPen, X } from 'lucide-react'

export default function EditStudentModal({
  open,
  student,
  onClose,
  onSubmit,
  loading
}) {
  if (!open || !student) return null

  return (
    <div
      className="
        fixed
        inset-0
        z-50

        flex
        items-center
        justify-center

        bg-black/50
        backdrop-blur-sm

        p-4
      "
    >
      <div
        className="
          w-full
          max-w-2xl

          overflow-hidden

          rounded-3xl

          bg-white

          shadow-[0_25px_80px_-12px_rgba(0,0,0,0.25)]
        "
      >
        {/* Header */}
        <div className="border-b border-slate-100 px-6 py-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center

                    rounded-2xl

                    bg-amber-50

                    text-amber-600
                  "
                >
                  <UserPen size={20} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Edit Student
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Update student information
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="
                h-10
                w-10

                rounded-xl

                flex
                items-center
                justify-center

                text-slate-400

                hover:bg-slate-100
                hover:text-slate-700

                transition-all
              "
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <form onSubmit={onSubmit}>
          <div className="max-h-[70vh] overflow-y-auto p-6">
            {/* Student Section */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">
                Student Information
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Student Name
                  </label>

                  <input
                    defaultValue={student.name}
                    name="name"
                    className="
                      h-12
                      w-full

                      rounded-2xl

                      border
                      border-slate-200

                      bg-slate-50

                      px-4

                      outline-none

                      focus:border-blue-500
                      focus:ring-4
                      focus:ring-blue-100
                    "
                  />
                </div>

                <div>
                  <label className="block mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Date of Birth
                  </label>

                  <input
                    type="date"
                    defaultValue={
                      student.personal?.dob
                        ? student.personal.dob.split('T')[0]
                        : ''
                    }
                    name="dob"
                    className="
                      h-12
                      w-full

                      rounded-2xl

                      border
                      border-slate-200

                      bg-slate-50

                      px-4

                      outline-none

                      focus:border-blue-500
                      focus:ring-4
                      focus:ring-blue-100
                    "
                  />
                </div>
              </div>
            </div>

            {/* Parent Section */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">
                Parent Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  defaultValue={student.parents?.fatherName || ''}
                  name="fatherName"
                  placeholder="Father's Name"
                  className="
                    h-12
                    rounded-2xl

                    border
                    border-slate-200

                    bg-slate-50

                    px-4

                    outline-none

                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                  "
                />

                <input
                  defaultValue={student.parents?.motherName || ''}
                  name="motherName"
                  placeholder="Mother's Name"
                  className="
                    h-12
                    rounded-2xl

                    border
                    border-slate-200

                    bg-slate-50

                    px-4

                    outline-none

                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                  "
                />

                <input
                  defaultValue={student.parents?.mobile || ''}
                  name="mobile"
                  placeholder="Parent Mobile"
                  className="
                    h-12
                    rounded-2xl

                    border
                    border-slate-200

                    bg-slate-50

                    px-4

                    outline-none

                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                  "
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">
                Address
              </h3>

              <textarea
                rows={4}
                defaultValue={student.personal?.address || ''}
                name="address"
                placeholder="Enter address"
                className="
                  w-full

                  rounded-2xl

                  border
                  border-slate-200

                  bg-slate-50

                  p-4

                  outline-none

                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-100
                "
              />
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-100 px-6 py-5">
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="
                  px-5
                  py-2.5

                  rounded-xl

                  bg-slate-100

                  text-slate-700
                  font-medium

                  hover:bg-slate-200
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="
                  px-5
                  py-2.5

                  rounded-xl

                  bg-blue-600

                  text-white
                  font-medium

                  hover:bg-blue-700

                  disabled:opacity-60
                "
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}