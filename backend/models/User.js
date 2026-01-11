import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    // ---------------- BASIC INFO ----------------
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      select: false // 🔒 never return password by default
    },

    // ---------------- ROLE ----------------
    role: {
      type: String,
      enum: ['admin', 'teacher', 'student'],
      required: true
    },

    // ---------------- STUDENT LINK ----------------
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      default: null
    },

    // ---------------- STATUS ----------------
    isActive: {
      type: Boolean,
      default: true
    },

    lastLogin: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
)

/* ================= PASSWORD HASHING ================= */

// Hash password before saving
userSchema.pre('save', async function (next) {
  // Only hash if password is new or modified
  if (!this.isModified('password')) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

/* ================= PASSWORD COMPARE METHOD ================= */

// Compare entered password with hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

export default mongoose.model('User', userSchema)
