import dotenv from 'dotenv'
import connectDB from '../config/db.js'
import Student from '../models/Student.js'
import Report from '../models/Report.js'

dotenv.config()

// ========================================
// 1) UKGA Reports Data (ADD ALL HERE)
// ========================================
// const ukgaReports = [
//   {
//     rollNumber: 1,
//     english: 46,
//     math: 50,
//     hindi: 48,
//     table: 46,
//     rhymes: 39,
//     gk: 45,
//     art: 'B',
//     attendance: '62',
//     remarks: ''
//   },
//   {
//     rollNumber: 2,
//     english: 48,
//     math: 50,
//     hindi: 39,
//     table: 40,
//     rhymes: 40,
//     gk: 48,
//     art: 'B',
//     attendance: '52',
//     remarks: ''
//   },
//   {
//     rollNumber: 3,
//     english: 49,
//     math: 40,
//     hindi: 38,
//     table: 44,
//     rhymes: 25,
//     gk: 33,
//     art: 'A+',
//     attendance: '44',
//     remarks: ''
//   },
//   {
//     rollNumber: 4,
//     english: 50,
//     math: 47,
//     hindi: 40,
//     table: 43,
//     rhymes: 37,
//     gk: 34,
//     art: 'A+',
//     attendance: '66',
//     remarks: ''
//   },
//   {
//     rollNumber: 5,
//     english: 37,
//     math: 48,
//     hindi: 42,
//     table: 40,
//     rhymes: 45,
//     gk: 21,
//     art: 'A',
//     attendance: '51',
//     remarks: ''
//   },
//   {
//     rollNumber: 6,
//     english: 48,
//     math: 46,
//     hindi: 45,
//     table: 37,
//     rhymes: 45,
//     gk: 42,
//     art: 'A',
//     attendance: '65',
//     remarks: ''
//   },
//   {
//     rollNumber: 7,
//     english: 35,
//     math: 40,
//     hindi: 30,
//     table: 48,
//     rhymes: 35,
//     gk: 27,
//     art: 'A',
//     attendance: '61',
//     remarks: ''
//   },
//   {
//     rollNumber: 8,
//     english: 50,
//     math: 50,
//     hindi: 45,
//     table: 48,
//     rhymes: 45,
//     gk: 45,
//     art: 'B',
//     attendance: '59',
//     remarks: ''
//   },
//   {
//     rollNumber: 9,
//     english: 50,
//     math: 50,
//     hindi: 47,
//     table: 49,
//     rhymes: 45,
//     gk: 44,
//     art: 'B',
//     attendance: '54',
//     remarks: ''
//   },

//   {
//     rollNumber: 12,
//     english: 47,
//     math: 33,
//     hindi: 30,
//     table: 38,
//     rhymes: 42,
//     gk: 22,
//     art: 'A',
//     attendance: '73',
//     remarks: ''
//   },
//   {
//     rollNumber: 13,
//     english: 47,
//     math: 45,
//     hindi: 25,
//     table: 47,
//     rhymes: 28,
//     gk: 23,
//     art: 'A',
//     attendance: '37',
//     remarks: ''
//   },
//   {
//     rollNumber: 14,
//     english: 41,
//     math: 40,
//     hindi: 30,
//     table: 42,
//     rhymes: 40,
//     gk: 22,
//     art: 'A',
//     attendance: '76',
//     remarks: ''
//   },
//   {
//     rollNumber: 15,
//     english: 42,
//     math: 38,
//     hindi: 25,
//     table: 38,
//     rhymes: 40,
//     gk: 32,
//     art: 'B',
//     attendance: '70',
//     remarks: ''
//   },
//   {
//     rollNumber: 16,
//     english: 49,
//     math: 43,
//     hindi: 40,
//     table: 31,
//     rhymes: 19,
//     gk: 46,
//     art: 'A',
//     attendance: '69',
//     remarks: ''
//   },
//   {
//     rollNumber: 18,
//     english: 37,
//     math: 50,
//     hindi: 40,
//     table: 40,
//     rhymes: 40,
//     gk: 43,
//     art: 'B',
//     attendance: '66',
//     remarks: ''
//   },
//   {
//     rollNumber: 19,
//     english: 27,
//     math: 34,
//     hindi: 20,
//     table: 30,
//     rhymes: 40,
//     gk: 8,
//     art: 'A',
//     attendance: '42',
//     remarks: ''
//   },
//   {
//     rollNumber: 20,
//     english: 29,
//     math: 24,
//     hindi: 20,
//     table: 36,
//     rhymes: 32,
//     gk: 16,
//     art: 'B',
//     attendance: '68',
//     remarks: ''
//   },
//   {
//     rollNumber: 22,
//     english: 47,
//     math: 40,
//     hindi: 38,
//     table: 40,
//     rhymes: 39,
//     gk: 29,
//     art: 'A',
//     attendance: '53',
//     remarks: ''
//   },

