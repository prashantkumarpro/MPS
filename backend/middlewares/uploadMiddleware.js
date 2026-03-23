import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto"; // ⚠️ you also missed this

// 🔥 DEFINE UPLOAD PATH
const uploadDir = path.join("uploads", "notices");

// 🔥 CREATE FOLDER IF NOT EXISTS
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // ✅ use dynamic path
  },

  filename: function (req, file, cb) {
    const id = crypto.randomUUID();
    const ext = path.extname(file.originalname);
    cb(null, `${id}${ext}`);
  },
});

// file filter
const fileFilter = (req, file, cb) => {
  const allowed = /pdf|jpg|jpeg|png|webp/;
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowed.test(ext)) cb(null, true);
  else cb(new Error("Only PDF and images allowed"), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

export default upload;