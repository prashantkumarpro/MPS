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
    },

    parents: {
      fatherName: String,
      motherName: String,
      mobile: String,
      email: String
    },
    personal: {
      dob: Date,
      address: String
    }
  },
  { timestamps: true }
)

// ⚡ Make rollNumber unique per class
studentSchema.index({ class: 1, rollNumber: 1 }, { unique: true })

export default mongoose.model('Student', studentSchema)
