import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Student from "../models/Student.js";

dotenv.config();

// Student Data (UKGA)
const students = [
  { "name": "Sunny Kumar", "class": "UKGA", "rollNumber": 1 },
  { "name": "Satyajeet Kumar", "class": "UKGA", "rollNumber": 2 },
  { "name": "Anshu Kumari", "class": "UKGA", "rollNumber": 3 },
  { "name": "Saiyam Kumar", "class": "UKGA", "rollNumber": 4 },
  { "name": "Rohit Kumar", "class": "UKGA", "rollNumber": 5 },
  { "name": "Astha Kumari", "class": "UKGA", "rollNumber": 6 },
  { "name": "Divyanshi Kumari", "class": "UKGA", "rollNumber": 7 },
  { "name": "Divyanshu Kumar", "class": "UKGA", "rollNumber": 8 },
  { "name": "Rishu Priya", "class": "UKGA", "rollNumber": 9 },
  { "name": "Arushi Kumari", "class": "UKGA", "rollNumber": 10 },
  { "name": "Rahul Kumar", "class": "UKGA", "rollNumber": 11 },
  { "name": "Naina Kumari", "class": "UKGA", "rollNumber": 12 },
  { "name": "Pandey Kumar", "class": "UKGA", "rollNumber": 13 },
  { "name": "Anand Kumar", "class": "UKGA", "rollNumber": 14 },
  { "name": "Samvi Priya", "class": "UKGA", "rollNumber": 15 },
  { "name": "Shilpi Kumari", "class": "UKGA", "rollNumber": 16 },
  { "name": "Adarsh Kumar", "class": "UKGA", "rollNumber": 17 },
  { "name": "Aman Kumar", "class": "UKGA", "rollNumber": 18 },
  { "name": "Simran Kumari", "class": "UKGA", "rollNumber": 19 },
  { "name": "Mamta Kumari", "class": "UKGA", "rollNumber": 20 },
  { "name": "Aditi Bharti", "class": "UKGA", "rollNumber": 21 },
  { "name": "Sonam Kumari", "class": "UKGA", "rollNumber": 22 },
  { "name": "Sonam Kumari", "class": "UKGA", "rollNumber": 23 },
  { "name": "Monika Kumari", "class": "UKGA", "rollNumber": 24 },
  { "name": "Moni Kumari", "class": "UKGA", "rollNumber": 25 },
  { "name": "Varsha Kumari", "class": "UKGA", "rollNumber": 26 },
  { "name": "ManKhush Kumar", "class": "UKGA", "rollNumber": 36 },
  { "name": "Dilkhush Kumar", "class": "UKGA", "rollNumber": 37 }
];

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



