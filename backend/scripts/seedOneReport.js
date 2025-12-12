import dotenv from 'dotenv'
import connectDB from '../config/db.js'
import Student from '../models/Student.js'
import Report from '../models/Report.js'

dotenv.config()

// Class I
// const oneReports = [
//   { rollNumber: 1, english: 46, math: 38, hindi: 45, gk: 46, socialStudies: 38, science: 38, art: "A", attendance: "60", remarks: "" },
//   { rollNumber: 4, english: 41, math: 42, hindi: 42, gk: 43, socialStudies: 42, science: 28, art: "A+", attendance: "71", remarks: "" },
//   { rollNumber: 5, english: 47, math: 44, hindi: 41, gk: 44, socialStudies: 43, science: 37, art: "A", attendance: "62", remarks: "" },
//   { rollNumber: 7, english: 40, math: 43, hindi: 45, gk: 44, socialStudies: 31, science: 26, art: "B", attendance: "57", remarks: "" },
//   { rollNumber: 8, english: 43, math: 46, hindi: 41, gk: 37, socialStudies: 20, science: 28, art: "A", attendance: "60", remarks: "" },
//   { rollNumber: 9, english: 38, math: 45, hindi: 46, gk: 46, socialStudies: 30, science: 23, art: "A", attendance: "83", remarks: "" },
//   { rollNumber: 10, english: 38, math: 48, hindi: 42, gk: 42, socialStudies: 28, science: 28, art: "B", attendance: "74", remarks: "" },

//   { rollNumber: 11, english: 46, math: 49, hindi: 45, gk: 30, socialStudies: 36, science: 40, art: "B", attendance: "66", remarks: "" },
//   { rollNumber: 12, english: 42, math: 47, hindi: 42, gk: 36, socialStudies: 40, science: 33, art: "B", attendance: "78", remarks: "" },
//   { rollNumber: 13, english: 36, math: 40, hindi: 41, gk: 36, socialStudies: 43, science: 30, art: "B", attendance: "56", remarks: "" },
//   { rollNumber: 14, english: 28, math: null, hindi: null, gk: 24, socialStudies: null, science: 28, art: "", attendance: "41", remarks: "" },
//   { rollNumber: 15, english: 43, math: 45, hindi: 36, gk: 42, socialStudies: 33, science: 28, art: "B", attendance: "80", remarks: "" },
//   { rollNumber: 16, english: 46, math: 39, hindi: 37, gk: 41, socialStudies: 34, science: 25, art: "B", attendance: "67", remarks: "" },
//   { rollNumber: 17, english: 48, math: 41, hindi: 42, gk: 43, socialStudies: 39, science: 32, art: "A", attendance: "73", remarks: "" },

//   { rollNumber: 19, english: 9, math: 34, hindi: 24, gk: 26, socialStudies: 6, science: 15, art: "B", attendance: "73", remarks: "" },
//   { rollNumber: 20, english: 48, math: 46, hindi: 47, gk: 44, socialStudies: 36, science: 29, art: "A+", attendance: "65", remarks: "" },
//   { rollNumber: 22, english: 36, math: 46, hindi: 46, gk: 38, socialStudies: 44, science: 29, art: "B", attendance: "59", remarks: "" },
//   { rollNumber: 23, english: 19, math: 34, hindi: 23, gk: 44, socialStudies: 23, science: 18, art: "A", attendance: "36", remarks: "" },
//   { rollNumber: 25, english: 31, math: 45, hindi: null, gk: 37, socialStudies: null, science: 8, art: "", attendance: "48", remarks: "" },
//   { rollNumber: 26, english: 38, math: 36, hindi: 45, gk: 31, socialStudies: 29, science: 19, art: "B", attendance: "64", remarks: "" },
//   { rollNumber: 27, english: 30, math: 41, hindi: 19, gk: 30, socialStudies: 23, science: 7, art: "B", attendance: "55", remarks: "" },
//   { rollNumber: 28, english: 18, math: 44, hindi: 36, gk: 40, socialStudies: 25, science: 18, art: "A", attendance: "76", remarks: "" },
//   { rollNumber: 29, english: 21, math: 39, hindi: 28, gk: 38, socialStudies: 18, science: 7, art: "B", attendance: "49", remarks: "" },
//   { rollNumber: 30, english: 22, math: 45, hindi: 41, gk: 44, socialStudies: 15, science: 23, art: "B", attendance: "65", remarks: "" },
//   { rollNumber: 32, english: 18, math: 47, hindi: 29, gk: 38, socialStudies: 19, science: 17, art: "A", attendance: "40", remarks: "" },
//   { rollNumber: 33, english: 44, math: 48, hindi: null, gk: 35, socialStudies: null, science: null, art: "", attendance: "46", remarks: "" },
//   { rollNumber: 34, english: 41, math: 45, hindi: 47, gk: 44, socialStudies: 24, science: 29, art: "A", attendance: "70", remarks: "" },

