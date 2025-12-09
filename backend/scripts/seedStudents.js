import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Student from "../models/Student.js";

dotenv.config();

// Student Data (UKGA)
// const students = [
//   { "name": "Sunny Kumar", "class": "UKGA", "rollNumber": 1 },
//   { "name": "Satyajeet Kumar", "class": "UKGA", "rollNumber": 2 },
//   { "name": "Anshu Kumari", "class": "UKGA", "rollNumber": 3 },
//   { "name": "Saiyam Kumar", "class": "UKGA", "rollNumber": 4 },
//   { "name": "Rohit Kumar", "class": "UKGA", "rollNumber": 5 },
//   { "name": "Astha Kumari", "class": "UKGA", "rollNumber": 6 },
//   { "name": "Divyanshi Kumari", "class": "UKGA", "rollNumber": 7 },
//   { "name": "Divyanshu Kumar", "class": "UKGA", "rollNumber": 8 },
//   { "name": "Rishu Priya", "class": "UKGA", "rollNumber": 9 },
//   { "name": "Arushi Kumari", "class": "UKGA", "rollNumber": 12 },
//   { "name": "Rahul Kumar", "class": "UKGA", "rollNumber": 13 },
//   { "name": "Naina Kumari", "class": "UKGA", "rollNumber": 14 },
//   { "name": "Pandey Kumar", "class": "UKGA", "rollNumber": 15 },
//   { "name": "Anand Kumar", "class": "UKGA", "rollNumber": 16 },
//   { "name": "Sanvi Priya", "class": "UKGA", "rollNumber": 18 },
//   { "name": "Shilpi Kumari", "class": "UKGA", "rollNumber": 19 },
//   { "name": "Adarsh Kumar", "class": "UKGA", "rollNumber": 20 },
//   { "name": "Aman Kumar", "class": "UKGA", "rollNumber": 22 },
//   { "name": "Simran Kumari", "class": "UKGA", "rollNumber": 23 },
//   { "name": "Mamta Kumari", "class": "UKGA", "rollNumber": 26 },
//   { "name": "Aditi Bharti", "class": "UKGA", "rollNumber": 27 },
//   { "name": "Sonam Kumari", "class": "UKGA", "rollNumber": 28 },
//   { "name": "Sonam Kumari", "class": "UKGA", "rollNumber": 29 },
//   { "name": "Monika Kumari", "class": "UKGA", "rollNumber": 30 },
//   { "name": "Monu Kumar", "class": "UKGA", "rollNumber": 31 },
//   { "name": "Varsha Kumari", "class": "UKGA", "rollNumber": 32 },
//   { "name": "ManKhush Kumar", "class": "UKGA", "rollNumber": 36 },
//   { "name": "Dilkhush Kumar", "class": "UKGA", "rollNumber": 37 }
// ];


