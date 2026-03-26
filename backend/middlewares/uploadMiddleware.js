import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import cloudinary from '../config/cloudinary.js'

// 🔥 FIXED STORAGE
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isPdf = file.mimetype === 'application/pdf'

    return {
      folder: 'mps_notices',

      // ✅ KEY FIX
      resource_type: isPdf ? 'raw' : 'image',

      // optional: better unique name
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`
    }
  }
})

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
})

export default upload