//   { rollNumber: 35, english: 15, math: 36, hindi: 38, gk: 32, socialStudies: 16, science: 22, art: "B", attendance: "59", remarks: "" },
//   { rollNumber: 36, english: 21, math: 41, hindi: null, gk: 38, socialStudies: null, science: 5,  art: "", attendance: "24", remarks: "" },
//   { rollNumber: 37, english: 30, math: 43, hindi: 42, gk: 41, socialStudies: 15, science: 25, art: "B", attendance: "64", remarks: "" },
//   { rollNumber: 38, english: 9, math: 45, hindi: null, gk: 41, socialStudies: null, science: 6,  art: "", attendance: "24", remarks: "" },
//   { rollNumber: 39, english: 35, math: 45, hindi: 48, gk: 42, socialStudies: 24, science: 27, art: "A", attendance: "81", remarks: "" },
//   { rollNumber: 40, english: 34, math: 47, hindi: 18, gk: 40, socialStudies: 22, science: 5,  art: "A", attendance: "80", remarks: "" },
//   { rollNumber: 41, english: 28, math: 40, hindi: 41, gk: 37, socialStudies: 19, science: 18, art: "B", attendance: "58", remarks: "" },
//   { rollNumber: 42, english: 17, math: 37, hindi: 30, gk: 26, socialStudies: 9,  science: 24, art: "B", attendance: "42", remarks: "" },
//   { rollNumber: 43, english: 45, math: 46, hindi: 37, gk: 43, socialStudies: 33, science: 42, art: "A", attendance: "74", remarks: "" },
//   { rollNumber: 44, english: 27, math: 32, hindi: 25, gk: 40, socialStudies: 15, science: 15, art: "B", attendance: "76", remarks: "" },
//   { rollNumber: 46, english: 23, math: 34, hindi: 37, gk: 24, socialStudies: 15, science: 25, art: "A", attendance: "67", remarks: "" },
//   { rollNumber: 47, english: 29, math: 35, hindi: 38, gk: 41, socialStudies: 15, science: 18, art: "A", attendance: "41", remarks: "" },
//   { rollNumber: 48, english: 20, math: 31, hindi: 21, gk: 33, socialStudies: 15,  science: 20, art: "A", attendance: "52", remarks: "" },
//   { rollNumber: 49, english: 12, math: 42, hindi: 30, gk: 15, socialStudies: 5,  science: 16, art: "B", attendance: "47", remarks: "" },

//   // 👉 fill real marks for 51 & 52 from your sheet
//   { rollNumber: 51, english: 18, math: 31, hindi: 19, gk: 39, socialStudies: 9, science: 18, art: "B", attendance: "84", remarks: "" },
//   { rollNumber: 52, english: 18, math: 32, hindi: 31, gk: 38, socialStudies: 15, science: 15, art: "B", attendance: "50", remarks: "" }
// ]

