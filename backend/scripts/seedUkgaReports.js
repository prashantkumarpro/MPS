import dotenv from 'dotenv'
import connectDB from '../config/db.js'
import Student from '../models/Student.js'
import Report from '../models/Report.js'

dotenv.config()

// ========================================
// 1) UKGA Reports Data (ADD ALL HERE)
// ========================================
const ukgaReports = [
  {
    rollNumber: 1,
    english: 46,
    math: 50,
    hindi: 48,
    table: 42,
    rhymes: 39,
    gk: 45,
    art: 'B',
    attendance: '62',
    remarks: ''
  },
  {
    rollNumber: 2,
    english: 48,
    math: 50,
    hindi: 39,
    table: 42,
    rhymes: 40,
    gk: 48,
    art: 'B',
    attendance: '52',
    remarks: ''
  },
  {
    rollNumber: 3,
    english: 0,
    math: 40,
    hindi: 0,
    table: 34,
    rhymes: 25,
    gk: 33,
    art: 'A+',
    attendance: '44',
    remarks: ''
  },
  {
    rollNumber: 4,
    english: 50,
    math: 47,
    hindi: 40,
    table: 39,
    rhymes: 37,
    gk: 34,
    art: 'A+',
    attendance: '66',
    remarks: ''
  },
  {
    rollNumber: 5,
    english: 37,
    math: 48,
    hindi: 42,
    table: 37,
    rhymes: 45,
    gk: 21,
    art: 'A',
    attendance: '51',
    remarks: ''
  },
  {
    rollNumber: 6,
    english: 48,
    math: 46,
    hindi: 0,
    table: 37,
    rhymes: 45,
    gk: 42,
    art: 'A',
    attendance: '65',
    remarks: ''
  },
  {
    rollNumber: 7,
    english: 35,
    math: 40,
    hindi: 30,
    table: 48,
    rhymes: 35,
    gk: 27,
    art: 'A',
    attendance: '61',
    remarks: ''
  },
  {
    rollNumber: 8,
    english: 50,
    math: 50,
    hindi: 45,
    table: 48,
    rhymes: 45,
    gk: 45,
    art: 'B',
    attendance: '59',
    remarks: ''
  },
  {
    rollNumber: 9,
    english: 50,
    math: 50,
    hindi: 47,
    table: 49,
    rhymes: 45,
    gk: 42,
    art: 'B',
    attendance: '54',
    remarks: ''
  },

  {
    rollNumber: 12,
    english: 47,
    math: 33,
    hindi: 30,
    table: 0,
    rhymes: 42,
    gk: 22,
    art: 'A',
    attendance: '73',
    remarks: ''
  },
  {
    rollNumber: 13,
    english: 47,
    math: 45,
    hindi: 25,
    table: 47,
    rhymes: 28,
    gk: 23,
    art: 'A',
    attendance: '37',
    remarks: ''
  },
  {
    rollNumber: 14,
    english: 41,
    math: 40,
    hindi: 30,
    table: 42,
    rhymes: 40,
    gk: 22,
    art: 'A',
    attendance: '76',
    remarks: ''
  },
  {
    rollNumber: 15,
    english: 42,
    math: 38,
    hindi: 25,
    table: 38,
    rhymes: 40,
    gk: 32,
    art: 'B',
    attendance: '70',
    remarks: ''
  },
  {
    rollNumber: 16,
    english: 49,
    math: 43,
    hindi: 40,
    table: 31,
    rhymes: 19,
    gk: 46,
    art: 'A',
    attendance: '69',
    remarks: ''
  },
  {
    rollNumber: 18,
    english: 37,
    math: 50,
    hindi: 40,
    table: 40,
    rhymes: 40,
    gk: 43,
    art: 'B',
    attendance: '66',
    remarks: ''
  },
  {
    rollNumber: 19,
    english: 27,
    math: 34,
    hindi: 20,
    table: 30,
    rhymes: 40,
    gk: 8,
    art: 'A',
    attendance: '42',
    remarks: ''
  },
  {
    rollNumber: 20,
    english: 29,
    math: 24,
    hindi: 20,
    table: 36,
    rhymes: 32,
    gk: 16,
    art: 'B',
    attendance: '68',
    remarks: ''
  },
  {
    rollNumber: 22,
    english: 47,
    math: 40,
    hindi: 38,
    table: 40,
    rhymes: 39,
    gk: 29,
    art: 'A',
    attendance: '53',
    remarks: ''
  },

  {
    rollNumber: 23,
    english: 43,
    math: 47,
    hindi: 50,
    table: 48,
    rhymes: 42,
    gk: 36,
    art: 'A',
    attendance: '73',
    remarks: ''
  },
  {
    rollNumber: 26,
    english: 48,
    math: 46,
    hindi: 40,
    table: 0,
    rhymes: 39,
    gk: 34,
    art: 'B',
    attendance: '58',
    remarks: ''
  },
  {
    rollNumber: 27,
    english: 48,
    math: 15,
    hindi: 30,
    table: 0,
    rhymes: 0,
    gk: 20,
    art: 'A+',
    attendance: '63',
    remarks: ''
  },
  {
    rollNumber: 28,
    english: 50,
    math: 38,
    hindi: 30,
    table: 46,
    rhymes: 0,
    gk: 33,
    art: 'A+',
    attendance: '36',
    remarks: ''
  },
  {
    rollNumber: 29,
    english: 46,
    math: 49,
    hindi: 0,
    table: 47,
    rhymes: 45,
    gk: 24,
    art: 'A+',
    attendance: '60',
    remarks: ''
  },
  {
    rollNumber: 30,
    english: 46,
    math: 49,
    hindi: 29,
    table: 45,
    rhymes: 45,
    gk: 16,
    art: 'B',
    attendance: '68',
    remarks: ''
  },
  {
    rollNumber: 31,
    english: 50,
    math: 43,
    hindi: 29,
    table: 41,
    rhymes: 0,
    gk: 43,
    art: 'A',
    attendance: '60',
    remarks: ''
  },
  {
    rollNumber: 32,
    english: 36,
    math: 38,
    hindi: 35,
    table: 43,
    rhymes: 40,
    gk: 15,
    art: 'A',
    attendance: '58',
    remarks: ''
  },

  {
    rollNumber: 36,
    english: 35,
    math: 44,
    hindi: 35,
    table: 46,
    rhymes: 35,
    gk: 24,
    art: 'A',
    attendance: '54',
    remarks: ''
  },
  {
    rollNumber: 37,
    english: 37,
    math: 45,
    hindi: 0,
    table: 40,
    rhymes: 45,
    gk: 32,
    art: 'A',
    attendance: '68',
    remarks: ''
  }
]

