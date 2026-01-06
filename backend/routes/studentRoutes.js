import express from 'express'
import Student from '../models/Student.js'
const router = express.Router()

// Add new student
router.post('/add', async (req, res) => {
  try {
    const student = new Student(req.body)
    await student.save()

    res.status(201).json({
      success: true,
      message: 'Student added successfully',
      student
    })
  } catch (error) {
    // ⚠️ Duplicate roll number error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Roll number already exists in this class'
      })
    }

    res.status(500).json({
      success: false,
      error: 'Failed to add student'
    })
  }
})

// Get students with pagination, filter, sort
router.get('/', async (req, res) => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    const filter = {}
    if (req.query.class) {
      filter.class = req.query.class
    }

    let sort = {}
    if (req.query.sort === 'roll') sort.rollNumber = 1
    if (req.query.sort === 'name') sort.name = 1

    const students = await Student.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)

    const total = await Student.countDocuments(filter)

    res.json({
      success: true,
      data: students,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

// Get single student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)

    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      })
    }

    res.status(200).json({
      success: true,
      data: student
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch student'
    })
  }
})

// Update student
router.put('/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: updatedStudent
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Roll number already exists in this class'
      })
    }

    res.status(500).json({
      success: false,
      error: 'Failed to update student'
    })
  }
})


// Delete student
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id)

    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete student'
    })
  }
})

export default router
