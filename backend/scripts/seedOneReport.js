import dotenv from 'dotenv'
import connectDB from '../config/db.js'
import Student from '../models/Student.js'
import Report from '../models/Report.js'

dotenv.config()

// Class I

const oneReports = [
  { rollNumber: 1, english: 46, math: 38, hindi: 45, gk: 46, socialStudies: 38, science: 38, art: "A", attendance: "60", remarks: "" },
  { rollNumber: 4, english: 41, math: 42, hindi: 42, gk: 43, socialStudies: 42, science: 28, art: "A+", attendance: "71", remarks: "" },
  { rollNumber: 5, english: 47, math: 44, hindi: 41, gk: 44, socialStudies: 43, science: 37, art: "A", attendance: "62", remarks: "" },
  { rollNumber: 7, english: 40, math: 43, hindi: 45, gk: 44, socialStudies: 31, science: 26, art: "B", attendance: "57", remarks: "" },
  { rollNumber: 8, english: 43, math: 46, hindi: 41, gk: 37, socialStudies: 20, science: 28, art: "A", attendance: "60", remarks: "" },
  { rollNumber: 9, english: 38, math: 45, hindi: 46, gk: 46, socialStudies: 30, science: 23, art: "A", attendance: "83", remarks: "" },
  { rollNumber: 10, english: 38, math: 48, hindi: 42, gk: 42, socialStudies: 28, science: 28, art: "B", attendance: "74", remarks: "" },

  { rollNumber: 11, english: 46, math: 49, hindi: 45, gk: 30, socialStudies: 36, science: 40, art: "B", attendance: "66", remarks: "" },
  { rollNumber: 12, english: 42, math: 47, hindi: 42, gk: 36, socialStudies: 40, science: 33, art: "B", attendance: "78", remarks: "" },
  { rollNumber: 13, english: 36, math: 40, hindi: 41, gk: 36, socialStudies: 43, science: 30, art: "B", attendance: "56", remarks: "" },
  { rollNumber: 14, english: 28, math: null, hindi: null, gk: 24, socialStudies: null, science: 28, art: "", attendance: "41", remarks: "" },
  { rollNumber: 15, english: 43, math: 45, hindi: 36, gk: 42, socialStudies: 33, science: 28, art: "B", attendance: "80", remarks: "" },
  { rollNumber: 16, english: 46, math: 39, hindi: 37, gk: 41, socialStudies: 34, science: 25, art: "B", attendance: "67", remarks: "" },
  { rollNumber: 17, english: 48, math: 41, hindi: 42, gk: 43, socialStudies: 39, science: 32, art: "A", attendance: "73", remarks: "" },

  { rollNumber: 19, english: 9, math: 34, hindi: 24, gk: 26, socialStudies: 6, science: 15, art: "B", attendance: "73", remarks: "" },
  { rollNumber: 20, english: 48, math: 46, hindi: 47, gk: 44, socialStudies: 36, science: 29, art: "A+", attendance: "65", remarks: "" },
  { rollNumber: 22, english: 36, math: 46, hindi: 46, gk: 38, socialStudies: 44, science: 29, art: "B", attendance: "59", remarks: "" },
  { rollNumber: 23, english: 19, math: 34, hindi: 23, gk: 44, socialStudies: 23, science: 18, art: "A", attendance: "36", remarks: "" },
  { rollNumber: 24, english: null, math: null, hindi: null, gk: null, socialStudies: null, science: null, art: "", attendance: "17", remarks: "" },
  { rollNumber: 25, english: 31, math: 45, hindi: null, gk: 37, socialStudies: null, science: 8, art: "", attendance: "48", remarks: "" },
  { rollNumber: 26, english: 38, math: 36, hindi: 45, gk: 31, socialStudies: 29, science: 19, art: "B", attendance: "64", remarks: "" },
  { rollNumber: 27, english: 30, math: 41, hindi: 19, gk: 30, socialStudies: 23, science: 7, art: "B", attendance: "55", remarks: "" },
  { rollNumber: 28, english: 18, math: 44, hindi: 36, gk: 40, socialStudies: 25, science: 18, art: "A", attendance: "76", remarks: "" },
  { rollNumber: 29, english: 21, math: 39, hindi: 28, gk: 38, socialStudies: 18, science: 7, art: "B", attendance: "49", remarks: "" },
  { rollNumber: 30, english: 22, math: 45, hindi: 41, gk: 44, socialStudies: 10, science: 23, art: "B", attendance: "65", remarks: "" },
  { rollNumber: 32, english: 18, math: 47, hindi: 29, gk: 38, socialStudies: 19, science: 17, art: "A", attendance: "40", remarks: "" },
  { rollNumber: 33, english: 44, math: 48, hindi: null, gk: 35, socialStudies: null, science: null, art: "", attendance: "46", remarks: "" },
  { rollNumber: 34, english: 41, math: 45, hindi: 47, gk: 44, socialStudies: 24, science: 29, art: "A", attendance: "70", remarks: "" },

  { rollNumber: 35, english: 15, math: 36, hindi: 38, gk: 32, socialStudies: 16, science: 22, art: "B", attendance: "59", remarks: "" },
  { rollNumber: 36, english: 21, math: 41, hindi: null, gk: 38, socialStudies: null, science: 5,  art: "", attendance: "24", remarks: "" },
  { rollNumber: 37, english: 30, math: 43, hindi: 42, gk: 41, socialStudies: 15, science: 25, art: "B", attendance: "64", remarks: "" },
  { rollNumber: 38, english: 9, math: 45, hindi: null, gk: 41, socialStudies: null, science: 6,  art: "", attendance: "24", remarks: "" },
  { rollNumber: 39, english: 35, math: 45, hindi: 48, gk: 42, socialStudies: 24, science: 27, art: "A", attendance: "81", remarks: "" },
  { rollNumber: 40, english: 34, math: 47, hindi: 18, gk: 40, socialStudies: 22, science: 5,  art: "A", attendance: "80", remarks: "" },
  { rollNumber: 41, english: 28, math: 40, hindi: 41, gk: 37, socialStudies: 19, science: 18, art: "B", attendance: "58", remarks: "" },
  { rollNumber: 42, english: 17, math: 37, hindi: 30, gk: 26, socialStudies: 9,  science: 24, art: "B", attendance: "42", remarks: "" },
  { rollNumber: 43, english: 45, math: 46, hindi: 37, gk: 43, socialStudies: 33, science: 42, art: "A", attendance: "74", remarks: "" },
  { rollNumber: 44, english: 27, math: 32, hindi: 25, gk: 40, socialStudies: 15, science: 15, art: "B", attendance: "76", remarks: "" },
  { rollNumber: 45, english: null, math: null, hindi: null, gk: null, socialStudies: null, science: null, art: "", attendance: "30", remarks: "" },
  { rollNumber: 46, english: 23, math: 34, hindi: 37, gk: 24, socialStudies: 15, science: 25, art: "A", attendance: "67", remarks: "" },
  { rollNumber: 47, english: 29, math: 35, hindi: 38, gk: 41, socialStudies: 15, science: 18, art: "A", attendance: "41", remarks: "" },
  { rollNumber: 48, english: 20, math: 31, hindi: 21, gk: 33, socialStudies: 15,  science: 20, art: "A", attendance: "52", remarks: "" },
  { rollNumber: 49, english: 12, math: 42, hindi: 30, gk: 15, socialStudies: 5,  science: 16, art: "B", attendance: "47", remarks: "" },
  { rollNumber: 50, english: null, math: null, hindi: null, gk: null, socialStudies: null, science: null, art: "B", attendance: "32", remarks: "" },

  // 👉 fill real marks for 51 & 52 from your sheet
  { rollNumber: 51, english: 18, math: 31, hindi: 19, gk: 39, socialStudies: 9, science: 18, art: "B", attendance: "84", remarks: "" },
  { rollNumber: 52, english: 18, math: 32, hindi: 31, gk: 38, socialStudies: 15, science: 15, art: "B", attendance: "50", remarks: "" }
]