// Class II
// const twoStudents = [
//   { rollNumber: 1, english: 44, math: 47, hindi: 44, gk: 47, socialStudies: 40, science: 50, art: "A", attendance: "71", remarks: "" },
//   { rollNumber: 2, english: 29, math: 47, hindi: 37, gk: 47, socialStudies: 28, science: 20, art: "B+", attendance: "59", remarks: "" },
//   { rollNumber: 3, english: 20, math: 33, hindi: 38, gk: 47, socialStudies: 24, science: 25, art: "A", attendance: "69", remarks: "" },
//   { rollNumber: 5, english: 17, math: 39, hindi: 21, gk: 41, socialStudies: 26, science: 23, art: "A", attendance: "54", remarks: "" },
//   { rollNumber: 6, english: 45, math: 43, hindi: 39, gk: 42, socialStudies: 40, science: 42, art: "A+", attendance: "56", remarks: "" },
//   { rollNumber: 7, english: 34, math: 33, hindi: 34, gk: 47, socialStudies: 26, science: 40, art: "B", attendance: "47", remarks: "" },
//   { rollNumber: 8, english: 25, math: 47, hindi: 28, gk: 35, socialStudies: 22, science: 21, art: "A+", attendance: "59", remarks: "" },
//   { rollNumber: 9, english: 22, math: 46, hindi: 24, gk: 45, socialStudies: 24, science: 26, art: "B+", attendance: "81", remarks: "" },
//   { rollNumber: 10, english: 21, math: 37, hindi: 24, gk: 39, socialStudies: 20, science: 24, art: "B+", attendance: "68", remarks: "" },
//   { rollNumber: 11, english: 21, math: 46, hindi: 20, gk: 37, socialStudies: 21, science: 18, art: "A", attendance: "77", remarks: "" },
//   { rollNumber: 12, english: 16, math: 16, hindi: 18, gk: 31, socialStudies: 16, science: 18, art: "A+", attendance: "69", remarks: "" },
//   { rollNumber: 13, english: 16, math: 20, hindi: 16, gk: 16, socialStudies: 16, science: 16, art: "B", attendance: "27", remarks: "" },
//   { rollNumber: 14, english: 16, math: 41, hindi: 22, gk: 22, socialStudies: 16, science: 18, art: "B+", attendance: "59", remarks: "" },
//   { rollNumber: 15, english: 28, math: 25, hindi: 16, gk: 36, socialStudies: 16, science: 18, art: "B+", attendance: "52", remarks: "" },
//   { rollNumber: 16, english: 16, math: 38, hindi: 16, gk: 27, socialStudies: 16, science: 18, art: "A", attendance: "73", remarks: "" },
//   { rollNumber: 17, english: 16, math: 25, hindi: 20, gk: 27, socialStudies: 16, science: 25, art: "A", attendance: "45", remarks: "" },
//   { rollNumber: 18, english: 25, math: 32, hindi: 16, gk: 24, socialStudies: 15, science: 22, art: "A", attendance: "67", remarks: "" },
//   { rollNumber: 19, english: 16, math: 16, hindi: 16, gk: 18, socialStudies: 16, science: 18, art: "B+", attendance: "68", remarks: "" },
//   { rollNumber: 20, english: 16, math: 23, hindi: 16, gk: 16, socialStudies: 16, science: 16, art: "B", attendance: "56", remarks: "" },
//   { rollNumber: 21, english: 25, math: 41, hindi: 33, gk: 45, socialStudies: 22, science: 29, art: "B", attendance: "62", remarks: "" },
//   { rollNumber: 22, english: 16, math: 35, hindi: 37, gk: 42, socialStudies: 16, science: 34, art: "A", attendance: "71", remarks: "" },
//   { rollNumber: 23, english: 23, math: 37, hindi: 32, gk: 44, socialStudies: 20, science: 24, art: "A", attendance: "45", remarks: "" },
//   { rollNumber: 24, english: 16, math: 36, hindi: 28, gk: 35, socialStudies: 16, science: 31, art: "B", attendance: "44", remarks: "" },
//   { rollNumber: 25, english: 25, math: 37, hindi: 32, gk: 41, socialStudies: 16, science: 35, art: "B", attendance: "47", remarks: "" },
//   { rollNumber: 26, english: 18, math: 33, hindi: 18, gk: 31, socialStudies: 16, science: 18, art: "A", attendance: "45", remarks: "" },
//   { rollNumber: 27, english: 16, math: 29, hindi: 32, gk: 36, socialStudies: 20, science: 35, art: "A", attendance: "58", remarks: "" },
//   { rollNumber: 29, english: 16, math: 42, hindi: 17, gk: 38, socialStudies: 20, science: 28, art: "B+", attendance: "52", remarks: "" },
//   { rollNumber: 30, english: 25, math: 34, hindi: 17, gk: 38, socialStudies: 16, science: 22, art: "A+", attendance: "59", remarks: "" },
//   { rollNumber: 31, english: 16, math: 22, hindi: 16, gk: 30, socialStudies: 16, science: 17, art: "B", attendance: "77", remarks: "" },
//   { rollNumber: 32, english: 20, math: 35, hindi: 16, gk: 40, socialStudies: 22, science: 32, art: "B", attendance: "41", remarks: "" },
//   { rollNumber: 33, english: 20, math: 43, hindi: 31, gk: 44, socialStudies: 22, science: 28, art: "B+", attendance: "66", remarks: "" }
// ];

