import express from 'express'
import Report from '../models/Report.js'
import Student from '../models/Student.js'

const router = express.Router()

// Add Report
router.post('/add', async (req, res) => {
  try {
    const {
      studentId,
      english,
      math,
      hindi,
      science,
      socialStudies,
      gk,
      attendance,
      remarks
    } = req.body

    // Calculate total (300)
    const totalMarks =
      (english || 0) +
      (math || 0) +
      (hindi || 0) +
      (science || 0) +
      (socialStudies || 0) +
      (gk || 0)

    // 6 subjects * 50 marks = 300 total
    const percentage = (totalMarks / 300) * 100

    // Grade calculation
    let grade = ''
    if (percentage >= 80) grade = 'A'
    else if (percentage >= 60) grade = 'B'
    else if (percentage >= 45) grade = 'C'
    else grade = 'D'

    const report = new Report({
      studentId,
      english,
      math,
      hindi,
      science,
      socialStudies,
      gk,
      totalMarks,
      percentage,
      grade,
      attendance,
      remarks
    })

    await report.save()

    res.json({
      success: true,
      message: 'Report added successfully',
      report
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

// GET report by class, rollNumber
router.post('/view', async (req, res) => {
  try {
    const { studentClass, rollNumber } = req.body

    if (!studentClass || !rollNumber) {
      return res.status(400).json({
        success: false,
        message: 'Class and Roll Number are required'
      })
    }

    // Find student by class + roll number
    const student = await Student.findOne({
      class: studentClass,
      rollNumber: rollNumber
    })

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'No student found'
      })
    }

    // Find report using student._id
    const report = await Report.findOne({ studentId: student._id })

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found for this student'
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

export default router
