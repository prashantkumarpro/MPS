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

// Student Data (UKGB)


// Student Data (Nursery)
// const students = [
//   { "rollNumber": 1,  "name": "Shivangi Kumari",      "class": "NURSERY" },
//   { "rollNumber": 2,  "name": "Harekrishna",     "class": "NURSERY" },
//   { "rollNumber": 3,  "name": "Arohi Kumari",      "class": "NURSERY" },
//   { "rollNumber": 6,  "name": "Amit Kumar",          "class": "NURSERY" },
//   { "rollNumber": 7,  "name": "Ansh Kumar",          "class": "NURSERY" },
//   { "rollNumber": 8,  "name": "Vivek Kumar",         "class": "NURSERY" },
//   { "rollNumber": 9,  "name": "Kiska Kumari",        "class": "NURSERY" },
//   { "rollNumber": 10, "name": "Satyam Kumar",        "class": "NURSERY" },
//   { "rollNumber": 11, "name": "Prashant Kumar",      "class": "NURSERY" },
//   { "rollNumber": 12, "name": "Rishav Kumar",        "class": "NURSERY" },
//   { "rollNumber": 13, "name": "Kishor Kumar",        "class": "NURSERY" },
//   { "rollNumber": 14, "name": "Ankush Kumar",       "class": "NURSERY" },
//   { "rollNumber": 15, "name": "Nithu Kumari",         "class": "NURSERY" },
//   { "rollNumber": 16, "name": "Roushan Kumar",       "class": "NURSERY" },
//   { "rollNumber": 17, "name": "Harshit Kumar",       "class": "NURSERY" },
//   { "rollNumber": 18, "name": "Chirag Kumar",        "class": "NURSERY" },
//   { "rollNumber": 19, "name": "Prince Kumar",        "class": "NURSERY" },
//   { "rollNumber": 20, "name": "Karanjeet",       "class": "NURSERY" },
//   { "rollNumber": 21, "name": "Rishav Kumar",        "class": "NURSERY" },
//   { "rollNumber": 24, "name": "Premalata Kumari",    "class": "NURSERY" },
//   { "rollNumber": 25, "name": "Anushka Kumari",      "class": "NURSERY" },
//   { "rollNumber": 26, "name": "Arav Kumar",          "class": "NURSERY" },
//   { "rollNumber": 27, "name": "Chhaya Kumari",       "class": "NURSERY" },
//   { "rollNumber": 29, "name": "Aryan Kumar",        "class": "NURSERY" },
//   { "rollNumber": 30, "name": "Abhishek Kumar",      "class": "NURSERY" },
//   { "rollNumber": 31, "name": "Ravi Ranjan",      "class": "NURSERY" },
//   { "rollNumber": 32, "name": "Nikita Kumari",       "class": "NURSERY" },
//   { "rollNumber": 33, "name": "Pragati Kumari",       "class": "NURSERY" },

//   { "rollNumber": 34, "name": "Mousam Kumari", "class": "NURSERY" },
//   { "rollNumber": 35, "name": "Prince Kumar", "class": "NURSERY" },
//   { "rollNumber": 36, "name": "Tulsi Kumari", "class": "NURSERY" },
//   { "rollNumber": 37, "name": "Shree Ram", "class": "NURSERY" },
//   { "rollNumber": 38, "name": "Sheetal Kumari", "class": "NURSERY" },
//   { "rollNumber": 39, "name": "Satyajeet Kumar", "class": "NURSERY" },
//   { "rollNumber": 40, "name": "Krishna Kumar", "class": "NURSERY" },
//   { "rollNumber": 41, "name": "Priyanshu Kumar", "class": "NURSERY" },
//   { "rollNumber": 43, "name": "Neha Kumari", "class": "NURSERY" },
//   { "rollNumber": 44, "name": "Chandu Kumar", "class": "NURSERY" },
//   { "rollNumber": 47, "name": "Ayush Kumar", "class": "NURSERY" },
//   { "rollNumber": 48, "name": "Puja Kumari", "class": "NURSERY" },
//   { "rollNumber": 49, "name": "Aradhya Kumari", "class": "NURSERY" },
//   { "rollNumber": 50, "name": "Sumit Kumar", "class": "NURSERY" },
//   { "rollNumber": 51, "name": "Dhananjay Kumar", "class": "NURSERY" },
//   { "rollNumber": 52, "name": "Shubhchitak Kumar", "class": "NURSERY" },
//   { "rollNumber": 53, "name": "Raj Priyadarshi", "class": "NURSERY" },
//   { "rollNumber": 54, "name": "Ankush Kumar", "class": "NURSERY" },
//   { "rollNumber": 55, "name": "Sonu Kumar", "class": "NURSERY" },
//   { "rollNumber": 56, "name": "Anand Kumar", "class": "NURSERY" },
//   { "rollNumber": 57, "name": "Kartik Kumar", "class": "NURSERY" },
//   { "rollNumber": 58, "name": "Lakshya Kumar", "class": "NURSERY" },
//   { "rollNumber": 59, "name": "Pushkar Kumar", "class": "NURSERY" },
//   { "rollNumber": 60, "name": "Adarsh Kumar", "class": "NURSERY" }
// ]

