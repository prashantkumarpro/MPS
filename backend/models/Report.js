import mongoose from 'mongoose'

const reportSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
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
    position:Number,
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

export default mongoose.model('Report', reportSchema)
