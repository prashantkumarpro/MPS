import Report from '../models/Report.js'
import Student from '../models/Student.js'

export const getClassReports = async (req, res) => {
  try {
    const { className } = req.params
    const { term, academicYear } = req.query

    // 🔴 Mandatory checks
    if (!term || !academicYear) {
      return res.status(400).json({
        success: false,
        message: 'term and academicYear are required'
      })
    }

    // 1️⃣ Find students of this class
    const students = await Student.find(
      { class: className },
      '_id name rollNumber class'
    )

    const studentIds = students.map(s => s._id)

    // 2️⃣ Find reports for those students (TERM + YEAR)
    const reports = await Report.find({
      studentId: { $in: studentIds },
      term,
      academicYear
    })
      .populate('studentId', 'name rollNumber class')
      .sort({ position: 1 })
      .lean()

    res.status(200).json({
      success: true,
      data: reports
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