// Student Data (Nursery)
const students = [
  { "rollNumber": 1,  "name": "Shivangi Kumari",      "class": "NURSERY" },
  { "rollNumber": 2,  "name": "Harekrishna",     "class": "NURSERY" },
  { "rollNumber": 3,  "name": "Arohi Kumari",      "class": "NURSERY" },
  { "rollNumber": 6,  "name": "Amit Kumar",          "class": "NURSERY" },
  { "rollNumber": 7,  "name": "Ansh Kumar",          "class": "NURSERY" },
  { "rollNumber": 8,  "name": "Vivek Kumar",         "class": "NURSERY" },
  { "rollNumber": 9,  "name": "Kiska Kumari",        "class": "NURSERY" },
  { "rollNumber": 10, "name": "Satyam Kumar",        "class": "NURSERY" },
  { "rollNumber": 11, "name": "Prashant Kumar",      "class": "NURSERY" },
  { "rollNumber": 12, "name": "Rishav Kumar",        "class": "NURSERY" },
  { "rollNumber": 13, "name": "Kishor Kumar",        "class": "NURSERY" },
  { "rollNumber": 14, "name": "Ankush Kumar",       "class": "NURSERY" },
  { "rollNumber": 15, "name": "Nithu Kumari",         "class": "NURSERY" },
  { "rollNumber": 16, "name": "Roushan Kumar",       "class": "NURSERY" },
  { "rollNumber": 17, "name": "Harshit Kumar",       "class": "NURSERY" },
  { "rollNumber": 18, "name": "Chirag Kumar",        "class": "NURSERY" },
  { "rollNumber": 19, "name": "Prince Kumar",        "class": "NURSERY" },
  { "rollNumber": 20, "name": "Karanjeet",       "class": "NURSERY" },
  { "rollNumber": 21, "name": "Rishav Kumar",        "class": "NURSERY" },
  { "rollNumber": 24, "name": "Premalata Kumari",    "class": "NURSERY" },
  { "rollNumber": 25, "name": "Anushka Kumari",      "class": "NURSERY" },
  { "rollNumber": 26, "name": "Arav Kumar",          "class": "NURSERY" },
  { "rollNumber": 27, "name": "Chhaya Kumari",       "class": "NURSERY" },
  { "rollNumber": 29, "name": "Aryan Kumar",        "class": "NURSERY" },
  { "rollNumber": 30, "name": "Abhishek Kumar",      "class": "NURSERY" },
  { "rollNumber": 31, "name": "Ravi Ranjan",      "class": "NURSERY" },
  { "rollNumber": 32, "name": "Nikita Kumari",       "class": "NURSERY" },
  { "rollNumber": 33, "name": "Pragati Kumari",       "class": "NURSERY" },

  { "rollNumber": 34, "name": "Mousam Kumari", "class": "NURSERY" },
  { "rollNumber": 35, "name": "Prince Kumar", "class": "NURSERY" },
  { "rollNumber": 36, "name": "Tulsi Kumari", "class": "NURSERY" },
  { "rollNumber": 37, "name": "Shree Ram", "class": "NURSERY" },
  { "rollNumber": 38, "name": "Sheetal Kumari", "class": "NURSERY" },
  { "rollNumber": 39, "name": "Satyajeet Kumar", "class": "NURSERY" },
  { "rollNumber": 40, "name": "Krishna Kumar", "class": "NURSERY" },
  { "rollNumber": 41, "name": "Priyanshu Kumar", "class": "NURSERY" },
  { "rollNumber": 43, "name": "Neha Kumari", "class": "NURSERY" },
  { "rollNumber": 44, "name": "Chandu Kumar", "class": "NURSERY" },
  { "rollNumber": 47, "name": "Ayush Kumar", "class": "NURSERY" },
  { "rollNumber": 48, "name": "Puja Kumari", "class": "NURSERY" },
  { "rollNumber": 49, "name": "Aradhya Kumari", "class": "NURSERY" },
  { "rollNumber": 50, "name": "Sumit Kumar", "class": "NURSERY" },
  { "rollNumber": 51, "name": "Dhananjay Kumar", "class": "NURSERY" },
  { "rollNumber": 52, "name": "Shubhchitak Kumar", "class": "NURSERY" },
  { "rollNumber": 53, "name": "Raj Priyadarshi", "class": "NURSERY" },
  { "rollNumber": 54, "name": "Ankush Kumar", "class": "NURSERY" },
  { "rollNumber": 55, "name": "Sonu Kumar", "class": "NURSERY" },
  { "rollNumber": 56, "name": "Anand Kumar", "class": "NURSERY" },
  { "rollNumber": 57, "name": "Kartik Kumar", "class": "NURSERY" },
  { "rollNumber": 58, "name": "Lakshya Kumar", "class": "NURSERY" },
  { "rollNumber": 59, "name": "Pushkar Kumar", "class": "NURSERY" },
  { "rollNumber": 60, "name": "Adarsh Kumar", "class": "NURSERY" }
]

async function seedStudents() {
  try {
    await connectDB(); // <-- using your existing DB connection
    await Student.insertMany(students);
    console.log("Students inserted successfully!");
  } catch (err) {
    console.log("Error inserting:", err);
  } finally {
    process.exit(); // close the script
  }
}

seedStudents();