//   {
//     rollNumber: 23,
//     english: 43,
//     math: 47,
//     hindi: 50,
//     table: 48,
//     rhymes: 42,
//     gk: 36,
//     art: 'A',
//     attendance: '73',
//     remarks: ''
//   },
//   {
//     rollNumber: 26,
//     english: 48,
//     math: 46,
//     hindi: 40,
//     table: 42,
//     rhymes: 39,
//     gk: 34,
//     art: 'B',
//     attendance: '58',
//     remarks: ''
//   },
//   {
//     rollNumber: 27,
//     english: 48,
//     math: 15,
//     hindi: 30,
//     table: 35,
//     rhymes: 38,
//     gk: 20,
//     art: 'A+',
//     attendance: '63',
//     remarks: ''
//   },
//   {
//     rollNumber: 28,
//     english: 50,
//     math: 38,
//     hindi: 30,
//     table: 46,
//     rhymes: 40,
//     gk: 33,
//     art: 'A+',
//     attendance: '36',
//     remarks: ''
//   },
//   {
//     rollNumber: 29,
//     english: 46,
//     math: 49,
//     hindi: 40,
//     table: 47,
//     rhymes: 45,
//     gk: 24,
//     art: 'A+',
//     attendance: '60',
//     remarks: ''
//   },
//   {
//     rollNumber: 30,
//     english: 46,
//     math: 49,
//     hindi: 29,
//     table: 45,
//     rhymes: 45,
//     gk: 16,
//     art: 'B',
//     attendance: '68',
//     remarks: ''
//   },
//   {
//     rollNumber: 31,
//     english: 50,
//     math: 43,
//     hindi: 29,
//     table: 41,
//     rhymes: 45,
//     gk: 43,
//     art: 'A',
//     attendance: '60',
//     remarks: ''
//   },
//   {
//     rollNumber: 32,
//     english: 36,
//     math: 38,
//     hindi: 35,
//     table: 43,
//     rhymes: 40,
//     gk: 15,
//     art: 'A',
//     attendance: '58',
//     remarks: ''
//   },

//   {
//     rollNumber: 36,
//     english: 35,
//     math: 44,
//     hindi: 35,
//     table: 46,
//     rhymes: 35,
//     gk: 24,
//     art: 'A',
//     attendance: '54',
//     remarks: ''
//   },
//   {
//     rollNumber: 37,
//     english: 37,
//     math: 45,
//     hindi: 38,
//     table: 40,
//     rhymes: 45,
//     gk: 32,
//     art: 'A',
//     attendance: '68',
//     remarks: ''
//   }
// ]