// Student Data (PG)
// const students = [
//   { rollNumber: 1,  name: "Raunak Kumar",       class: "PG" },
//   { rollNumber: 2,  name: "Krishna Kumar",      class: "PG" },
//   { rollNumber: 3,  name: "Anubhav Kumar",      class: "PG" },
//   { rollNumber: 4,  name: "Altamas Raja",       class: "PG" },
//   { rollNumber: 6,  name: "Sachin Kumar",       class: "PG" },
//   { rollNumber: 7,  name: "Chikku Kumar",       class: "PG" },
//   { rollNumber: 9,  name: "Ganesh Kumar",       class: "PG" },
//   { rollNumber: 11, name: "Mahaveer Kumar",     class: "PG" },
//   { rollNumber: 12, name: "Nikhil Kumar",       class: "PG" },
//   { rollNumber: 13, name: "Sonali Kumari",      class: "PG" },
//   { rollNumber: 17, name: "Vaibhav Nayan",      class: "PG" },
//   { rollNumber: 19, name: "Ananya Patel",       class: "PG" },
//   { rollNumber: 20, name: "Ladly Kumari",       class: "PG" },
//   { rollNumber: 21, name: "Swastik Kumari",     class: "PG" },
//   { rollNumber: 22, name: "Sonakshi Kumari",    class: "PG" },
//   { rollNumber: 27, name: "Tuktuk Kumar",       class: "PG" },
//   { rollNumber: 29, name: "Manvi Kumari",       class: "PG" },
//   { rollNumber: 30, name: "Nishant Kumar",      class: "PG" },
//   { rollNumber: 31, name: "Om jee",             class: "PG" },
//   { rollNumber: 32, name: "Anshika Kumari",     class: "PG" },
//   { rollNumber: 34, name: "Sweta Kumari",       class: "PG" },
//   { rollNumber: 37, name: "Sagar Kumar",        class: "PG" },
//   { rollNumber: 38, name: "Ayush Kumar",        class: "PG" },
//   { rollNumber: 39, name: "Shubham Kumar",      class: "PG" },
//   { rollNumber: 41, name: "Rajo Kumari",        class: "PG" },
//   { rollNumber: 43, name: "Shraiyansh Kumar",   class: "PG" },
//   { rollNumber: 45, name: "Deepak Yadav",       class: "PG" },
//   { rollNumber: 46, name: "Dhiraj Kumar",       class: "PG" },
//   { rollNumber: 47, name: "Priyanshu Kumar",    class: "PG" },
//   { rollNumber: 48, name: "Golu Kumar",         class: "PG" },
//   { rollNumber: 49, name: "Bharti Kumari",      class: "PG" },
//   { rollNumber: 50, name: "Aryan Alam",         class: "PG" },
//   { rollNumber: 52, name: "Vaishnavi Kumari",   class: "PG" },
//   { rollNumber: 56, name: "Arman Alam",         class: "PG" },
//   { rollNumber: 57, name: "Altaf Raja",         class: "PG" },
//   { rollNumber: 59, name: "Manprit Kumar",      class: "PG" },
//   { rollNumber: 60, name: "Ayush Kumar",        class: "PG" }
// ];

