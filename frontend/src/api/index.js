const API_BASE = import.meta.env.VITE_API_URL

export async function fetchReport (data) {
  try {
    const response = await fetch(`${API_BASE}/api/report/view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    return await response.json()
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export async function fetchClassReport ({ className }) {
  try {
    const response = await fetch(`${API_BASE}/api/report/class/${className}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return await response.json()
  } catch (error) {
    return { success: false, error: error.message }
  }
}
