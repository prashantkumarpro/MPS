import express from 'express'
import Report from '../models/Report.js'
import Student from '../models/Student.js'
import { getClassReports } from '../controllers/reportController.js'

const router = express.Router()

// ===============================
// ADD REPORT (TERM-WISE)
// ===============================
router.post('/add', async (req, res) => {
  try {
    const {
      studentId,
      term,
      academicYear,
      classType,

      english,
      math,
      hindi,
      science,
      socialStudies,
      gk,
      art,
      table,
      rhymes,

      attendance,
      remarks,
      position
    } = req.body

    // 🔴 Mandatory checks (important)
    if (!studentId || !term || !academicYear || !classType) {
      return res.status(400).json({
        success: false,
        message: 'studentId, term, academicYear and classType are required'
      })
    }

    // ===============================
    // TOTAL MARKS CALCULATION
    // ===============================
    let totalMarks = 0
    let maxMarks = 0

    if (classType === 'PRIMARY') {
      totalMarks =
        (english || 0) +
        (math || 0) +
        (hindi || 0) +
        (science || 0) +
        (socialStudies || 0) +
        (gk || 0)

      maxMarks = 300 // 6 subjects × 50
    }

    if (classType === 'KG') {
      totalMarks =
        (english || 0) +
        (math || 0) +
        (hindi || 0) +
        (gk || 0) +
        (table || 0) +
        (rhymes || 0)

      maxMarks = 300
    }

    const percentage = maxMarks ? (totalMarks / maxMarks) * 100 : 0

    // ===============================
    // GRADE CALCULATION
    // ===============================
    let grade = ''
    if (percentage >= 80) grade = 'A'
    else if (percentage >= 60) grade = 'B'
    else if (percentage >= 45) grade = 'C'
    else grade = 'D'

    // ===============================
    // DIVISION CALCULATION
    // ===============================
    let division = ''
    if (percentage >= 60) division = 'First'
    else if (percentage >= 45) division = 'Second'
    else if (percentage >= 33) division = 'Third'
    else division = 'Fail'

    // ===============================
    // SAVE REPORT
    // ===============================
    const report = new Report({
      studentId,
      term,
      academicYear,
      classType,

      english,
      math,
      hindi,
      science,
      socialStudies,
      gk,
      art,
      table,
      rhymes,

      totalMarks,
      percentage,
      grade,
      division,
      attendance,
      remarks,
      position
    })

    await report.save()

    res.status(201).json({
      success: true,
      message: 'Report added successfully',
      report
    })

  } catch (error) {
    // 🔐 Duplicate report protection
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Report already exists for this student, term and academic year'
      })
    }

    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

// ===============================
// VIEW REPORT (CLASS + ROLL + TERM)
// ===============================
router.post('/view', async (req, res) => {
  try {
    const { studentClass, rollNumber, term, academicYear } = req.body

    if (!studentClass || !rollNumber || !term || !academicYear) {
      return res.status(400).json({
        success: false,
        message: 'Class, Roll Number, Term and Academic Year are required'
      })
    }

    // Find student
    const student = await Student.findOne({
      class: studentClass.toUpperCase(),
      rollNumber
    })

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'No student found'
      })
    }

    // Find term-wise report
    const report = await Report.findOne({
      studentId: student._id,
      term,
      academicYear
    })

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found for this term'
      })
    }

    res.json({
      success: true,
      message: 'Report fetched successfully',
      student,
      report
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

// ===============================
// GET ALL REPORTS OF A CLASS
// ===============================
router.get('/class/:className', getClassReports)

export default router