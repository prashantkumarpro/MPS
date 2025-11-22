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
    res.status(500).json({ success: false, error: error.message })
  }
})

export default router
