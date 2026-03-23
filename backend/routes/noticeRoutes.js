import express from "express";
import { createNotice, deleteNotice, getAllNotices, updateNotice } from "../controllers/noticeController.js";
import { protect, allowRoles  } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// ✅ allow multiple files (max 5)
router.post(
  "/",
  protect,
  allowRoles("admin"),
 upload.array("files", 5),
  createNotice
);

router.get(
  "/",
  getAllNotices
);


router.delete(
  "/:id",
  protect,
  allowRoles("admin"), 
  deleteNotice
);

router.put(
  "/:id",
  protect,
  allowRoles("admin"),
  updateNotice
);
export default router;