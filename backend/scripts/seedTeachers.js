import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../models/User.js'

dotenv.config()

const teachers = [
  {
    name: 'Alok Ratn',
    email: 'alok@mps.com',
    password: 'Teacher@123',
    role: 'admin'
  },
  {
    name: 'Shohel Akhtar',
    email: 'shohel@mps.com',
    password: 'Teacher@123',
    role: 'admin'
  },
  {
    name: 'Rajesh Ranjan',
    email: 'rajesh@mps.com',
    password: 'Teacher@123',
    role: 'teacher'
  },
  {
    name: 'Tamang',
    email: 'tamang@mps.com',
    password: 'Teacher@123',
    role: 'teacher'
  },
  {
    name: 'Tribhuvan Thakur',
    email: 'tribhuvan.thakur@mps.com',
    password: 'Teacher@123',
    role: 'teacher'
  },
  {
    name: 'Kanchan Kumari',
    email: 'kanchan@mps.com',
    password: 'Teacher@123',
    role: 'teacher'
  },
  {
    name: 'Meena Kumari',
    email: 'meena@mps.com',
    password: 'Teacher@123',
    role: 'teacher'
  },
  {
    name: 'Imaran Khan',
    email: 'imran@mps.com',
    password: 'Teacher@123',
    role: 'teacher'
  },
  {
    name: 'Bipin Kumar',
    email: 'bipin@mps.com',
    password: 'Teacher@123',
    role: 'teacher'
  },
  {
    name: 'Amresh Pandey',
    email: 'amresh@mps.com',
    password: 'Teacher@123',
    role: 'teacher'
  },
  {
    name: 'Switi Kumari',
    email: 'switi@mps.com',
    password: 'Teacher@123',
    role: 'teacher'
  },
  {
    name: 'Prashant Kumar',
    email: 'prashant@mps.com',
    password: 'Teacher@123',
    role: 'teacher'
  },
  {
    name: 'Puja Tamang',
    email: 'puja@mps.com',
    password: 'Teacher@123',
    role: 'teacher'
  },
  {
    name: 'Nitin Tamang',
    email: 'nitin@mps.com',
    password: 'Teacher@123',
    role: 'teacher'
  }
]

const seedTeachers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    for (const teacher of teachers) {
      const existingUser = await User.findOne({
        email: teacher.email
      })

      if (existingUser) {
        console.log(`${teacher.name} already exists`)
        continue
      }

      await new User(teacher).save()

      console.log(`${teacher.name} created`)
    }

    console.log('All teachers seeded successfully')
    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

seedTeachers()