// Student Data (I)
// const students = [
//   { "name": "Rishabh Kumar", "class": "I", "rollNumber": 1 },
//   { "name": "Payal Kumari", "class": "I", "rollNumber": 4 },
//   { "name": "Ritik Raj", "class": "I", "rollNumber": 5 },
//   { "name": "Abhilasha Kumari", "class": "I", "rollNumber": 7 },
//   { "name": "Abhishek Kumar", "class": "I", "rollNumber": 8 },
//   { "name": "Himanshu Kumar", "class": "I", "rollNumber": 9 },
//   { "name": "Pallavi Kumari", "class": "I", "rollNumber": 10 },
//   { "name": "Aaradhya Kumari", "class": "I", "rollNumber": 11 },
//   { "name": "Sujeet Kumar", "class": "I", "rollNumber": 12 },
//   { "name": "Harsh Kumar", "class": "I", "rollNumber": 13 },
//   { "name": "Ankit Kumar", "class": "I", "rollNumber": 14 },
//   { "name": "Kunal Kumar", "class": "I", "rollNumber": 15 },
//   { "name": "Gurusharan Kumar", "class": "I", "rollNumber": 16 },
//   { "name": "Md Samir Alam", "class": "I", "rollNumber": 17 },
//   { "name": "Mahi Kumari", "class": "I", "rollNumber": 19 },
//   { "name": "Srishti Kumari", "class": "I", "rollNumber": 20 },
//   { "name": "Ritik Kumar", "class": "I", "rollNumber": 22 },
//   { "name": "Sneha Kumari", "class": "I", "rollNumber": 23 },
//   { "name": "Gulshan Kumar", "class": "I", "rollNumber": 24 },
//   { "name": "Beauti Kumari", "class": "I", "rollNumber": 25 },
//   { "name": "Juhi Kumari", "class": "I", "rollNumber": 26 },
//   { "name": "Dilkhush Kumar", "class": "I", "rollNumber": 27 },
//   { "name": "Mayank Kumar", "class": "I", "rollNumber": 28 },
//   { "name": "Resham Kumari", "class": "I", "rollNumber": 29 },
//   { "name": "Abhinav Kumar", "class": "I", "rollNumber": 30 },
//   { "name": "Sonu Kumar", "class": "I", "rollNumber": 32 },
//   { "name": "Aniket Kumar", "class": "I", "rollNumber": 33 },
//   { "name": "Satyam Kumar", "class": "I", "rollNumber": 34 },

//    { "name": "Khushboo Kumari", "class": "I", "rollNumber": 35 },
//   { "name": "Rajnish Kumar", "class": "I", "rollNumber": 36 },
//   { "name": "Rohit Kumar", "class": "I", "rollNumber": 37 },
//   { "name": "Krishna Kumar", "class": "I", "rollNumber": 38 },
//   { "name": "Alok Kumar", "class": "I", "rollNumber": 39 },
//   { "name": "Nishu Kumari", "class": "I", "rollNumber": 40 },
//   { "name": "Niharika Kumari", "class": "I", "rollNumber": 41 },
//   { "name": "Ayush Kumar", "class": "I", "rollNumber": 42 },
//   { "name": "Utkarsh Raj", "class": "I", "rollNumber": 43 },
//   { "name": "Nishant Kumar", "class": "I", "rollNumber": 44 },
//   { "name": "Shivam Kumar", "class": "I", "rollNumber": 45 },
//   { "name": "Sozal Kumari", "class": "I", "rollNumber": 46 },
//   { "name": "Ayush Kumar", "class": "I", "rollNumber": 47 },
//   { "name": "Aman Kumar", "class": "I", "rollNumber": 48 },
//   { "name": "Sinu Kumari", "class": "I", "rollNumber": 49 },
//   { "name": "Shivam Kumar", "class": "I", "rollNumber": 50 },
//   { "name": "Md Rohit Alam", "class": "I", "rollNumber": 51 },
//   { "name": "Abhinandan Kumar", "class": "I", "rollNumber": 52 },


  
// ]

