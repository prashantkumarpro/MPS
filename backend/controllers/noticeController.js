import Notice from '../models/Notice.js'

export const createNotice = async (req, res) => {
  try {
    const { title, content, isImportant } = req.body;

    // ✅ handle multiple files
    const files = req.files
      ? req.files.map(file => file.path)
      : [];

    console.log("FILES:", req.files);
    console.log("BODY:", req.body);

    const notice = await Notice.create({
      title,
      content,
      files,

      // 🔥 IMPORTANT FIX
      isImportant: isImportant === "true" || isImportant === true,

      createdBy: req.user._id
    });

    res.status(201).json({
      message: "Notice created successfully",
      notice
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to create notice",
      error: error.message
    });
  }
};

export const getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find()
      .select("-__v") // remove unnecessary fields
      .populate("createdBy", "name")
      .sort({ isImportant: -1, createdAt: -1 });

    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching notices",
      error: error.message,
    });
  }
};

export const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;

    const notice = await Notice.findById(id);

    if (!notice) {
      return res.status(404).json({
        message: "Notice not found",
      });
    }

    await notice.deleteOne();

    res.status(200).json({
      message: "Notice deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete notice",
      error: error.message,
    });
  }
};

export const updateNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, isImportant } = req.body;

    const notice = await Notice.findById(id);

    if (!notice) {
      return res.status(404).json({ message: "Notice not found" });
    }

    notice.title = title || notice.title;
    notice.content = content || notice.content;
    notice.isImportant =
      isImportant === "true" || isImportant === true;

    await notice.save();

    res.status(200).json({
      message: "Notice updated successfully",
      notice,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update notice",
      error: error.message,
    });
  }
};