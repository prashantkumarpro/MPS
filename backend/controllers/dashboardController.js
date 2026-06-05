import Student from "../models/Student.js";
import User from "../models/User.js";
import Report from "../models/Report.js";
import Notice from "../models/Notice.js";


export const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalTeachers = await User.countDocuments({ role: "teacher" });
    const totalReports = await Report.countDocuments();
    const totalNotices = await Notice.countDocuments();
    res.status(200).json({
      totalStudents,
      totalTeachers,
      totalReports,
      totalNotices
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};