// Student Data (II)
//  const students = [
//   { "name": "Sawan Kumar", "class": "II", "rollNumber": 1 },
//   { "name": "Pritam Kumar", "class": "II", "rollNumber": 2 },
//   { "name": "Piyush Kumar", "class": "II", "rollNumber": 3 },
//   { "name": "Piyush Kumar", "class": "II", "rollNumber": 5 },
//   { "name": "Taniya Parveen", "class": "II", "rollNumber": 6 },
//   { "name": "Pari Kumari", "class": "II", "rollNumber": 7 },
//   { "name": "Anuradha Kumari", "class": "II", "rollNumber": 8 },
//   { "name": "Ask Kumari", "class": "II", "rollNumber": 9 },
//   { "name": "Priyam Kumar", "class": "II", "rollNumber": 10 },
//   { "name": "Sonal Bharti", "class": "II", "rollNumber": 11 },
//   { "name": "Aarav Kumar", "class": "II", "rollNumber": 12 },
//   { "name": "Minakshi Kumari", "class": "II", "rollNumber": 13 },
//   { "name": "Jitendra Kumar", "class": "II", "rollNumber": 14 },
//   { "name": "Shrishti Kumari", "class": "II", "rollNumber": 15 },
//   { "name": "Divyanshu Kumar", "class": "II", "rollNumber": 16 },
//   { "name": "Rupesh Kumar", "class": "II", "rollNumber": 17 },
//   { "name": "Zaid Raja", "class": "II", "rollNumber": 18 },
//   { "name": "Sudhanshu Kumar", "class": "II", "rollNumber": 19 },
//   { "name": "Ahil Raja", "class": "II", "rollNumber": 20 },
//   { "name": "Amar Kumar", "class": "II", "rollNumber": 21 },
//   { "name": "Nikki Kumari", "class": "II", "rollNumber": 22 },
//   { "name": "Pallavi Kumari", "class": "II", "rollNumber": 23 },
//   { "name": "Anshu Kumari", "class": "II", "rollNumber": 24 },
//   { "name": "Priya Rani", "class": "II", "rollNumber": 25 },
//   { "name": "Soaib Malik", "class": "II", "rollNumber": 26 },
//   { "name": "Priyanshu Kumar", "class": "II", "rollNumber": 27 },
//   { "name": "Roshan Kumar", "class": "II", "rollNumber": 29 },
//   { "name": "Swati Kumari", "class": "II", "rollNumber": 30 },
//   { "name": "Gungun Kumari", "class": "II", "rollNumber": 31 },
//   { "name": "Tanmay Kumar", "class": "II", "rollNumber": 32 },
//   { "name": "Priyanshu Kumar", "class": "II", "rollNumber": 33 }
// ];

// Student Data (III)
// const students = [
//   { "name": "Sonakshi Yadav", "class": "III", "rollNumber": 1 },
//   { "name": "Rashni Yadav", "class": "III", "rollNumber": 3 },
//   { "name": "Sakshi Kumari", "class": "III", "rollNumber": 4 },
//   { "name": "Sonakshi Kumari", "class": "III", "rollNumber": 5 },
//   { "name": "Dipanshi Kumari", "class": "III", "rollNumber": 6 },
//   { "name": "Priyal Kumari", "class": "III", "rollNumber": 7 },
//   { "name": "Ritika Ranjan", "class": "III", "rollNumber": 8 },
//   { "name": "Raj Lakhami", "class": "III", "rollNumber": 9 },
//   { "name": "Stuti Priya", "class": "III", "rollNumber": 10 },
//   { "name": "Bhawana Kumari", "class": "III", "rollNumber": 11 },
//   { "name": "Sushant Kumar", "class": "III", "rollNumber": 12 },
//   { "name": "Ramanand Kumar", "class": "III", "rollNumber": 13 },
//   { "name": "Abhishek Kumar", "class": "III", "rollNumber": 14 },
//   { "name": "Shivam Kumar", "class": "III", "rollNumber": 16 },
//   { "name": "Ashish Kumar", "class": "III", "rollNumber": 17 },
//   { "name": "Divya Kumari", "class": "III", "rollNumber": 19 },
//   { "name": "Anushka Kumari", "class": "III", "rollNumber": 21 },
//   { "name": "Jwala Kumari", "class": "III", "rollNumber": 22 },
//   { "name": "Raj Nandani", "class": "III", "rollNumber": 24 },
//   { "name": "Riya Yadav", "class": "III", "rollNumber": 25 },
//   { "name": "Juli Kumari", "class": "III", "rollNumber": 26 },
//   { "name": "Dhani Kumari", "class": "III", "rollNumber": 27 },
//   { "name": "Dipti Priya", "class": "III", "rollNumber": 28 },
//   { "name": "Aiyush Kumar", "class": "III", "rollNumber": 29 },
//   { "name": "Jyotish Kumar", "class": "III", "rollNumber": 31 },
//   { "name": "Piyush Kumar", "class": "III", "rollNumber": 32 },
//   { "name": "Aditya Kumar", "class": "III", "rollNumber": 34 },
//   { "name": "Kunal Kumar", "class": "III", "rollNumber": 36 },

