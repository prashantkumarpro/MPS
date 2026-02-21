import mongoose from 'mongoose'

const reportSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },

    // 🔑 Term & Academic Year (MANDATORY)
    term: {
      type: String,
      enum: ['TERM_1', 'TERM_2', 'TERM_3'],
      required: true
    },

    academicYear: {
      type: String, // e.g. "2025-26"
      required: true
    },

    // Common subjects (KG + Primary)
    english: Number,
    math: Number,
    hindi: Number,
    gk: Number,
    art: String,

    // Primary only (Class 1–8)
    science: Number,
    socialStudies: Number,

    // KG only (LKG & UKG)
    table: Number,
    rhymes: Number,

    // Other details
    totalMarks: Number,
    percentage: Number,
    grade: String,
    division: String,
    position: Number,
    attendance: String,
    remarks: String,

    // IMPORTANT for logic
    classType: {
      type: String,
      enum: ['KG', 'PRIMARY'],
      required: true
    }
  },
  { timestamps: true }
)

// 🔐 Prevent duplicate reports
// One student + one term + one academic year = ONE report
reportSchema.index({ studentId: 1, term: 1, academicYear: 1 }, { unique: true })

export default mongoose.model('Report', reportSchema)
