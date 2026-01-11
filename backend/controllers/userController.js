import User from '../models/User.js'
import Student from '../models/Student.js'

// =======================================
// CREATE TEACHER USER (ADMIN ONLY)
// =======================================
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    // 1️⃣ Validate input
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, password and role are required'
      })
    }

    // 2️⃣ Only teacher allowed here
    if (role !== 'teacher') {
      return res.status(400).json({
        success: false,
        message: 'Only teacher users can be created here'
      })
    }

    // 3️⃣ Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      })
    }

    // 4️⃣ Create teacher user
    const user = new User({
      name,
      email,
      password, // 🔒 auto-hashed by schema
      role: 'teacher'
    })

    await user.save()

    res.status(201).json({
      success: true,
      message: 'Teacher user created successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Create Teacher Error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error while creating teacher'
    })
  }
}

// =======================================
// CREATE STUDENT LOGIN (ADMIN ONLY)
// =======================================
export const createStudentLogin = async (req, res) => {
  try {
    const { studentId } = req.params
    const { email, password } = req.body

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      })
    }

    // 2️⃣ Check student exists
    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      })
    }

    // 3️⃣ Prevent duplicate login
    const existingUser = await User.findOne({ studentId })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Login already exists for this student'
      })
    }

    // 4️⃣ Create student login
    const user = new User({
      name: student.name,
      email,
      password, // 🔒 auto-hashed by schema
      role: 'student',
      studentId: student._id
    })

    await user.save()

    res.status(201).json({
      success: true,
      message: 'Student login created successfully'
    })
  } catch (error) {
    console.error('Create Student Login Error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error while creating student login'
    })
  }
}