//   { "name": "Tannu Priya", "class": "III", "rollNumber": 37 },
//   { "name": "Isha Priya", "class": "III", "rollNumber": 38 },
//   { "name": "Karnal Raj", "class": "III", "rollNumber": 39 },
//   { "name": "Sakshi Kumari", "class": "III", "rollNumber": 40 },
//   { "name": "Stuti Kumari", "class": "III", "rollNumber": 41 },
//   { "name": "Riddhi Kumari", "class": "III", "rollNumber": 42 },
//   { "name": "Sagar Kumar", "class": "III", "rollNumber": 43 },
// ];

// Student Data (IV)
// const students = [
//   { "rollNumber": 1, "name": "Minakshi Sharma", "class": "IV" },
//   { "rollNumber": 2, "name": "Sweta Rani", "class": "IV" },
//   { "rollNumber": 3, "name": "Ankita Kumari", "class": "IV" },
//   { "rollNumber": 4, "name": "Kaynath Mirza", "class": "IV" },
//   { "rollNumber": 5, "name": "Sangita Kumari", "class": "IV" },
//   { "rollNumber": 6, "name": "Mahi Priya", "class": "IV" },
//   { "rollNumber": 7, "name": "Prince Kumar", "class": "IV" },
//   { "rollNumber": 8, "name": "Honey Kumari", "class": "IV" },
//   { "rollNumber": 9, "name": "Akriti Kumari", "class": "IV" },
//   { "rollNumber": 10, "name": "Pihu Kumari", "class": "IV" },
//   { "rollNumber": 11, "name": "Varsha Kumari", "class": "IV" },
//   { "rollNumber": 12, "name": "Aryan Kumar", "class": "IV" },
//   { "rollNumber": 13, "name": "Aayu Kumar", "class": "IV" },
//   { "rollNumber": 14, "name": "Satyam Kumar", "class": "IV" },
//   { "rollNumber": 18, "name": "Anamika Priya", "class": "IV" },
//   { "rollNumber": 19, "name": "Simran Kumari", "class": "IV" },
//   { "rollNumber": 20, "name": "Nisha Kumari", "class": "IV" },
//   { "rollNumber": 21, "name": "Suhani Kumari", "class": "IV" },
//   { "rollNumber": 22, "name": "Shaddab Alam", "class": "IV" },
//   { "rollNumber": 23, "name": "Ankit Kumar", "class": "IV" },
//   { "rollNumber": 24, "name": "Beauti Kumari", "class": "IV" }
// ]

// Student Data (V)
const students = [
  {"name":"Sonakshi Sharma", "class":"V", "rollNumber":1},
  {"name":"Astha Tomar", "class":"V", "rollNumber":2},
  {"name":"Aryaveer", "class":"V", "rollNumber":3},
  {"name":"Sapna Yadav", "class":"V", "rollNumber":4},
  {"name":"Dristi Priya", "class":"V", "rollNumber":6},
  {"name":"Pushkar Kumar", "class":"V", "rollNumber":7},
  {"name":"Aekta Kumari", "class":"V", "rollNumber":9},
  {"name":"Arav Gupta", "class":"V", "rollNumber":10},
  {"name":"Ansh Raj", "class":"V", "rollNumber":11},
  {"name":"Yash Raj", "class":"V", "rollNumber":12},
  {"name":"Raunak Kumar", "class":"V", "rollNumber":13},
  {"name":"Smriti Kumari", "class":"V", "rollNumber":14},
  {"name":"Manprit Kumar", "class":"V", "rollNumber":16},
  {"name":"Adiba Khanam", "class":"V", "rollNumber":15},
  {"name":"Ansh Singh", "class":"V", "rollNumber":17},
  {"name":"Vaishnavi Kumari", "class":"V", "rollNumber":18},
  {"name":"Sakshi Singh", "class":"V", "rollNumber":20},
 
]

// Student Data (VI)
// const students = [
//     { "name": "Anshuman Kumar", "class": "VI", "rollNumber": 1 },
//     { "name": "Adarsh Kumar", "class": "VI", "rollNumber": 2 },
//     { "name": "Naitik Kumar", "class": "VI", "rollNumber": 3 },
// ]

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



