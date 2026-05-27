import {
  useContext,
  useState
} from 'react'

import {
  useNavigate
} from 'react-router-dom'

import {
  ReportContext
} from '../../context/ReportContext'

import {
  updateReport
} from '../../api'

const EditReport = () => {

  const navigate = useNavigate()

  const {
    report
  } = useContext(ReportContext)

  const [formData, setFormData] =
    useState({

      english:
        report?.english || '',

      math:
        report?.math || '',

      hindi:
        report?.hindi || '',

      science:
        report?.science || '',

      socialStudies:
        report?.socialStudies || '',

      gk:
        report?.gk || '',

      table:
        report?.table || '',

      rhymes:
        report?.rhymes || '',

      art:
        report?.art || '',

      attendance:
        report?.attendance || '',

      remarks:
        report?.remarks || ''
    })

  // CHANGE
  const handleChange = e => {

    setFormData(prev => ({
      ...prev,
      [e.target.name]:
        e.target.value
    }))
  }

  // SUBMIT
  const handleSubmit = async e => {

    e.preventDefault()

    try {

      const res =
        await updateReport(
          report._id,
          formData
        )

      if (res.success) {

        navigate('/admin/reports')
      }

    } catch (error) {

      console.log(error)
    }
  }

  return (

    <div className="p-6">

      <h1
        className="
          text-2xl
          font-bold

          mb-6
        "
      >
        Edit Report
      </h1>

      <form
        onSubmit={handleSubmit}
        className="
          grid
          grid-cols-2

          gap-4
        "
      >

        <input
          type="number"
          name="english"
          value={formData.english}
          onChange={handleChange}
          placeholder="English"
          className="
            border
            p-3
            rounded-lg
          "
        />

        <input
          type="number"
          name="math"
          value={formData.math}
          onChange={handleChange}
          placeholder="Math"
          className="
            border
            p-3
            rounded-lg
          "
        />

        <input
          type="number"
          name="hindi"
          value={formData.hindi}
          onChange={handleChange}
          placeholder="Hindi"
          className="
            border
            p-3
            rounded-lg
          "
        />

        <textarea
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          placeholder="Remarks"
          className="
            border
            p-3
            rounded-lg

            col-span-2
          "
        />

        <button
          type="submit"
          className="
            bg-blue-600

            text-white

            py-3

            rounded-lg

            col-span-2
          "
        >
          Update Report
        </button>

      </form>

    </div>
  )
}

export default EditReport