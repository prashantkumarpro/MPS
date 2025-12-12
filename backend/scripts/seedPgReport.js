import dotenv from 'dotenv'
import connectDB from '../config/db.js'
import Student from '../models/Student.js'
import Report from '../models/Report.js'

dotenv.config()


const pgReport = [
  { rollNumber: 1,  english: 38, math: 31, hindi: 28, table: 47, rhymes: 42, art: 40, attendance: 50 },
  { rollNumber: 2,  english: 42, math: 38, hindi: 38, table: 49, rhymes: 32, art: 45, attendance: 79 },
  { rollNumber: 3,  english: 32, math: 34, hindi: 35, table: 49, rhymes: 40, art: 40, attendance: 72 },
  { rollNumber: 4,  english: 41, math: 36, hindi: 32, table: 50, rhymes: 45, art: 35, attendance: 80 },
  { rollNumber: 6,  english: 16, math: 40, hindi: 35, table: 50, rhymes: 43, art: 35, attendance: 72 },
  { rollNumber: 7,  english: 0,  math: 20, hindi: 28, table: 20, rhymes: 40, art: 45, attendance: 71 },
  { rollNumber: 9,  english: 16, math: 40, hindi: 35, table: 50, rhymes: 35, art: 45, attendance: 71 },
  { rollNumber: 11, english: 16, math: 24, hindi: 25, table: 49, rhymes: 45, art: 40, attendance: 68 },
  { rollNumber: 12, english: 16, math: 27, hindi: 15, table: 50, rhymes: 40, art: 40, attendance: 75 },
  { rollNumber: 13, english: 32, math: 38, hindi: 22, table: 50, rhymes: 43, art: 40, attendance: 76 },
  { rollNumber: 17, english: 17, math: 37, hindi: 22, table: 50, rhymes: 35, art: 40, attendance: 65 },
  { rollNumber: 19, english: 33, math: 45, hindi: 42, table: 49, rhymes: 36, art: 40, attendance: 81 },
  { rollNumber: 20, english: 47, math: 47, hindi: 39, table: 50, rhymes: 40, art: 40, attendance: 74 },
  { rollNumber: 21, english: 42, math: 50, hindi: 37, table: 50, rhymes: 40, art: 45, attendance: 81 },
  { rollNumber: 22, english: 32, math: 46, hindi: 35, table: 50, rhymes: 35, art: 40, attendance: 81 },
  { rollNumber: 27, english: 15, math: 33, hindi: 20, table: 49, rhymes: 30, art: 45, attendance: 66 },
  { rollNumber: 29, english: 28, math: 43, hindi: 32, table: 49, rhymes: 47, art: 30, attendance: 56 },
  { rollNumber: 30, english: 19, math: 49, hindi: 35, table: 50, rhymes: 38, art: 45, attendance: 86 },
  { rollNumber: 31, english: 50, math: 50, hindi: 36, table: 50, rhymes: 30, art: 45, attendance: 70 },
  { rollNumber: 32, english: 16, math: 20, hindi: 10, table: 25, rhymes: 30, art: 40, attendance: 69 },

  // second image (34–60)
  { rollNumber: 34, english: 37, math: 26, hindi: 32, table: 49, rhymes: 38, art: 35, attendance: 48 },
  { rollNumber: 37, english: 49, math: 41, hindi: 36, table: 50, rhymes: 35, art: 50, attendance: 70 },
  { rollNumber: 38, english: 17, math: 43, hindi: 33, table: 50, rhymes: 40, art: 35, attendance: 81 },
  { rollNumber: 39, english: 22, math: 48, hindi: 25, table: 50, rhymes: 46, art: 40, attendance: 73 },
  { rollNumber: 41, english: 19, math: 20, hindi: 35, table: 47, rhymes: 38, art: 40, attendance: 72 },
  { rollNumber: 43, english: 26, math: 35, hindi: 30, table: 50, rhymes: 40, art: 50, attendance: 56 },
  { rollNumber: 45, english: 0,  math: 20, hindi: 15, table: 25, rhymes: 15, art: 40, attendance: 53 },
  { rollNumber: 46, english: 17, math: 43, hindi: 37, table: 50, rhymes: 35, art: 50, attendance: 58 },
  { rollNumber: 47, english: 15, math: 45, hindi: 30, table: 30, rhymes: 36, art: 30, attendance: 52 },
  { rollNumber: 48, english: 0,  math: 15, hindi: 16, table: 20, rhymes: 40, art: 35, attendance: 55 },
  { rollNumber: 49, english: 16, math: 20, hindi: 25, table: 36, rhymes: 35, art: 45, attendance: 47 },
  { rollNumber: 50, english: 28, math: 49, hindi: 35, table: 50, rhymes: 40, art: 45, attendance: 45 },
  { rollNumber: 52, english: 36, math: 47, hindi: 35, table: 50, rhymes: 15, art: 45, attendance: 41 },
  { rollNumber: 56, english: 26, math: 46, hindi: 15, table: 30, rhymes: 15, art: 40, attendance: 33 },
  { rollNumber: 57, english: 0,  math: 20, hindi: 17, table: 15, rhymes: 15, art: 35, attendance: 34 },
  { rollNumber: 59, english: 0,  math: 26, hindi: 15, table: 43, rhymes: 30, art: 25, attendance: 21 },
  { rollNumber: 60, english: 15, math: 38, hindi: 32, table: 50, rhymes: 25, art: 40, attendance: 19 }
];