// Class III
// const threeStudents = [
//   { rollNumber: 1, english: 45, math: 36, hindi: 41, gk: 50, socialStudies: 34, science: 49, art: "A+", attendance: "73", remarks: "" },
//   { rollNumber: 3, english: 49, math: 30, hindi: 32, gk: 50, socialStudies: 23, science: 46, art: "A", attendance: "75", remarks: "" },
//   { rollNumber: 4, english: 35, math: 29, hindi: 33, gk: 44, socialStudies: 20, science: 43, art: "A", attendance: "61", remarks: "" },
//   { rollNumber: 5, english: 47, math: 18, hindi: 40, gk: 35, socialStudies: 22, science: 41, art: "B+", attendance: "63", remarks: "" },
//   { rollNumber: 6, english: 45, math: 34, hindi: 41, gk: 48, socialStudies: 36, science: 45, art: "A", attendance: "66", remarks: "" },
//   { rollNumber: 7, english: 40, math: 29, hindi: 29, gk: 45, socialStudies: 37, science: 48, art: "A", attendance: "64", remarks: "" },
//   { rollNumber: 8, english: 49, math: 37, hindi: 43, gk: 50, socialStudies: 46, science: 49, art: "A", attendance: "78", remarks: "" },
//   { rollNumber: 9, english: 40, math: 35, hindi: 30, gk: 40, socialStudies: 22, science: 48, art: "B+", attendance: "53", remarks: "" },
//   { rollNumber: 10, english: 40, math: 31, hindi: 20, gk: 24, socialStudies: 20, science: 23, art: "B", attendance: "45", remarks: "" },
//   { rollNumber: 11, english: 42, math: 43, hindi: 48, gk: 41, socialStudies: 34, science: 35, art: "A", attendance: "59", remarks: "" },
//   { rollNumber: 12, english: 36, math: 31, hindi: 36, gk: 44, socialStudies: 20, science: 24, art: "B+", attendance: "59", remarks: "" },
//   { rollNumber: 13, english: 29, math: 27, hindi: 18, gk: 30, socialStudies: 16, science: 16, art: "A", attendance: "18", remarks: "" },
//   { rollNumber: 14, english: 39, math: 25, hindi: 37, gk: 41, socialStudies: 16, science: 39, art: "B+", attendance: "67", remarks: "" },
//   { rollNumber: 16, english: 26, math: 23, hindi: 18, gk: 39, socialStudies: 18, science: 41, art: "A", attendance: "27", remarks: "" },
//   { rollNumber: 17, english: 37, math: 23, hindi: 24, gk: 39, socialStudies: 16, science: 35, art: "B+", attendance: "78", remarks: "" },
//   { rollNumber: 19, english: 45, math: 8, hindi: 23, gk: 42, socialStudies: 16, science: 39, art: "B+", attendance: "59", remarks: "" },
//   { rollNumber: 21, english: 45, math: 35, hindi: 21, gk: 44, socialStudies: 16, science: 43, art: "A", attendance: "48", remarks: "" },
//   { rollNumber: 22, english: 46, math: 33, hindi: 39, gk: 46, socialStudies: 20, science: 49, art: "A+", attendance: "55", remarks: "" },
//   { rollNumber: 24, english: 40, math: 33, hindi: 33, gk: 47, socialStudies: 20, science: 48, art: "B", attendance: "71", remarks: "" },
//   { rollNumber: 25, english: 16, math: 8, hindi: 2, gk: 43, socialStudies: 20, science: 19, art: "B+", attendance: "67", remarks: "" },
//   { rollNumber: 26, english: 44, math: 35, hindi: 17, gk: 43, socialStudies: 29, science: 47, art: "A", attendance: "66", remarks: "" },
//   { rollNumber: 27, english: 44, math: 26, hindi: 31, gk: 44, socialStudies: 20, science: 40, art: "A", attendance: "79", remarks: "" },
//   { rollNumber: 28, english: 30, math: 23, hindi: 18, gk: 42, socialStudies: 22, science: 29, art: "B+", attendance: "68", remarks: "" },
//   { rollNumber: 29, english: 41, math: 34, hindi: 21, gk: 44, socialStudies: 22, science: 39, art: "A+", attendance: "78", remarks: "" },
//   { rollNumber: 31, english: 39, math: 21, hindi: 27, gk: 34, socialStudies: 20, science: 30, art: "A", attendance: "67", remarks: "" },
//   { rollNumber: 32, english: 34, math: 30, hindi: 19, gk: 35, socialStudies: 16, science: 27, art: "B+", attendance: "55", remarks: "" },
//   { rollNumber: 34, english: 40, math: 27, hindi: 9, gk: 34, socialStudies: 6, science: 26, art: "B", attendance: "51", remarks: "" },
//   { rollNumber: 36, english: 26, math: 26, hindi: 16, gk: 31, socialStudies: 16, science: 27, art: "B", attendance: "53", remarks: "" },

