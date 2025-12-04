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
    english: 45,
    math: 42,
    hindi: 44,
    table: 35,
    rhymes: 40,
    gk: 46,
    art: 'A',
    attendance: '85',
    remarks: 'Very active child'
  },
  {
    rollNumber: 2,
    english: 40,
    math: 38,
    hindi: 42,
    table: 30,
    rhymes: 38,
    gk: 41,
    art: 'B',
    attendance: '82',
    remarks: 'Good performance'
  },
  {
    rollNumber: 3,
    english: 48,
    math: 45,
    hindi: 47,
    table: 37,
    rhymes: 43,
    gk: 49,
    art: 'A',
    attendance: '90',
    remarks: 'Excellent child'
  },
  {
    rollNumber: 4,
    english: 38,
    math: 35,
    hindi: 40,
    table: 32,
    rhymes: 36,
    gk: 39,
    art: 'B',
    attendance: '78',
    remarks: 'Needs improvement'
  },
  {
    rollNumber: 5,
    english: 44,
    math: 40,
    hindi: 45,
    table: 34,
    rhymes: 41,
    gk: 43,
    art: 'A',
    attendance: '88',
    remarks: 'Good child'
  },
  {
    rollNumber: 6,
    english: 42,
    math: 38,
    hindi: 44,
    table: 31,
    rhymes: 39,
    gk: 42,
    art: 'B',
    attendance: '80',
    remarks: 'Disciplined and polite'
  },
  {
    rollNumber: 7,
    english: 47,
    math: 45,
    hindi: 46,
    table: 36,
    rhymes: 44,
    gk: 48,
    art: 'A',
    attendance: '92',
    remarks: 'Brilliant performance'
  },
  {
    rollNumber: 8,
    english: 41,
    math: 39,
    hindi: 43,
    table: 33,
    rhymes: 40,
    gk: 44,
    art: 'B',
    attendance: '83',
    remarks: 'Shows improvement'
  },
  {
    rollNumber: 9,
    english: 39,
    math: 37,
    hindi: 40,
    table: 30,
    rhymes: 35,
    gk: 38,
    art: 'B',
    attendance: '75',
    remarks: 'Needs guidance'
  },
  {
    rollNumber: 12,
    english: 46,
    math: 44,
    hindi: 45,
    table: 36,
    rhymes: 43,
    gk: 47,
    art: 'A',
    attendance: '91',
    remarks: 'Very creative'
  },
  {
    rollNumber: 13,
    english: 43,
    math: 40,
    hindi: 42,
    table: 34,
    rhymes: 39,
    gk: 41,
    art: 'B',
    attendance: '84',
    remarks: 'Obedient child'
  },
  {
    rollNumber: 14,
    english: 45,
    math: 41,
    hindi: 43,
    table: 35,
    rhymes: 42,
    gk: 45,
    art: 'A',
    attendance: '87',
    remarks: 'Active learner'
  },
  {
    rollNumber: 15,
    english: 36,
    math: 34,
    hindi: 37,
    table: 29,
    rhymes: 32,
    gk: 35,
    art: 'C',
    attendance: '70',
    remarks: 'Needs attention'
  },
  {
    rollNumber: 16,
    english: 48,
    math: 46,
    hindi: 47,
    table: 38,
    rhymes: 45,
    gk: 49,
    art: 'A',
    attendance: '94',
    remarks: 'Top performer'
  },
  {
    rollNumber: 18,
    english: 44,
    math: 42,
    hindi: 45,
    table: 34,
    rhymes: 40,
    gk: 46,
    art: 'A',
    attendance: '89',
    remarks: 'Hardworking child'
  },
  {
    rollNumber: 19,
    english: 40,
    math: 37,
    hindi: 41,
    table: 32,
    rhymes: 38,
    gk: 40,
    art: 'B',
    attendance: '81',
    remarks: 'Good behaviour'
  },
  {
    rollNumber: 20,
    english: 47,
    math: 44,
    hindi: 46,
    table: 37,
    rhymes: 43,
    gk: 48,
    art: 'A',
    attendance: '93',
    remarks: 'Excellent'
  },
  {
    rollNumber: 22,
    english: 39,
    math: 36,
    hindi: 40,
    table: 31,
    rhymes: 34,
    gk: 38,
    art: 'B',
    attendance: '79',
    remarks: 'Can improve'
  },
  {
    rollNumber: 23,
    english: 42,
    math: 40,
    hindi: 43,
    table: 33,
    rhymes: 39,
    gk: 42,
    art: 'B',
    attendance: '85',
    remarks: 'Disciplined'
  },
  {
    rollNumber: 26,
    english: 38,
    math: 35,
    hindi: 39,
    table: 28,
    rhymes: 33,
    gk: 36,
    art: 'C',
    attendance: '74',
    remarks: 'Slow learner'
  },
  {
    rollNumber: 27,
    english: 46,
    math: 43,
    hindi: 45,
    table: 36,
    rhymes: 42,
    gk: 47,
    art: 'A',
    attendance: '90',
    remarks: 'Very active'
  },
  {
    rollNumber: 28,
    english: 41,
    math: 39,
    hindi: 42,
    table: 32,
    rhymes: 37,
    gk: 41,
    art: 'B',
    attendance: '82',
    remarks: 'Obedient child'
  },
  {
    rollNumber: 29,
    english: 43,
    math: 41,
    hindi: 44,
    table: 34,
    rhymes: 40,
    gk: 44,
    art: 'A',
    attendance: '86',
    remarks: 'Consistent'
  },
  {
    rollNumber: 30,
    english: 40,
    math: 38,
    hindi: 41,
    table: 31,
    rhymes: 36,
    gk: 39,
    art: 'B',
    attendance: '80',
    remarks: 'Good child'
  },
  {
    rollNumber: 31,
    english: 44,
    math: 42,
    hindi: 45,
    table: 35,
    rhymes: 41,
    gk: 46,
    art: 'A',
    attendance: '87',
    remarks: 'Confident child'
  },
  {
    rollNumber: 32,
    english: 37,
    math: 35,
    hindi: 38,
    table: 30,
    rhymes: 33,
    gk: 36,
    art: 'C',
    attendance: '72',
    remarks: 'Needs support'
  },
  {
    rollNumber: 36,
    english: 45,
    math: 43,
    hindi: 44,
    table: 36,
    rhymes: 42,
    gk: 47,
    art: 'A',
    attendance: '89',
    remarks: 'Very intelligent'
  },
  {
    rollNumber: 37,
    english: 38,
    math: 36,
    hindi: 39,
    table: 30,
    rhymes: 35,
    gk: 38,
    art: 'B',
    attendance: '78',
    remarks: 'Can do better'
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
