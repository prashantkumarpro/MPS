import mongoose from 'mongoose'

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    content: {
      type: String,
      required: true
    },

    // ✅ upgraded files structure
    files: [
      {
        url: {
          type: String, // Cloudinary URL
          required: true
        },
        public_id: {
          type: String, // needed for delete from cloudinary
          required: true
        }
      }
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    isImportant: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('Notice', noticeSchema)