async function seedPgReports () {
  await connectDB()
  console.log('MongoDB Connected ✔')

  let updatedReports = []

  for (const r of pgReport) {
    // 1️⃣ Find student
    const student = await Student.findOne({
      class: 'PG',
      rollNumber: r.rollNumber
    })

    if (!student) {
      console.log(`⚠ Student not found → Roll No: ${r.rollNumber}`)
      continue
    }

    // 2️⃣ GK always null for Nursery
    r.gk = null

    // 3️⃣ Total marks (PG = 6 subjects)
    const totalMarks =
      (r.english || 0) +
      (r.math || 0) +
      (r.hindi || 0) +
      (r.table || 0) +
      (r.rhymes || 0)+
      (Number(r.art) || 0);   // PG art = numeric marks

    // 4️⃣ Percentage (out of 250)
    const percentage = (totalMarks / 300) * 100

    // 5️⃣ Grade
    let grade = ''
    if (percentage >= 80) grade = 'A'
    else if (percentage >= 60) grade = 'B'
    else if (percentage >= 45) grade = 'C'
    else grade = 'D'

    // ✅ 6️⃣ Subject-wise FAIL rule
    const subjects = [
      r.english,
      r.math,
      r.hindi,
      r.table,
      r.rhymes,
      Number(r.art)    // important
    ]

    const hasFailMarks = subjects.some(
      mark => mark === null || mark < 15
    )

    // ✅ 7️⃣ Division (correct logic)
    let division = ''

    if (hasFailMarks) {
      division = 'Fail'
    } else if (percentage >= 60) {
      division = 'First'
    } else if (percentage >= 45) {
      division = 'Second'
    } else {
      division = 'Third'   // ✅ 30% is PASS
    }

    // ✅ 8️⃣ UPDATE or INSERT report (NO DUPLICATES)
    const saved = await Report.findOneAndUpdate(
      { studentId: student._id },
      {
        studentId: student._id,
        english: r.english,
        math: r.math,
        hindi: r.hindi,
        table: r.table,
        rhymes: r.rhymes,
        gk: null,
        art: r.art,
        attendance: r.attendance,
        remarks: r.remarks,
        totalMarks,
        percentage,
        grade,
        division,
        classType: 'KG'
      },
      { upsert: true, new: true }
    )

    updatedReports.push(saved)
  }

  console.log(`🎉 Successfully UPDATED ${updatedReports.length} PG reports!`)
  process.exit()
}

seedPgReports()

async function assignPositions(className) {
  await connectDB()

  const reports = await Report.find({ classType: 'KG' }).populate('studentId')

  const classReports = reports.filter(
    r => r.studentId.class.trim().toUpperCase() === className.trim().toUpperCase()
  )

  // Sort by percentage, then totalMarks
  classReports.sort((a, b) => {
    if (b.percentage !== a.percentage) return b.percentage - a.percentage
    return b.totalMarks - a.totalMarks
  })

  let lastOM = null
  let lastPercentage = null
  let lastPosition = 0

  for (let i = 0; i < classReports.length; i++) {
    const r = classReports[i]

    // Check if tied with previous student
    const isTie =
      r.totalMarks === lastOM &&
      r.percentage === lastPercentage

    const position = isTie ? lastPosition : i + 1

    await Report.updateOne(
      { _id: r._id },
      { position }
    )

    // update trackers
    lastOM = r.totalMarks
    lastPercentage = r.percentage
    lastPosition = position
  }

  console.log(`🎉 Positions assigned to class ${className}`)
  process.exit()
}

assignPositions("pg")
