import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// ===============================
// LOGIN CONTROLLER
// ===============================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      })
    }

    // 2️⃣ Find user by email (explicitly include password)
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    // 3️⃣ Check if user is active
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Account is disabled. Contact admin.'
      })
    }

    // 4️⃣ Compare password
    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    // 5️⃣ Update last login
    user.lastLogin = new Date()
    await user.save()

    // 6️⃣ Create JWT payload
    const payload = {
      id: user._id,
      role: user.role,
      studentId: user.studentId || null
    }

    // 7️⃣ Generate token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d'
    })

    // 8️⃣ Send response (never send password)
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Login Error:', error)

    res.status(500).json({
      success: false,
      message: 'Server error during login'
    })
  }
}