// Class VI
// const sixReports = [
//       { rollNumber: 1, english: 9, math: 6, hindi: 16, gk: 45, socialStudies: 20, science: 19, art: "A", attendance: "53", remarks: "" },
//   { rollNumber: 2, english: 18, math: 8, hindi: 20, gk: 38, socialStudies: 17, science: 29, art: "A", attendance: "66", remarks: "" },
//   { rollNumber: 3, english: 32, math: 15, hindi: 21, gk: 48, socialStudies: 30, science: 30, art: "A", attendance: "76", remarks: "" },
// ]

// Class IV

// const fourReports = [
//   { "rollNumber": 1, "english": 48, "hindi": 46, "math": 42, "science": 45, "socialStudies": 45, "gk": 49, "art": "A", "attendance": 77 },
//   { "rollNumber": 2, "english": 47, "hindi": 39, "math": 28, "science": 43, "socialStudies": 45, "gk": 48, "art": "A+", "attendance": 55 },
//   { "rollNumber": 3, "english": 48, "hindi": 45, "math": 44, "science": 42, "socialStudies": 32, "gk": 49, "art": "A+", "attendance": 74 },
//   { "rollNumber": 4, "english": 43, "hindi": 29, "math": 23, "science": 29, "socialStudies": 23, "gk": 41, "art": "A+", "attendance": 71 },
//   { "rollNumber": 5, "english": 48, "hindi": 42, "math": 42, "science": 35, "socialStudies": 22, "gk": 48, "art": "A", "attendance": 68 },
//   { "rollNumber": 6, "english": 45, "hindi": 22, "math": 37, "science": 30, "socialStudies": 24, "gk": 43, "art": "B", "attendance": 57 },
//   { "rollNumber": 7, "english": 42, "hindi": 33, "math": 34, "science": 31, "socialStudies": 23, "gk": 40, "art": "A", "attendance": 70 },
//   { "rollNumber": 8, "english": 35, "hindi": 21, "math": 26, "science": 28, "socialStudies": 20, "gk": 46, "art": "A", "attendance": 57 },
//   { "rollNumber": 9, "english": 34, "hindi": 20, "math": 28, "science": 29, "socialStudies": 20, "gk": 44, "art": "A", "attendance": 61 },
//   { "rollNumber": 10, "english": 38, "hindi": 27, "math": 29, "science": 28, "socialStudies": 20, "gk": 40, "art": "A", "attendance": 55 },
//   { "rollNumber": 11, "english": 16, "hindi": 29, "math": 24, "science": 23, "socialStudies": 20, "gk": 40, "art": "A+", "attendance": 60 },
//   { "rollNumber": 12, "english": 41, "hindi": 25, "math": 28, "science": 28, "socialStudies": 20, "gk": 40, "art": "B+", "attendance": 78 },
//   { "rollNumber": 13, "english": 4, "hindi": 16, "math": 25, "science": 23, "socialStudies": 16, "gk": 40, "art": "A", "attendance": 65 },
//   { "rollNumber": 14, "english": 47, "hindi": 43, "math": 40, "science": 32, "socialStudies": 45, "gk": 47, "art": "A+", "attendance": 59 },
//   { "rollNumber": 18, "english": 33, "hindi": 20, "math": 32, "science": 22, "socialStudies": 28, "gk": 33, "art": "A+", "attendance": 54 },
//   { "rollNumber": 19, "english": 33, "hindi": 32, "math": 35, "science": 23, "socialStudies": 29, "gk": 38, "art": "A+", "attendance": 54 },
//   { "rollNumber": 20, "english": 32, "hindi": 22, "math": 28, "science": 19, "socialStudies": 20, "gk": 38, "art": "A", "attendance": 31 },
//   { "rollNumber": 21, "english": 46, "hindi": 21, "math": 35, "science": 23, "socialStudies": 29, "gk": 34, "art": "A", "attendance": 73 },
//   { "rollNumber": 22, "english": 36, "hindi": 21, "math": 27, "science": 32, "socialStudies": 20, "gk": 41, "art": "A+", "attendance": 73 },
//   { "rollNumber": 23, "english": 43, "hindi": 25, "math": 36, "science": 25, "socialStudies": 30, "gk": 48, "art": "A", "attendance": 59 },
//   { "rollNumber": 24, "english": 49, "hindi": 36, "math": 42, "science": 32, "socialStudies": 24, "gk": 49, "art": "A+", "attendance": 46 }
// ]


