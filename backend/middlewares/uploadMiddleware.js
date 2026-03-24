import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import cloudinary from '../config/cloudinary.js'

// 🔥 Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'mps_notices', // folder in cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'pdf']
  }
})

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // optional
  }
})

export default upload
