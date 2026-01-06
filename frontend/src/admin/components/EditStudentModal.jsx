export default function EditStudentModal ({
  open,
  student,
  onClose,
  onSubmit,
  loading
}) {
  if (!open || !student) return null

  return (
    <div className='fixed inset-0 bg-black/40 flex justify-center items-center z-50'>
      <div className='bg-white p-6 rounded-lg w-[500px]'>
        <h2 className='text-xl font-bold mb-4'>✏️ Edit Student</h2>

        <form onSubmit={onSubmit} className='space-y-3'>
          <input
            defaultValue={student.name}
            name='name'
            className='w-full border p-2'
            placeholder='Student Name'
          />

          <input
            defaultValue={student.parents?.fatherName || ''}
            name='fatherName'
            className='w-full border p-2'
            placeholder="Father's Name"
          />

          <input
            defaultValue={student.parents?.motherName || ''}
            name='motherName'
            className='w-full border p-2'
            placeholder="Mother's Name"
          />

          <input
            type='date'
            defaultValue={
              student.personal?.dob ? student.personal.dob.split('T')[0] : ''
            }
            name='dob'
            className='w-full border p-2'
          />

          <input
            defaultValue={student.parents?.mobile || ''}
            name='mobile'
            className='w-full border p-2'
            placeholder='Parent Mobile'
          />

          <textarea
            defaultValue={student.personal?.address || ''}
            name='address'
            className='w-full border p-2'
            placeholder='Address'
          />

          <div className='flex justify-end gap-3 mt-4'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 bg-gray-200 rounded'
            >
              Cancel
            </button>

            <button
              type='submit'
              disabled={loading}
              className='px-4 py-2 bg-blue-600 text-white rounded'
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
