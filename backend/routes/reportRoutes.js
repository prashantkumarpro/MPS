import express from 'express'
import Report from '../models/Report.js'
import Student from '../models/Student.js'
import { getClassReports } from '../controllers/reportController.js'
import { calculateReportData } from '../utils/calculateReportData.js'

import { assignPositions } from '../utils/assignPositions.js'

const router = express.Router()

// ===============================
// ADD REPORT (TERM-WISE)
// ===============================
router.post('/add', async (req, res) => {
  try {
    const {
      studentClass,
      rollNumber,
      studentName,

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
      remarks
    } = req.body

    // ===============================
    // REQUIRED FIELDS
    // ===============================
    if (
      !studentClass ||
      !rollNumber ||
      !studentName ||
      !term ||
      !academicYear ||
      !classType
    ) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      })
    }

    // ===============================
    // FIND STUDENT
    // ===============================
    const student = await Student.findOne({
      class: studentClass.toUpperCase(),
      rollNumber,
      name: studentName
    })

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'No student found with given class, roll number and name'
      })
    }

    // ===============================
    // CALCULATIONS
    // ===============================
    const { totalMarks, percentage, grade, division } = calculateReportData(
      student.class,
      {
        english,
        math,
        hindi,
        science,
        socialStudies,
        gk,
        art,
        table,
        rhymes
      }
    )

    // ===============================
    // SAVE REPORT
    // ===============================
    const report = new Report({
      studentId: student._id,

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
      remarks
    })

    await report.save()

    // ===============================
    // AUTO POSITION
    // ===============================
    await assignPositions(student.class, classType, term, academicYear)

    res.status(201).json({
      success: true,
      message: 'Report added successfully',
      report
    })
  } catch (error) {
    // ===============================
    // DUPLICATE REPORT
    // ===============================
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message:
          'Report already exists for this student, term and academic year'
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
// GET ALL REPORTS (ADMIN)
// ===============================
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find()
      .populate('studentId', 'name rollNumber class')
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      data: reports
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

// ===============================
// UPDATE REPORT
// ===============================

router.put('/:id', async (req, res) => {

  try {

    const report =
      await Report.findById(
        req.params.id
      )

    if (!report) {

      return res.status(404).json({
        success: false,
        message: 'Report not found'
      })
    }

    // ===============================
    // UPDATE DATA
    // ===============================
    const updatedData = {
      ...report.toObject(),
      ...req.body
    }

    // ===============================
    // CALCULATE AGAIN
    // ===============================
    const calculatedData =
      calculateReportData(
        updatedData.studentClass ||
        updatedData.studentId?.class ||
        report.studentId?.class,

        updatedData
      )

    // ===============================
    // FINAL UPDATE
    // ===============================
    const updatedReport =
      await Report.findByIdAndUpdate(

        req.params.id,

        {
          ...updatedData,

          totalMarks:
            calculatedData.totalMarks,

          percentage:
            calculatedData.percentage,

          grade:
            calculatedData.grade,

          division:
            calculatedData.division
        },

        {
          new: true
        }
      )

    res.status(200).json({
      success: true,
      message:
        'Report updated successfully',
      data: updatedReport
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})
// ===============================
// DELETE REPORT
// ===============================
router.delete('/:id', async (req, res) => {
  try {
    await Report.findByIdAndDelete(req.params.id)

    res.status(200).json({
      success: true,
      message: 'Report deleted successfully'
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
