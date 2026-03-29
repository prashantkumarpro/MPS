import cloudinary from '../config/cloudinary.js'
import Notice from '../models/Notice.js'

export const createNotice = async (req, res) => {
  try {
    const { title, content, isImportant } = req.body

    // ✅ handle multiple files (UPDATED)
    const files = req.files.map(file => ({
      url: file.path,
      public_id: file.filename,
      type: file.mimetype,
      originalName: file.originalname
    }))

    console.log('FILES:', req.files)
    console.log('BODY:', req.body)

    const notice = await Notice.create({
      title,
      content,
      files,

      // ✅ FIX boolean issue (already good)
      isImportant: isImportant === 'true' || isImportant === true,

      createdBy: req.user._id
    })

    res.status(201).json({
      message: 'Notice created successfully',
      notice
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Failed to create notice',
      error: error.message
    })
  }
}

export const getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find()
      .select('-__v')
      .populate('createdBy', 'name')
      .sort({ isImportant: -1, createdAt: -1 })

    // ✅ optional: format response (clean data)
    const formattedNotices = notices.map(notice => ({
      ...notice.toObject(),
      files: notice.files.map(file => ({
        url: file.url
        // we hide public_id from frontend (security + clean UI)
      }))
    }))

    res.status(200).json(formattedNotices)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Error fetching notices',
      error: error.message
    })
  }
}

export const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params

    const notice = await Notice.findById(id)

    if (!notice) {
      return res.status(404).json({
        message: 'Notice not found'
      })
    }

    // 🔥 DELETE FILES FROM CLOUDINARY
    if (notice.files && notice.files.length > 0) {
      for (const file of notice.files) {
        try {
          await cloudinary.uploader.destroy(file.public_id, {
            resource_type: 'raw' // ✅ needed for PDF
          })
        } catch (err) {
          console.log('Error deleting file:', err.message)
        }
      }
    }

    // ✅ DELETE NOTICE FROM DB
    await notice.deleteOne()

    res.status(200).json({
      message: 'Notice deleted successfully'
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Failed to delete notice',
      error: error.message
    })
  }
}

export const updateNotice = async (req, res) => {
  try {
    const { id } = req.params
    const { title, content, isImportant, removeFiles } = req.body

    const notice = await Notice.findById(id)

    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' })
    }

    // ✅ Update text fields
    notice.title = title || notice.title
    notice.content = content || notice.content
    notice.isImportant = isImportant === 'true' || isImportant === true

    // 🔥 1. DELETE SELECTED OLD FILES
    if (removeFiles) {
      const filesToRemove = JSON.parse(removeFiles) // array of public_id

      for (const public_id of filesToRemove) {
        const file = notice.files.find(f => f.public_id === public_id)

        if (file) {
          const isPdf = file.url.includes('/raw/')

          await cloudinary.uploader.destroy(public_id, {
            resource_type: isPdf ? 'raw' : 'image'
          })

          // remove from DB array
          notice.files = notice.files.filter(f => f.public_id !== public_id)
        }
      }
    }

    // 🔥 2. ADD NEW FILES (if uploaded)
    if (req.files && req.files.length > 0) {
      const newFiles = req.files.map(file => ({
        url: file.path,
        public_id: file.filename
      }))

      notice.files.push(...newFiles)
    }

    await notice.save()

    res.status(200).json({
      message: 'Notice updated successfully',
      notice
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Failed to update notice',
      error: error.message
    })
  }
}