async function seedOneReports () {
  await connectDB()
  console.log('MongoDB Connected ✔')

  let updatedReports = []

  for (const r of oneReports) {
    // 1️⃣ Find student (adjust class value if needed)
    const student = await Student.findOne({
      class: 'I', 
      rollNumber: r.rollNumber
    })

    if (!student) {
      console.log(`⚠ Student not found → Roll No: ${r.rollNumber}`)
      continue
    }

    // 2️⃣ Ensure subjects exist (avoid undefined)
    r.gk = r.gk ?? 0
    r.science = r.science ?? 0
    r.socialStudies = r.socialStudies ?? 0

    // 3️⃣ Total marks (PRIMARY = 6 subjects)
    const totalMarks =
      (r.english || 0) +
      (r.math || 0) +
      (r.hindi || 0) +
      (r.gk || 0) +
      (r.science || 0) +
      (r.socialStudies || 0)

    // 4️⃣ Percentage (out of 300)
    const percentage = (totalMarks / 300) * 100

    // 5️⃣ Grade (optional but fine)
    let grade = ''
    if (percentage >= 80) grade = 'A'
    else if (percentage >= 60) grade = 'B'
    else if (percentage >= 45) grade = 'C'
    else grade = 'D'

    // ✅ 6️⃣ SUBJECT-WISE FAIL RULE (IMPORTANT)
    const subjects = [
      r.english,
      r.math,
      r.hindi,
      r.gk,
      r.science,
      r.socialStudies
    ]

    const hasFailMarks = subjects.some(
      mark => mark === null || mark < 15
    )

    // ✅ 7️⃣ FINAL DIVISION LOGIC (CORRECT)
    let division = ''

    if (hasFailMarks) {
      division = 'Fail'
    } else if (percentage >= 60) {
      division = 'First'
    } else if (percentage >= 45) {
      division = 'Second'
    } else {
      division = 'Third'   // ✅ 30% also PASS
    }

    // ✅ 8️⃣ UPDATE or INSERT (NO DUPLICATES)
    const saved = await Report.findOneAndUpdate(
      { studentId: student._id },
      {
        studentId: student._id,
        english: r.english,
        math: r.math,
        hindi: r.hindi,
        gk: r.gk,
        science: r.science,
        socialStudies: r.socialStudies,
        art: r.art,
        attendance: r.attendance,
        remarks: r.remarks,
        totalMarks,
        percentage,
        grade,
        division,
        classType: 'PRIMARY'
      },
      { upsert: true, new: true }
    )

    updatedReports.push(saved)
  }

  console.log(`🎉 Successfully UPDATED ${updatedReports.length} PRIMARY reports!`)
  process.exit()
}

seedOneReports()

async function assignPositions(className) {
  await connectDB()

  const reports = await Report.find({ classType: 'PRIMARY' }).populate('studentId')

  const classReports = reports.filter(
    r => r.studentId.class.toUpperCase() === className.toUpperCase()
  )

  classReports.sort((a, b) => {
    if (b.percentage !== a.percentage) return b.percentage - a.percentage
    return b.totalMarks - a.totalMarks
  })

  for (let i = 0; i < classReports.length; i++) {
    await Report.updateOne(
      { _id: classReports[i]._id },
      { position: i + 1 }
    )
  }

  console.log(`🎉 Positions assigned to class ${className.toUpperCase()}`)
  process.exit()
}

// assignPositions("i")