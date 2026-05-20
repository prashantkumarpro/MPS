import Report from '../models/Report.js'

export const assignPositions = async (
  className,
  classType,
  term,
  academicYear
) => {

  const reports = await Report.find({
    classType,
    term,
    academicYear
  }).populate('studentId')

  // ===============================
  // FILTER CLASS REPORTS
  // ===============================
  const classReports = reports.filter(
    r =>
      r.studentId?.class
        ?.trim()
        .toUpperCase() ===
      className.trim().toUpperCase()
  )

  // ===============================
  // SORT
  // ===============================
  classReports.sort((a, b) => {

    if (b.percentage !== a.percentage) {
      return b.percentage - a.percentage
    }

    return b.totalMarks - a.totalMarks
  })

  // ===============================
  // POSITION LOGIC
  // ===============================
  let lastOM = null
  let lastPercentage = null
  let lastPosition = 0

  for (let i = 0; i < classReports.length; i++) {

    const r = classReports[i]

    const isTie =
      r.totalMarks === lastOM &&
      r.percentage === lastPercentage

    const position =
      isTie
        ? lastPosition
        : i + 1

    await Report.updateOne(
      { _id: r._id },
      { position }
    )

    lastOM = r.totalMarks
    lastPercentage = r.percentage
    lastPosition = position
  }
}