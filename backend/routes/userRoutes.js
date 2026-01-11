import express from 'express'
import {
  createUser,
  createStudentLogin
} from '../controllers/userController.js'
import { protect, allowRoles } from '../middlewares/authMiddleware.js'

const router = express.Router()

// ===============================
// USER ROUTES (ADMIN ONLY)
// ===============================

// Create Teacher User
// POST /api/users
router.post(
  '/',
  protect,
  allowRoles('admin'),
  createUser
)

// Create Student Login
// POST /api/users/student/:studentId
router.post(
  '/student/:studentId',
  protect,
  allowRoles('admin'),
  createStudentLogin
)

export default router
