import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    class: {
      type: String,
      required: true
    },
    rollNumber: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
)

// ⚡ Make rollNumber unique per class
studentSchema.index({ class: 1, rollNumber: 1 }, { unique: true })

export default mongoose.model('Student', studentSchema)