const ukgbReports = [
  { "rollNumber": 1, "english": 50, "hindi": 48, "math": 50, "table": 46, "rhymes": 24, "gk": 48, "art": "A",  "attendance": "59"},
  { "rollNumber": 2, "english": 50, "hindi": 48, "math": 50, "table": 50, "rhymes": 32, "gk": 49, "art": "A+", "attendance": "64" },
  { "rollNumber": 3, "english": 48, "hindi": 49, "math": 50, "table": 50, "rhymes": 42, "gk": 47, "art": "A",  "attendance": "79"},
  { "rollNumber": 4, "english": 48, "hindi": 49, "math": 38, "table": 45, "rhymes": 41, "gk": 28, "art": "A",  "attendance": "55"},
  { "rollNumber": 6, "english": 47, "hindi": 38, "math": 47, "table": 42, "rhymes": 24, "gk": 25, "art": "A",  "attendance": "70"},


  { "rollNumber": 7, "english": 50, "hindi": 43, "math": 49, "table": 48, "rhymes": 8, "gk": 40, "art": "A+", "attendance": "75" },
  { "rollNumber": 8, "english": 41, "hindi": 35, "math": 40, "table": 43, "rhymes": 20, "gk": 30, "art": "A+", "attendance": "50" },
  { "rollNumber": 9, "english": 45, "hindi": 48, "math": 48, "table": 48, "rhymes": 46, "gk": 39, "art": "A",  "attendance": "69"},
  { "rollNumber": 10, "english": 43, "hindi": 30, "math": 42, "table": 42, "rhymes": 16, "gk": 20, "art": "A",  "attendance": "65"},
  { "rollNumber": 11, "english": 47, "hindi": 46, "math": 45, "table": 40, "rhymes": 26, "gk": 35, "art": "A",  "attendance": "68"},
  { "rollNumber": 12, "english": 25, "hindi": 30, "math": 46, "table": 40, "rhymes": 20, "gk": 27, "art": "A",  "attendance": "72"},
// done

  { "rollNumber": 13, "english": 44, "hindi": 40, "math": 42, "table": 40, "rhymes": 15, "gk": 15, "art": "A+", "attendance": "77" },
  { "rollNumber": 14, "english": 35, "hindi": 45, "math": 37, "table": 47, "rhymes": 38, "gk": 29, "art": "B+", "attendance": "68" },
  { "rollNumber": 15, "english": 38, "hindi": 45, "math": 38, "table": 48, "rhymes": 39, "gk": 33, "art": "A",  "attendance": "61"},
  { "rollNumber": 16, "english": 36, "hindi": 40, "math": 32, "table": 49, "rhymes": 13, "gk": 15, "art": "B+", "attendance": "54" },

  { "rollNumber": 17, "english": 0, "hindi": 0, "math": 0, "table": 40, "rhymes": 0, "gk": 0, "art": "0",  "attendance": "68"},

  { "rollNumber": 18, "english": 41, "hindi": 36, "math": 26, "table": 44, "rhymes": 12, "gk": 21, "art": "B+", "attendance": "56" },

  { "rollNumber": 19, "english": 0, "hindi": 0, "math": 0, "table": 0, "rhymes": 0, "gk": 0, "art": "0",  "attendance": "N/A"},
  { "rollNumber": 20, "english": 0, "hindi": 0, "math": 39, "table": 44, "rhymes": 42, "gk": 47, "art": "A",  "attendance": "N/A"},

  { "rollNumber": 21, "english": 48, "hindi": 47, "math": 39, "table": 44, "rhymes": 42, "gk": 43, "art": "A",  "attendance": "69"},
  { "rollNumber": 22, "english": 46, "hindi": 50, "math": 40, "table": 49, "rhymes": 39, "gk": 35, "art": "A",  "attendance": "70"},
  { "rollNumber": 23, "english": 48, "hindi": 45, "math": 37, "table": 48, "rhymes": 40, "gk": 42, "art": "A",  "attendance": "77"},
  { "rollNumber": 24, "english": 46, "hindi": 47, "math": 40, "table": 40, "rhymes": 35, "gk": 35, "art": "A",  "attendance": "62"},
  { "rollNumber": 25, "english": 49, "hindi": 43, "math": 40, "table": 44, "rhymes": 30, "gk": 36, "art": "A",  "attendance": "79"},
  { "rollNumber": 26, "english": 43, "hindi": 0, "math": 20, "table": 45, "rhymes": 14, "gk": 15, "art": "B+", "attendance": "68" },

  { "rollNumber": 27, "english": 0, "hindi": 0, "math": 0, "table": 0, "rhymes": 27, "gk": 0, "art": "B+", "attendance": "N/A" },

  { "rollNumber": 28, "english": 47, "hindi": 40, "math": 43, "table": 47, "rhymes": 31, "gk": 36, "art": "B+", "attendance": "46" },
  
  // done
  { "rollNumber": 29, "english": 47, "hindi": 42, "math": 40, "table": 48, "rhymes": 29, "gk": 33, "art": "A+", "attendance": 70 },
  { "rollNumber": 30, "english": 31, "hindi": 40, "math": 39, "table": 46, "rhymes": 35, "gk": 29, "art": "B+", "attendance": 48 },
  { "rollNumber": 31, "english": 35, "hindi": 30, "math": 46, "table": 42, "rhymes": 37, "gk": 20, "art": "B+", "attendance": 50 },
  { "rollNumber": 32, "english": 0, "hindi": 0, "math": 0, "table": 0, "rhymes": 0, "gk": 0, "art": "", "attendance": 0, },
  { "rollNumber": 33, "english": 43, "hindi": 40, "math": 38, "table": 48, "rhymes": 28, "gk": 30, "art": "B+", "attendance": 56 },
  { "rollNumber": 34, "english": 40, "hindi": 39, "math": 38, "table": 40, "rhymes": 26, "gk": 33, "art": "B+", "attendance": 34 }
]

