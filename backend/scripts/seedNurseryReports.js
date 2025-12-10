import dotenv from 'dotenv'
import connectDB from '../config/db.js'
import Student from '../models/Student.js'
import Report from '../models/Report.js'

dotenv.config()

// ========================================
// 1) UKGA Reports Data (ADD ALL HERE)
// ========================================
const nurseryReports = [
  {
    rollNumber: 1,
    english: 50,
    math: 48,
    hindi: 47,
    table: 50,
    rhymes: 40,
    art: 'A',
    attendance: 57,
    remarks: ''
  },
  {
    rollNumber: 2,
    english: 50,
    math: 48,
    hindi: 48,
    table: 50,
    rhymes: 40,
    art: 'A',
    attendance: 81,
    remarks: ''
  },
  {
    rollNumber: 3,
    english: 50,
    math: 48,
    hindi: 48,
    table: 50,
    rhymes: 40,
    art: 'B+',
    attendance: 78,
    remarks: ''
  },
  {
    rollNumber: 6,
    english: 44,
    math: 46,
    hindi: 48,
    table: 50,
    rhymes: 35,
    art: 'A',
    attendance: 65,
    remarks: ''
  },
  {
    rollNumber: 7,
    english: 50,
    math: 47,
    hindi: 43,
    table: 40,
    rhymes: 36,
    art: 'B+',
    attendance: 57,
    remarks: ''
  },
  {
    rollNumber: 8,
    english: 50,
    math: 48,
    hindi: 47,
    table: 49,
    rhymes: 34,
    art: 'A',
    attendance: 78,
    remarks: ''
  },
  {
    rollNumber: 9,
    english: 48,
    math: 43,
    hindi: 36,
    table: 49,
    rhymes: 32,
    art: 'B+',
    attendance: 67,
    remarks: ''
  },
  {
    rollNumber: 10,
    english: 50,
    math: 50,
    hindi: 47,
    table: 47,
    rhymes: 30,
    art: 'A',
    attendance: 68,
    remarks: ''
  },
  {
    rollNumber: 11,
    english: 42,
    math: 35,
    hindi: 31,
    table: 37,
    rhymes: null,
    art: 'A',
    attendance: 55,
    remarks: ''
  },
  {
    rollNumber: 12,
    english: 50,
    math: 44,
    hindi: 32,
    table: 36,
    rhymes: 35,
    art: 'A',
    attendance: 79,
    remarks: ''
  },
  {
    rollNumber: 13,
    english: 37,
    math: 40,
    hindi: 33,
    table: 46,
    rhymes: 33,
    art: 'A',
    attendance: 21,
    remarks: ''
  },
  {
    rollNumber: 14,
    english: null,
    math: null,
    hindi: null,
    table: null,
    rhymes: null,
    art: '',
    attendance: 71,
    remarks: ''
  },
  {
    rollNumber: 15,
    english: 41,
    math: 49,
    hindi: 33,
    table: 35,
    rhymes: 34,
    art: 'A',
    attendance: 38,
    remarks: ''
  },
  {
    rollNumber: 16,
    english: 49,
    math: 47,
    hindi: 44,
    table: 40,
    rhymes: 40,
    art: 'B+',
    attendance: 69,
    remarks: ''
  },
  {
    rollNumber: 17,
    english: 50,
    math: 50,
    hindi: 44,
    table: 46,
    rhymes: 38,
    art: 'A',
    attendance: 75,
    remarks: ''
  },
  {
    rollNumber: 18,
    english: 48,
    math: 44,
    hindi: 37,
    table: 45,
    rhymes: 35,
    art: 'B+',
    attendance: 79,
    remarks: ''
  },
  {
    rollNumber: 19,
    english: 41,
    math: 34,
    hindi: 43,
    table: 36,
    rhymes: 32,
    art: 'B',
    attendance: 27,
    remarks: ''
  },
  {
    rollNumber: 20,
    english: 50,
    math: 50,
    hindi: 49,
    table: 45,
    rhymes: 30,
    art: 'A',
    attendance: 67,
    remarks: ''
  },
  {
    rollNumber: 21,
    english: 50,
    math: 44,
    hindi: 42,
    table: 42,
    rhymes: 30,
    art: 'A',
    attendance: 75,
    remarks: ''
  },
  {
    rollNumber: 24,
    english: 50,
    math: 50,
    hindi: 46,
    table: 40,
    rhymes: 30,
    art: 'A',
    attendance: 66,
    remarks: ''
  },
  {
    rollNumber: 25,
    english: 50,
    math: 48,
    hindi: 49,
    table: 50,
    rhymes: 25,
    art: 'A',
    attendance: 77,
    remarks: ''
  },
  {
    rollNumber: 26,
    english: 50,
    math: 42,
    hindi: 49,
    table: 40,
    rhymes: 30,
    art: 'B+',
    attendance: 74,
    remarks: ''
  },
  {
    rollNumber: 27,
    english: 49,
    math: 44,
    hindi: 43,
    table: 49,
    rhymes: 40,
    art: 'B',
    attendance: 74,
    remarks: ''
  },
  {
    rollNumber: 29,
    english: 46,
    math: 50,
    hindi: 43,
    table: 47,
    rhymes: 25,
    art: 'A',
    attendance: 33,
    remarks: ''
  },
  {
    rollNumber: 30,
    english: 43,
    math: 37,
    hindi: 45,
    table: 30,
    rhymes: 25,
    art: 'A',
    attendance: 59,
    remarks: ''
  },
  {
    rollNumber: 31,
    english: 43,
    math: 46,
    hindi: 41,
    table: 37,
    rhymes: 30,
    art: 'A',
    attendance: 73,
    remarks: ''
  },
  {
    rollNumber: 32,
    english: 35,
    math: 48,
    hindi: 31,
    table: 43,
    rhymes: 26,
    art: 'A',
    attendance: 66,
    remarks: ''
  },
  {
    rollNumber: 33,
    english: 45,
    math: 44,
    hindi: 39,
    table: 49,
    rhymes: 25,
    art: 'A',
    attendance: 40,
    remarks: ''
  },

  {
    rollNumber: 34,
    english: 49,
    math: 50,
    hindi: 36,
    table: 48,
    rhymes: 35,
    art: 'A',
    attendance: 83,
    remarks: ''
  },
  {
    rollNumber: 35,
    english: 43,
    math: 48,
    hindi: 45,
    table: 49,
    rhymes: 28,
    art: 'A',
    attendance: 53,
    remarks: ''
  },
  {
    rollNumber: 36,
    english: 45,
    math: 44,
    hindi: 40,
    table: 40,
    rhymes: 28,
    art: 'B+',
    attendance: 54,
    remarks: ''
  },
  {
    rollNumber: 37,
    english: 48,
    math: 44,
    hindi: 31,
    table: 38,
    rhymes: 22,
    art: 'A',
    attendance: 40,
    remarks: ''
  },
  {
    rollNumber: 38,
    english: 44,
    math: 38,
    hindi: 36,
    table: 38,
    rhymes: 40,
    art: 'B+',
    attendance: 46,
    remarks: ''
  },
  {
    rollNumber: 39,
    english: 45,
    math: 50,
    hindi: 42,
    table: 50,
    rhymes: 35,
    art: 'A',
    attendance: 80,
    remarks: ''
  },

  {
    rollNumber: 40,
    english: 50,
    math: 50,
    hindi: 48,
    table: 50,
    rhymes: 23,
    art: 'A',
    attendance: 67,
    remarks: ''
  },
  {
    rollNumber: 41,
    english: 48,
    math: 49,
    hindi: 31,
    table: 49,
    rhymes: 40,
    art: 'B+',
    attendance: 62,
    remarks: ''
  },

  {
    rollNumber: 43,
    english: 50,
    math: 48,
    hindi: 45,
    table: 49,
    rhymes: 30,
    art: 'A',
    attendance: 66,
    remarks: ''
  },
  {
    rollNumber: 44,
    english: 40,
    math: 48,
    hindi: 37,
    table: 40,
    rhymes: 30,
    art: 'A',
    attendance: 80,
    remarks: ''
  },

  {
    rollNumber: 47,
    english: 45,
    math: 48,
    hindi: 33,
    table: 46,
    rhymes: 32,
    art: 'A',
    attendance: 54,
    remarks: ''
  },
  {
    rollNumber: 48,
    english: 50,
    math: 50,
    hindi: 46,
    table: 48,
    rhymes: 30,
    art: 'B',
    attendance: 60,
    remarks: ''
  },

  {
    rollNumber: 49,
    english: 35,
    math: 46,
    hindi: 26,
    table: 47,
    rhymes: 32,
    art: 'B+',
    attendance: 44,
    remarks: ''
  },

  {
    rollNumber: 50,
    english: 41,
    math: 46,
    hindi: 45,
    table: 47,
    rhymes: 20,
    art: 'A',
    attendance: 40,
    remarks: ''
  },
  {
    rollNumber: 51,
    english: 46,
    math: 48,
    hindi: 39,
    table: 48,
    rhymes: 20,
    art: 'A',
    attendance: 51,
    remarks: ''
  },
  {
    rollNumber: 52,
    english: 50,
    math: 50,
    hindi: 44,
    table: 48,
    rhymes: 20,
    art: 'B+',
    attendance: 19,
    remarks: ''
  },
  {
    rollNumber: 53,
    english: 50,
    math: 48,
    hindi: 45,
    table: 38,
    rhymes: 21,
    art: 'A',
    attendance: 34,
    remarks: ''
  },

  {
    rollNumber: 54,
    english: 43,
    math: 41,
    hindi: 30,
    table: 20,
    rhymes: 20,
    art: 'A',
    attendance: 39,
    remarks: ''
  },

  {
    rollNumber: 55,
    english: 40,
    math: 49,
    hindi: 30,
    table: null,
    rhymes: 22,
    art: 'B+',
    attendance: 32,
    remarks: ''
  },

  {
    rollNumber: 56,
    english: 45,
    math: 40,
    hindi: 35,
    table: 47,
    rhymes: 20,
    art: 'B',
    attendance: 33,
    remarks: ''
  },
  {
    rollNumber: 57,
    english: 48,
    math: 45,
    hindi: 41,
    table: 48,
    rhymes: 40,
    art: 'A',
    attendance: 38,
    remarks: ''
  },

  {
    rollNumber: 58,
    english: 49,
    math: 40,
    hindi: 32,
    table: 31,
    rhymes: 38,
    art: 'B+',
    attendance: 31,
    remarks: ''
  },

  {
    rollNumber: 59,
    english: 44,
    math: null,
    hindi: 33,
    table: null,
    rhymes: 20,
    art: 'A',
    attendance: 36,
    remarks: ''
  },

  {
    rollNumber: 60,
    english: 32,
    math: 24,
    hindi: 24,
    table: 49,
    rhymes: 20,
    art: 'A',
    attendance: 21,
    remarks: ''
  }
]

// ========================================
// 2) BULK INSERT SCRIPT
// ========================================
async function seedNurseryReports () {
  await connectDB()
  console.log('MongoDB Connected ✔')

  let updatedReports = []

  for (const r of nurseryReports) {
    // 1️⃣ Find student
    const student = await Student.findOne({
      class: 'NURSERY',
      rollNumber: r.rollNumber
    })

    if (!student) {
      console.log(`⚠ Student not found → Roll No: ${r.rollNumber}`)
      continue
    }

    // 2️⃣ GK always null for Nursery
    r.gk = null

    // 3️⃣ Total marks (Nursery = 5 subjects)
    const totalMarks =
      (r.english || 0) +
      (r.math || 0) +
      (r.hindi || 0) +
      (r.table || 0) +
      (r.rhymes || 0)

    // 4️⃣ Percentage (out of 250)
    const percentage = (totalMarks / 250) * 100

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
      r.rhymes
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

  console.log(`🎉 Successfully UPDATED ${updatedReports.length} Nursery reports!`)
  process.exit()
}


seedNurseryReports()

