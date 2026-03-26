const API_BASE = import.meta.env.VITE_API_URL

// ===============================
// LOGIN USER (ADMIN / TEACHER / STUDENT)
// ===============================
export async function loginUser(credentials) {
  try {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Login failed'
      }
    }

    // 🔥 IMPORTANT: Save token
    if (data.token) {
      localStorage.setItem('token', data.token)
    }

    return data
  } catch (error) {
    return {
      success: false,
      message: error.message
    }
  }
}

// ===============================
// GET CURRENT USER (TOKEN VALIDATION)
// ===============================
export async function getCurrentUser(token) {
  try {
    const response = await fetch(`${API_BASE}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Failed to fetch user'
      }
    }

    return data
  } catch (error) {
    return {
      success: false,
      message: error.message
    }
  }
}
