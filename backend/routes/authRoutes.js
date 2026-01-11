import express from 'express'
import { loginUser } from '../controllers/authController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

// ===============================
// AUTH ROUTES
// ===============================

// @route   POST /api/auth/login
// @desc    Login user (admin / teacher / student)
// @access  Public
router.post('/login', loginUser)

// @route   GET /api/auth/me
// @desc    Get current logged-in user
// @access  Protected
router.get('/me', protect, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  })
})

export default router