// const lkgReports = [
//   { rollNumber: 1, english: 39, math: 50, hindi: 48, table: 48, rhymes: 48, gk: 47, art: 'A+', attendance: '65', remarks: '' },
//   { rollNumber: 3, english: 32, math: 45, hindi: 35, table: 46, rhymes: 49, gk: 44, art: 'B', attendance: '66', remarks: '' },
//   { rollNumber: 4, english: 38, math: 49, hindi: 48, table: 50, rhymes: 47, gk: 49, art: 'A+', attendance: '80', remarks: '' },
//   { rollNumber: 6, english: 41, math: 48, hindi: 49, table: 50, rhymes: 45, gk: 47, art: 'A+', attendance: '53', remarks: '' },
//   { rollNumber: 9, english: 37, math: 49, hindi: 49, table: 48, rhymes: 48, gk: 48, art: 'A+', attendance: '83', remarks: '' },
//   { rollNumber: 10, english: 43, math: 46, hindi: 37, table: 40, rhymes: 42, gk: 42, art: 'A', attendance: '84', remarks: '' },
//   { rollNumber: 12, english: 36, math: 45, hindi: 47, table: 50, rhymes: 40, gk: 40, art: 'A', attendance: '67', remarks: '' },
//   { rollNumber: 13, english: 31, math: 38, hindi: 41, table: 49, rhymes: 48, gk: 39, art: 'A', attendance: '85', remarks: '' },
//   { rollNumber: 14, english: 33, math: 42, hindi: 43, table: 47, rhymes: 25, gk: 42, art: 'A+', attendance: '55', remarks: '' },
//   { rollNumber: 15, english: null, math: 33, hindi: 32, table: 0, rhymes: 48, gk: 39, art: '', attendance: '52', remarks: '' },

//   { rollNumber: 17, english: 30, math: 40, hindi: 45, table: 49, rhymes: 35, gk: 33, art: 'A', attendance: '57', remarks: '' },
//   { rollNumber: 19, english: 33, math: 36, hindi: 39, table: 49, rhymes: 0, gk: 0, art: 'A', attendance: '49', remarks: '' },
//   { rollNumber: 20, english: 33, math: 36, hindi: 41, table: 48, rhymes: 40, gk: 35, art: 'B', attendance: '80', remarks: '' },
//   { rollNumber: 21, english: 33, math: 32, hindi: 30, table: 45, rhymes: 35, gk: 21, art: 'B', attendance: '61', remarks: '' },
//   { rollNumber: 22, english: 43, math: 40, hindi: 42, table: 48, rhymes: 47, gk: 43, art: 'A', attendance: '64', remarks: '' },
//   { rollNumber: 23, english: 31, math: 41, hindi: 30, table: 48, rhymes: 40, gk: 44, art: 'A', attendance: '45', remarks: '' },