//   { rollNumber: 37, english: 44, math: 25, hindi: 17, gk: 35, socialStudies: 16, science: 23, art: "B+", attendance: "48", remarks: "" },
//   { rollNumber: 38, english: 36, math: 26, hindi: 19, gk: 47, socialStudies: 16, science: 41, art: "A+", attendance: "43", remarks: "" },
//   { rollNumber: 39, english: 30, math: 25, hindi: 27, gk: 25, socialStudies: 15, science: 21, art: "B", attendance: "60", remarks: "" },
//   { rollNumber: 40, english: 29, math: 21, hindi: 34, gk: 44, socialStudies: 16, science: 23, art: "A", attendance: "20", remarks: "" },
//   { rollNumber: 41, english: 35, math: 23, hindi: 26, gk: 40, socialStudies: 16, science: 20, art: "A", attendance: "50", remarks: "" },
//   { rollNumber: 42, english: 30, math: 33, hindi: 15, gk: 45, socialStudies: 16, science: 16, art: "A", attendance: "72", remarks: "" },
//   { rollNumber: 43, english: 20, math: 22, hindi: 16, gk: 31, socialStudies: 16, science: 15, art: "B+", attendance: "43", remarks: "" },
// ];


// Class IV
// const fourReports =[
//   { "rollNumber": 1, "english": 48, "math": 42, "hindi": 46, "gk": 49, "socialStudies": 45, "science": 45, "art": "A", "attendance": 77, "remarks": "" },
//   { "rollNumber": 2, "english": 47, "math": 28, "hindi": 39, "gk": 48, "socialStudies": 45, "science": 43, "art": "A+", "attendance": 55, "remarks": "" },
//   { "rollNumber": 3, "english": 48, "math": 44, "hindi": 45, "gk": 49, "socialStudies": 32, "science": 42, "art": "A+", "attendance": 74, "remarks": "" },
//   { "rollNumber": 4, "english": 43, "math": 23, "hindi": 29, "gk": 41, "socialStudies": 23, "science": 29, "art": "A+", "attendance": 71, "remarks": "" },
//   { "rollNumber": 5, "english": 48, "math": 42, "hindi": 42, "gk": 48, "socialStudies": 22, "science": 35, "art": "A", "attendance": 68, "remarks": "" },
//   { "rollNumber": 6, "english": 45, "math": 37, "hindi": 22, "gk": 43, "socialStudies": 24, "science": 30, "art": "B", "attendance": 57, "remarks": "" },
//   { "rollNumber": 7, "english": 42, "math": 34, "hindi": 33, "gk": 40, "socialStudies": 23, "science": 31, "art": "A", "attendance": 70, "remarks": "" },
//   { "rollNumber": 8, "english": 35, "math": 26, "hindi": 21, "gk": 46, "socialStudies": 20, "science": 28, "art": "A", "attendance": 57, "remarks": "" },
//   { "rollNumber": 9, "english": 34, "math": 28, "hindi": 20, "gk": 44, "socialStudies": 20, "science": 29, "art": "A", "attendance": 61, "remarks": "" },
//   { "rollNumber": 10, "english": 38, "math": 29, "hindi": 27, "gk": 40, "socialStudies": 20, "science": 28, "art": "A", "attendance": 55, "remarks": "" },
//   { "rollNumber": 11, "english": 16, "math": 24, "hindi": 29, "gk": 40, "socialStudies": 20, "science": 23, "art": "A+", "attendance": 60, "remarks": "" },
//   { "rollNumber": 12, "english": 41, "math": 28, "hindi": 25, "gk": 40, "socialStudies": 20, "science": 28, "art": "B+", "attendance": 78, "remarks": "" },
//   { "rollNumber": 13, "english": 4, "math": 25, "hindi": 16, "gk": 40, "socialStudies": 16, "science": 23, "art": "A", "attendance": 65, "remarks": "" },
//   { "rollNumber": 14, "english": 47, "math": 40, "hindi": 43, "gk": 47, "socialStudies": 45, "science": 32, "art": "A+", "attendance": 59, "remarks": "" },
//   { "rollNumber": 18, "english": 33, "math": 32, "hindi": 20, "gk": 33, "socialStudies": 28, "science": 22, "art": "A+", "attendance": 54, "remarks": "" },
//   { "rollNumber": 19, "english": 33, "math": 35, "hindi": 32, "gk": 38, "socialStudies": 29, "science": 23, "art": "A+", "attendance": 54, "remarks": "" },
//   { "rollNumber": 20, "english": 32, "math": 28, "hindi": 22, "gk": 38, "socialStudies": 20, "science": 19, "art": "A", "attendance": 31, "remarks": "" },
//   { "rollNumber": 21, "english": 46, "math": 35, "hindi": 21, "gk": 34, "socialStudies": 29, "science": 23, "art": "A", "attendance": 73, "remarks": "" },
//   { "rollNumber": 22, "english": 36, "math": 27, "hindi": 21, "gk": 41, "socialStudies": 20, "science": 32, "art": "A+", "attendance": 73, "remarks": "" },
//   { "rollNumber": 23, "english": 43, "math": 36, "hindi": 25, "gk": 48, "socialStudies": 30, "science": 25, "art": "A", "attendance": 59, "remarks": "" },
//   { "rollNumber": 24, "english": 49, "math": 42, "hindi": 36, "gk": 49, "socialStudies": 24, "science": 32, "art": "A+", "attendance": 46, "remarks": "" }
// ]