// ========================================
// 2) BULK INSERT SCRIPT
// ========================================
async function seedUkgaReports () {
  await connectDB()
  console.log('MongoDB Connected ✔')

  let insertedReports = []

  for (const r of ukgaReports) {
    // 1️⃣ Find student using class + roll number
    const student = await Student.findOne({
      class: 'UKGA',
      rollNumber: r.rollNumber
    })

    if (!student) {
      console.log(`⚠ Student not found → Roll No: ${r.rollNumber}`)
      continue // Skip this entry
    }

    // 2️⃣ Calculate total marks for KG (6 subjects)
    const totalMarks =
      (r.english || 0) +
      (r.math || 0) +
      (r.hindi || 0) +
      (r.table || 0) +
      (r.rhymes || 0) +
      (r.gk || 0)

    const percentage = (totalMarks / 300) * 100

    // 3️⃣ Grade calculation
    let grade = ''
    if (percentage >= 80) grade = 'A'
    else if (percentage >= 60) grade = 'B'
    else if (percentage >= 45) grade = 'C'
    else grade = 'D'

    // 4️⃣ Division calculation
    let division = ''
    if (percentage >= 60) division = 'First'
    else if (percentage >= 45) division = 'Second'
    else if (percentage >= 33) division = 'Third'
    else division = 'Fail'

    // 5️⃣ NEW RULE → If any subject is less than 15 → FAIL
    const subjects = [r.english, r.math, r.hindi, r.table, r.rhymes, r.gk]

    const hasFailMarks = subjects.some(mark => (mark || 0) < 15)

    if (hasFailMarks) {
      division = 'Fail'
    }

    // 5️⃣ Create and save report
    const newReport = new Report({
      studentId: student._id,
      english: r.english,
      math: r.math,
      hindi: r.hindi,
      table: r.table,
      rhymes: r.rhymes,
      gk: r.gk,
      art: r.art,
      attendance: r.attendance,
      remarks: r.remarks,
      totalMarks,
      percentage,
      grade,
      division,
      classType: 'KG' // ⭐ important
    })

    const saved = await newReport.save()
    insertedReports.push(saved)
  }

  console.log(
    `🎉 Successfully inserted ${insertedReports.length} UKGA reports!`
  )
  process.exit()
}

seedUkgaReports()
