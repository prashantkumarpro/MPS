import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../models/User.js'

dotenv.config()

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    const existingAdmin = await User.findOne({
      email: 'mpsadmin@mps.com'
    })

    if (existingAdmin) {
      console.log('Admin already exists')
      process.exit()
    }

    const admin = new User({
      name: 'devPrashant',
      email: 'mpsadmin@mps.com',
      // password: '',
      role: 'admin'
    })

    await admin.save()

    console.log('Admin created successfully')
    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

createAdmin()