// Class V
const fiveReports = [
  { "rollNumber": 1, "english": 45, "math": 37, "hindi": 45, "gk": 48, "socialStudies": 49, "science": 49, "art": "A+", "attendance": 75, "remarks": "" },
  { "rollNumber": 2, "english": 45, "math": 44, "hindi": 47, "gk": 49, "socialStudies": 47, "science": 47, "art": "A+", "attendance": 71, "remarks": "" },
  { "rollNumber": 3, "english": 43, "math": 39, "hindi": 41, "gk": 43, "socialStudies": 33, "science": 42, "art": "B+", "attendance": 49, "remarks": "" },
  { "rollNumber": 4, "english": 23, "math": 42, "hindi": 46, "gk": 49, "socialStudies": 47, "science": 47, "art": "A", "attendance": 66, "remarks": "" },
  { "rollNumber": 6, "english": 19, "math": 28, "hindi": 43, "gk": 44, "socialStudies": 38, "science": 31, "art": "A+", "attendance": 49, "remarks": "" },
  { "rollNumber": 7, "english": 21, "math": 47, "hindi": 34, "gk": 45, "socialStudies": 34, "science": 48, "art": "A", "attendance": 75, "remarks": "" },
  { "rollNumber": 9, "english": 21, "math": 32, "hindi": 47, "gk": 44, "socialStudies": 37, "science": 46, "art": "A+", "attendance": 69, "remarks": "" },
  { "rollNumber": 10, "english": 27, "math": 30, "hindi": 43, "gk": 40, "socialStudies": 15, "science": 45, "art": "A+", "attendance": 72, "remarks": "" },
  { "rollNumber": 11, "english": 11, "math": 47, "hindi": 39, "gk": 46, "socialStudies": 32, "science": 48, "art": "A", "attendance": 73, "remarks": "" },
  { "rollNumber": 12, "english": 20, "math": 48, "hindi": 44, "gk": 43, "socialStudies": 26, "science": 41, "art": "A+", "attendance": 62, "remarks": "" },
  { "rollNumber": 13, "english": 26, "math": 39, "hindi": 42, "gk": 45, "socialStudies": 26, "science": 37, "art": "A", "attendance": 54, "remarks": "" },
  { "rollNumber": 14, "english": 18, "math": 46, "hindi": 43, "gk": 45, "socialStudies": 36, "science": 41, "art": "A", "attendance": 70, "remarks": "" },
  { "rollNumber": 16, "english": 26, "math": 27, "hindi": 42, "gk": 41, "socialStudies": 33, "science": 40, "art": "A+", "attendance": 72, "remarks": "" },
  { "rollNumber": 15, "english": 30, "math": 42, "hindi": 40, "gk": 42, "socialStudies": 48, "science": 48, "art": "A+", "attendance": 57, "remarks": "" },
  { "rollNumber": 17, "english": 24, "math": 25, "hindi": 40, "gk": 46, "socialStudies": 32, "science": 43, "art": "A", "attendance": 50, "remarks": "" },
  { "rollNumber": 18, "english": 27, "math": 26, "hindi": 39, "gk": 41, "socialStudies": 29, "science": 35, "art": "A", "attendance": 47, "remarks": "" },
  { "rollNumber": 20, "english": 14, "math": 31, "hindi": 36, "gk": 40, "socialStudies": 30, "science": 40, "art": "A", "attendance": 52, "remarks": "" }
];



