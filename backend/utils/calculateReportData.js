import { REPORT_CONFIGS } from '../constants/reportConfigs.js'

export const calculateReportData = (
  className,
  marks
) => {

  const normalizedClass =
    className
      .trim()
      .toUpperCase()

  const config =
    REPORT_CONFIGS[
      normalizedClass
    ]

  if (!config) {

    throw new Error(
      `No report config found for ${className}`
    )
  }

  // ===============================
  // SUBJECTS
  // ===============================
  const subjects =
    config.subjects

  // ===============================
  // TOTAL SUBJECT MARKS
  // ===============================
  let totalMarks = 0

  subjects.forEach(subject => {

    totalMarks +=
      Number(
        marks[subject]
      ) || 0
  })

  // ===============================
  // DEFAULT MAX MARKS
  // ===============================
  let maxMarks =
    config.maxMarks

  // ===============================
  // HANDLE ART
  // ===============================
  const artValue =
    marks.art

  const isArtNumeric =
    artValue !== undefined &&
    artValue !== null &&
    artValue !== '' &&
    !isNaN(Number(artValue))

  // if art is numeric
  if (isArtNumeric) {

    totalMarks +=
      Number(artValue)

    maxMarks += 50
  }

  // ===============================
  // PERCENTAGE
  // ===============================
  const percentage =
    maxMarks > 0
      ? (totalMarks / maxMarks) * 100
      : 0

  // ===============================
  // GRADE
  // ===============================
  let grade = ''

  if (percentage >= 80) {

    grade = 'A'

  } else if (
    percentage >= 60
  ) {

    grade = 'B'

  } else if (
    percentage >= 45
  ) {

    grade = 'C'

  } else {

    grade = 'D'
  }

  // ===============================
  // FAIL CHECK
  // ===============================
  const hasFailMarks =
    subjects.some(subject => {

      const value =
        Number(marks[subject])

      return value < 15
    })

  // art fail only if numeric
  const artFail =
    isArtNumeric &&
    Number(artValue) < 15

  // ===============================
  // DIVISION
  // ===============================
  let division = ''

  if (
    hasFailMarks ||
    artFail
  ) {

    division = 'Fail'

  } else if (
    percentage >= 60
  ) {

    division = 'First'

  } else if (
    percentage >= 45
  ) {

    division = 'Second'

  } else {

    division = 'Third'
  }

  return {

    totalMarks,

    percentage,

    grade,

    division
  }
}
