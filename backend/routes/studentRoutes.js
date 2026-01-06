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




export default router
