import mongoose from 'mongoose'

const reportSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },

    english: Number,
    math: Number,
    hindi: Number,
    science: Number,
    socialStudies: Number,
    gk: Number,

    art: String,

    totalMarks: Number,
    percentage: Number,
    grade: String,
    division: String,

    attendance: String,
    remarks: String
  },
  { timestamps: true }
)

export default mongoose.model('Report', reportSchema)
