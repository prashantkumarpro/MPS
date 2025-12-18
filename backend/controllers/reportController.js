import Report from '../models/Report.js'

export const getClassReports = async (req, res) => {
  try {
    const className = req.params.className // "I"

    const reports = await Report.find()
      .populate({
        path: 'studentId',
        match: { class: className },
        select: 'name rollNumber class'
      })
      .lean()

    const filteredReports = reports.filter(r => r.studentId)

    res.status(200).json(filteredReports)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