// Class VI
// const sixReports = [
//     { rollNumber: 1, english: 32, math: 15, hindi: 21, gk: 48, socialStudies: 30, science: 30, art: "A", attendance: "76", remarks: "" },
//     { rollNumber: 2, english: 18, math: 8, hindi: 20, gk: 38, socialStudies: 17, science: 29, art: "A", attendance: "66", remarks: "" },
//       { rollNumber: 3, english: 9, math: 6, hindi: 16, gk: 45, socialStudies: 20, science: 19, art: "A", attendance: "53", remarks: "" },
// ]

async function seedOneReports () {
  await connectDB()
  console.log('MongoDB Connected ✔')

  let updatedReports = []

  for (const r of fiveReports) {
    // 1️⃣ Find student (adjust class value if needed)
    const student = await Student.findOne({
      class: 'V', 
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

// async function assignPositions(className) {
//   await connectDB()

//   const reports = await Report.find({ classType: 'PRIMARY' }).populate('studentId')

//   const classReports = reports.filter(
//      r => r.studentId.class.trim().toUpperCase() === className.trim().toUpperCase()
//    )
 
//    // Sort by percentage, then totalMarks
//    classReports.sort((a, b) => {
//      if (b.percentage !== a.percentage) return b.percentage - a.percentage
//      return b.totalMarks - a.totalMarks
//    })
 
//    let lastOM = null
//    let lastPercentage = null
//    let lastPosition = 0
 
//    for (let i = 0; i < classReports.length; i++) {
//      const r = classReports[i]
 
//      // Check if tied with previous student
//      const isTie =
//        r.totalMarks === lastOM &&
//        r.percentage === lastPercentage
 
//      const position = isTie ? lastPosition : i + 1
 
//      await Report.updateOne(
//        { _id: r._id },
//        { position }
//      )
 
//      // update trackers
//      lastOM = r.totalMarks
//      lastPercentage = r.percentage
//      lastPosition = position
//    }
 
//    console.log(`🎉 Positions assigned to class ${className}`)
//    process.exit()
// }

// assignPositions("v")