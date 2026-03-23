import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// ===============================
// AUTH MIDDLEWARE (VERIFY TOKEN)
// ===============================
export const protect = async (req, res, next) => {
  try {
    let token

    // 1️⃣ Check Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token missing'
      })
    }

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // 3️⃣ Fetch user from DB (without password)
    const user = await User.findById(decoded.id)

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User no longer exists'
      })
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Account is disabled'
      })
    }

    // 4️⃣ Attach user to request
    req.user = {
      _id: user._id, 
      role: user.role,
      studentId: user.studentId
    }

    next()
  } catch (error) {
    console.error('Auth Error:', error)

    return res.status(401).json({
      success: false,
      message: 'Not authorized, token invalid'
    })
  }
}

// ===============================
// ROLE-BASED ACCESS
// ===============================
export const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      })
    }
    next()
  }
}
