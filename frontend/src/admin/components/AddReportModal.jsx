import { useState } from 'react'
import { addReport } from '../../api'

import {
  classOptions,
  termOptions,
  yearOptions,
  classTypes
} from '../../constants/reportOptions'

import SelectBox from '../../components/SelectBox'

const inputClass = `
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
`

const textareaClass = `
  w-full
  rounded-xl
  border
  border-gray-200
  bg-white
  px-4
  py-3
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
`

const AddReportModal = ({ isOpen, onClose, fetchReports }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    studentClass: '',
    rollNumber: '',

    term: 'TERM_1',
    academicYear: '2025-26',
    classType: '',

    english: '',
    hindi: '',
    math: '',

    science: '',
    socialStudies: '',
    gk: '',

    table: '',
    rhymes: '',
    art: '',

    attendance: '',
    remarks: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  // ===============================
  // HANDLE CHANGE
  // ===============================
  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  // ===============================
  // SUBMIT
  // ===============================
  const handleSubmit = async e => {
    e.preventDefault()

    try {
      setLoading(true)

      setError('')

      setSuccess('')

      const data = await addReport(formData)

      console.log(data)

      if (data.success) {
        setSuccess('Report added successfully')

        fetchReports()

        setTimeout(() => {
          onClose()
        }, 1000)
      } else {
        setError(data.message || 'Something went wrong')
      }
    } catch (error) {
      console.log(error)

      setError('Failed to add report')
    } finally {
      setLoading(false)
    }
  }

  // ===============================
  // CLASS LOGIC
  // ===============================
  const normalizedClass = formData.studentClass?.trim()?.toUpperCase()

  const isPGOrNursery =
    normalizedClass === 'PG' || normalizedClass === 'NURSERY'

  const isUKGOrLKG =
    normalizedClass?.includes('UKG') || normalizedClass?.includes('LKG')

  if (!isOpen) return null

  return (
    <div
      className='
      fixed
      inset-0
      z-50

      bg-black/50
      backdrop-blur-sm

      flex
      items-center
      justify-center

      p-2
      md:p-6
    '
    >
      {/* MODAL */}
      <div
        className='
        relative

        w-full
        max-w-7xl

        h-[95vh]

        bg-slate-50

        rounded-3xl
        shadow-2xl

        overflow-hidden

        flex
        flex-col
      '
      >
        {/* HEADER */}
        <div
          className='
          sticky
          top-0
          z-30

          bg-white/95
          backdrop-blur-md

          border-b
          border-slate-200

          px-4
          md:px-8

          py-4

          flex
          items-center
          justify-between

          shrink-0
        '
        >
          <div>
            <h2
              className='
              text-2xl
              md:text-3xl
              font-bold
              text-slate-900
            '
            >
              Add Report
            </h2>

            <p
              className='
              text-sm
              text-slate-500
              mt-1
            '
            >
              Enter student report details
            </p>
          </div>

          <button
            onClick={onClose}
            className='
            flex
            items-center
            justify-center

            w-10
            h-10

            rounded-full

            text-slate-500
            hover:text-black
            hover:bg-slate-100

            transition
          '
          >
            ✕
          </button>
        </div>

        {/* SCROLLABLE BODY */}
        <div
          className='
          flex-1
          overflow-y-auto
        '
        >
          <form
            onSubmit={handleSubmit}
            className='
            p-4
            md:p-8

            space-y-6
          '
          >
            {/* STUDENT INFO */}
            <div
              className='
              bg-white

              rounded-3xl

              border
              border-slate-200

              p-5
              md:p-7

              shadow-sm
            '
            >
              <h3
                className='
                text-xl
                font-semibold
                text-slate-800

                mb-6
              '
              >
                Student Information
              </h3>

              <div
                className='
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3

                gap-5
              '
              >
                {/* STUDENT NAME */}
                <div className='space-y-2'>
                  <label
                    className='
                    text-sm
                    font-medium
                    text-slate-700
                  '
                  >
                    Student Name
                  </label>

                  <input
                    type='text'
                    name='studentName'
                    placeholder='Enter student name'
                    value={formData.studentName}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                {/* CLASS */}
                <SelectBox
                  label='Class'
                  value={formData.studentClass}
                  onChange={value => {
                    setFormData(prev => ({
                      ...prev,
                      studentClass: value.target.value
                    }))
                  }}
                  options={classOptions}
                  placeholder='Select Class'
                />

                {/* ROLL NUMBER */}
                <div className='space-y-2'>
                  <label
                    className='
                    text-sm
                    font-medium
                    text-slate-700
                  '
                  >
                    Roll Number
                  </label>

                  <input
                    type='number'
                    name='rollNumber'
                    placeholder='Enter roll number'
                    value={formData.rollNumber}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                {/* TERM */}
                <SelectBox
                  label='Term'
                  value={formData.term}
                  onChange={value => {
                    setFormData(prev => ({
                      ...prev,
                      term: value.target.value
                    }))
                  }}
                  options={termOptions}
                  placeholder='Select Term'
                />

                {/* YEAR */}
                <SelectBox
                  label='Academic Year'
                  value={formData.academicYear}
                  onChange={value => {
                    setFormData(prev => ({
                      ...prev,
                      academicYear: value.target.value
                    }))
                  }}
                  options={yearOptions}
                  placeholder='Academic Year'
                />

                {/* CLASS TYPE */}
                <SelectBox
                  label='Class Type'
                  value={formData.classType}
                  onChange={value => {
                    setFormData(prev => ({
                      ...prev,
                      classType: value.target.value
                    }))
                  }}
                  options={classTypes}
                  placeholder='Class Type'
                />
              </div>
            </div>

            {/* SUBJECTS */}
            <div
              className='
              bg-white

              rounded-3xl

              border
              border-slate-200

              p-5
              md:p-7

              shadow-sm
            '
            >
              <h3
                className='
                text-xl
                font-semibold
                text-slate-800

                mb-6
              '
              >
                Subject Marks
              </h3>

              <div
                className='
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3

                gap-5
              '
              >
                {/* ENGLISH */}
                <div className='space-y-2'>
                  <label
                    className='
                    text-sm
                    font-medium
                    text-slate-700
                  '
                  >
                    English
                  </label>

                  <input
                    type='number'
                    name='english'
                    placeholder='English marks'
                    value={formData.english}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                {/* HINDI */}
                <div className='space-y-2'>
                  <label
                    className='
                    text-sm
                    font-medium
                    text-slate-700
                  '
                  >
                    Hindi
                  </label>

                  <input
                    type='number'
                    name='hindi'
                    placeholder='Hindi marks'
                    value={formData.hindi}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                {/* MATH */}
                <div className='space-y-2'>
                  <label
                    className='
                    text-sm
                    font-medium
                    text-slate-700
                  '
                  >
                    Math
                  </label>

                  <input
                    type='number'
                    name='math'
                    placeholder='Math marks'
                    value={formData.math}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                {/* ART */}
                <div className='space-y-2'>
                  <label
                    className='
                    text-sm
                    font-medium
                    text-slate-700
                  '
                  >
                    Art
                  </label>

                  <input
                    type='text'
                    name='art'
                    placeholder='Art marks / grade'
                    value={formData.art}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                {/* PRIMARY */}
                {!isPGOrNursery && !isUKGOrLKG && (
                  <>
                    <div className='space-y-2'>
                      <label
                        className='
                        text-sm
                        font-medium
                        text-slate-700
                      '
                      >
                        Science
                      </label>

                      <input
                        type='number'
                        name='science'
                        placeholder='Science marks'
                        value={formData.science}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>

                    <div className='space-y-2'>
                      <label
                        className='
                        text-sm
                        font-medium
                        text-slate-700
                      '
                      >
                        Social Studies
                      </label>

                      <input
                        type='number'
                        name='socialStudies'
                        placeholder='Social Studies marks'
                        value={formData.socialStudies}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>

                    <div className='space-y-2'>
                      <label
                        className='
                        text-sm
                        font-medium
                        text-slate-700
                      '
                      >
                        GK
                      </label>

                      <input
                        type='number'
                        name='gk'
                        placeholder='GK marks'
                        value={formData.gk}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </>
                )}

                {/* UKG/LKG */}
                {isUKGOrLKG && (
                  <>
                    <div className='space-y-2'>
                      <label
                        className='
                        text-sm
                        font-medium
                        text-slate-700
                      '
                      >
                        Table
                      </label>

                      <input
                        type='number'
                        name='table'
                        placeholder='Table marks'
                        value={formData.table}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>

                    <div className='space-y-2'>
                      <label
                        className='
                        text-sm
                        font-medium
                        text-slate-700
                      '
                      >
                        Rhymes
                      </label>

                      <input
                        type='number'
                        name='rhymes'
                        placeholder='Rhymes marks'
                        value={formData.rhymes}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>

                    <div className='space-y-2'>
                      <label
                        className='
                        text-sm
                        font-medium
                        text-slate-700
                      '
                      >
                        GK
                      </label>

                      <input
                        type='number'
                        name='gk'
                        placeholder='GK marks'
                        value={formData.gk}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </>
                )}

                {/* PG/NURSERY */}
                {isPGOrNursery && (
                  <>
                    <div className='space-y-2'>
                      <label
                        className='
                        text-sm
                        font-medium
                        text-slate-700
                      '
                      >
                        Table
                      </label>

                      <input
                        type='number'
                        name='table'
                        placeholder='Table marks'
                        value={formData.table}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>

                    <div className='space-y-2'>
                      <label
                        className='
                        text-sm
                        font-medium
                        text-slate-700
                      '
                      >
                        Rhymes
                      </label>

                      <input
                        type='number'
                        name='rhymes'
                        placeholder='Rhymes marks'
                        value={formData.rhymes}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* OTHER DETAILS */}
            <div
              className='
              bg-white

              rounded-3xl

              border
              border-slate-200

              p-5
              md:p-7

              shadow-sm
            '
            >
              <h3
                className='
                text-xl
                font-semibold
                text-slate-800

                mb-6
              '
              >
                Other Details
              </h3>

              <div
                className='
                grid
                grid-cols-1
                lg:grid-cols-2

                gap-5
              '
              >
                {/* ATTENDANCE */}
                <div className='space-y-2'>
                  <label
                    className='
                    text-sm
                    font-medium
                    text-slate-700
                  '
                  >
                    Attendance
                  </label>

                  <input
                    type='text'
                    name='attendance'
                    placeholder='Attendance'
                    value={formData.attendance}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                {/* REMARKS */}
                <div className='space-y-2'>
                  <label
                    className='
                    text-sm
                    font-medium
                    text-slate-700
                  '
                  >
                    Remarks
                  </label>

                  <textarea
                    name='remarks'
                    placeholder='Write remarks'
                    rows={5}
                    value={formData.remarks}
                    onChange={handleChange}
                    className={textareaClass}
                  />
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div
              className='
              sticky
              bottom-0

              bg-slate-50/95
              backdrop-blur-md

              pt-4
            '
            >
              {/* ALERTS */}
              {error && (
                <div
                  className='
      bg-red-50
      border
      border-red-200
      text-red-700

      px-4
      py-3

      rounded-2xl
      text-sm
      font-medium
    '
                >
                  {error}
                </div>
              )}

              {success && (
                <div
                  className='
      bg-green-50
      border
      border-green-200
      text-green-700

      px-4
      py-3

      rounded-2xl
      text-sm
      font-medium
    '
                >
                  {success}
                </div>
              )}

              <button
                type='submit'
                disabled={loading}
                className='
    w-full
    h-14

    rounded-2xl

    bg-blue-600
    hover:bg-blue-700

    disabled:bg-blue-400
    disabled:cursor-not-allowed

    text-white
    font-semibold
    text-base

    transition-all
    duration-200

    shadow-lg
    shadow-blue-200

    flex
    items-center
    justify-center
  '
              >
                {loading ? (
                  <div
                    className='
        w-6
        h-6

        border-2
        border-white
        border-t-transparent

        rounded-full

        animate-spin
      '
                  />
                ) : (
                  'Save Report'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddReportModal
