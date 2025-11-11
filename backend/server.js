import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 8000

// Middleware
app.use(cors())
app.use(express.json())

// Correct route with leading slash
app.get('/api/test', (req, res) => {
  res.json({
    message: 'MP5 Backend is running!',
    timestamp: new Date().toISOString()
  })
})

// Correct listen method - only port number
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