//   { rollNumber: 24, english: 35, math: 0, hindi: 0, table: 48, rhymes: 0, gk: 0, art: 'A', attendance: '51', remarks: '' },
//   { rollNumber: 26, english: 40, math: 48, hindi: 50, table: 50, rhymes: 47, gk: 45, art: 'A+', attendance: '38', remarks: '' },
//   { rollNumber: 27, english: 36, math: 48, hindi: 47, table: 48, rhymes: 48, gk: 40, art: 'A', attendance: '74', remarks: '' },
//   { rollNumber: 28, english: 36, math: 49, hindi: 48, table: 50, rhymes: 48, gk: 50, art: 'A+', attendance: '75', remarks: '' },
//   { rollNumber: 29, english: 37, math: 50, hindi: 45, table: 48, rhymes: 45, gk: 46, art: 'A', attendance: '44', remarks: '' },
//   { rollNumber: 30, english: 36, math: 43, hindi: 30, table: 46, rhymes: 40, gk: 11, art: 'A', attendance: '44', remarks: '' },
//   { rollNumber: 32, english: 38, math: 50, hindi: 50, table: 48, rhymes: 46, gk: 47, art: 'A+', attendance: '60', remarks: '' },
//   { rollNumber: 33, english: 0, math: 0, hindi: 0, table: 50, rhymes: 0, gk: 0, art: '', attendance: '58', remarks: '' },
//   { rollNumber: 35, english: 40, math: 45, hindi: 25, table: 47, rhymes: 35, gk: 43, art: '', attendance: '33', remarks: '' },
//   { rollNumber: 36, english: 38, math: 50, hindi: 50, table: 50, rhymes: 45, gk: 48, art: 'A', attendance: '74', remarks: '' },
//   { rollNumber: 39, english: 34, math: 41, hindi: 30, table: 48, rhymes: 46, gk: 39, art: 'A', attendance: '64', remarks: '' },
//   { rollNumber: 43, english: 36, math: 44, hindi: 30, table: 46, rhymes: 43, gk: 41, art: 'A', attendance: '68', remarks: '' },

//   { rollNumber: 45, english: 38, math: 49, hindi: 49, table: 50, rhymes: 46, gk: 49, art: 'A', attendance: '77', remarks: '' },
//   { rollNumber: 46, english: 30, math: 46, hindi: 46, table: 49, rhymes: 42, gk: 23, art: 'A', attendance: '75', remarks: '' },
//   { rollNumber: 47, english: 48, math: 21, hindi: 0, table: 40, rhymes: 40, gk: 38, art: '', attendance: '48', remarks: '' },
//   { rollNumber: 48, english: 38, math: 50, hindi: 48, table: 50, rhymes: 48, gk: 49, art: 'A', attendance: '72', remarks: '' },
//   { rollNumber: 49, english: 34, math: 48, hindi: 30, table: 49, rhymes: 35, gk: 44, art: 'A+', attendance: '54', remarks: '' },
//   { rollNumber: 51, english: 32, math: 34, hindi: 45, table: 48, rhymes: 35, gk: 27, art: '', attendance: '56', remarks: '' },
//   { rollNumber: 52, english: 38, math: 44, hindi: 48, table: 48, rhymes: 30, gk: 44, art: 'A', attendance: '76', remarks: '' }
// ]


// ========================================
// 2) BULK INSERT SCRIPT
// ========================================
async function seedUkgaReports () {
  await connectDB()
  console.log('MongoDB Connected ✔')


  
  let updatedReports = []

  for (const r of ukgbReports) {
    // 1️⃣ Find student
    const student = await Student.findOne({
      class: 'UKGB',
      rollNumber: r.rollNumber
    })

    if (!student) {
      console.log(`⚠ Student not found → Roll No: ${r.rollNumber}`)
      continue
    }

    // 2️⃣ Ensure GK exists
    r.gk = r.gk ?? 0

    // 3️⃣ Total marks (UKG = 6 subjects)
    const totalMarks =
      (r.english || 0) +
      (r.math || 0) +
      (r.hindi || 0) +
      (r.table || 0) +
      (r.rhymes || 0) +
      (r.gk || 0)

    // 4️⃣ Percentage (out of 300)
    const percentage = (totalMarks / 300) * 100

    // 5️⃣ Grade
    let grade = ''
    if (percentage >= 80) grade = 'A'
    else if (percentage >= 60) grade = 'B'
    else if (percentage >= 45) grade = 'C'
    else grade = 'D'

    // ✅ 6️⃣ Subject-wise FAIL rule
    const subjects = [r.english, r.math, r.hindi, r.table, r.rhymes, r.gk]
    const hasFailMarks = subjects.some(mark => mark === null || mark < 15)

    // ✅ 7️⃣ Division (correct)
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

    // ✅ 8️⃣ UPDATE or INSERT (NO DUPLICATES)
    const saved = await Report.findOneAndUpdate(
      { studentId: student._id },
      {
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
        classType: 'KG'
      },
      { upsert: true, new: true }
    )

    updatedReports.push(saved)
  }

  console.log(`🎉 Successfully UPDATED ${updatedReports.length} UKGB reports!`)
  process.exit()
}

seedUkgaReports()


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

assignPositions("ukgb")