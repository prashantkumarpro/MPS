import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

import studentRoutes from './routes/studentRoutes.js'
import reportRoutes from './routes/reportRoutes.js'

dotenv.config()

const app = express()
app.use(express.json())

// Connect DB
connectDB()

// Routes
app.use('/api/student', studentRoutes)
app.use('/api/report', reportRoutes)

app.get('/', (req, res) => {
  res.send('MPS Backend Running')
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
