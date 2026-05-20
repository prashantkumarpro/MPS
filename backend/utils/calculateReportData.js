import { REPORT_CONFIGS } from '../constants/reportConfigs.js'

export const calculateReportData = (className, marks) => {
  // ===============================
  // NORMALIZE CLASS
  // ===============================
  const normalizedClass = className.trim().toUpperCase()

  // ===============================
  // GET CONFIG
  // ===============================
  const config = REPORT_CONFIGS[normalizedClass]

  if (!config) {
    throw new Error(`No report config found for ${className}`)
  }

  // ===============================
  // SUBJECTS
  // ===============================
  const subjects = config.subjects

  // ===============================
  // CONVERT ALL MARKS TO NUMBER
  // ===============================
  const subjectMarks = subjects.map(subject => {
    return Number(marks[subject]) || 0
  })

  // ===============================
  // TOTAL MARKS
  // ===============================
  const totalMarks = subjectMarks.reduce((acc, curr) => acc + curr, 0)

  // ===============================
  // PERCENTAGE
  // ===============================
  const percentage = Number(((totalMarks / config.maxMarks) * 100).toFixed(2))

  // ===============================
  // GRADE
  // ===============================
  let grade = ''

  if (percentage >= 80) {
    grade = 'A'
  } else if (percentage >= 60) {
    grade = 'B'
  } else if (percentage >= 45) {
    grade = 'C'
  } else {
    grade = 'D'
  }

  // ===============================
  // FAIL CHECK
  // ===============================
  const hasFailMarks = subjectMarks.some(mark => mark < 15)

  // ===============================
  // DIVISION
  // ===============================
  let division = ''

  if (hasFailMarks) {
    division = 'Fail'
  } else if (percentage >= 60) {
    division = 'First'
  } else if (percentage >= 45) {
    division = 'Second'
  } else {
    division = 'Third'
  }

  // ===============================
  // RETURN
  // ===============================
  return {
    totalMarks,
    percentage,
    grade,
    division
  }
}
