const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware - allow your frontend domain
app.use(
  cors({
    origin: [
      'http://localhost:5173', // Development
      'https://maxpublicschool.site', // Your production domain
      'https://www.maxpublicschool.site' // With www subdomain
    ],
    credentials: true
  })
)

app.use(express.json())

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    message: 'MPS Backend is running on Railway!',
    timestamp: new Date().toISOString(),
    status: 'healthy',
    allowedOrigins: [
      'https://maxpublicschool.site',
      'https://www.maxpublicschool.site'
    ]
  })
})

// Test data route
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'Backend is connected successfully to maxpublicschool.site!',
    data: {
      features: ['Contact Form', 'API Data', 'Real-time Updates'],
      status: 'operational'
    }
  })
})

// Contact form endpoint
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, message } = req.body

    console.log('Contact form received from maxpublicschool.site:', {
      name,
      email,
      message
    })

    // Simulate processing
    // Add your database logic here

    res.json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      received: { name, email, message }
    })
  } catch (error) {
    console.error('Contact form error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again.'
    })
  }
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  })
})

// Error handler
app.use((error, req, res, next) => {
  console.error('🔥 Server error:', error)
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  })
})

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`MPS Backend Server running on port ${PORT}`)
  console.log(`Configured for: maxpublicschool.site`)
  console.log(`Health: http://localhost:${PORT}/api/health`)
})
