const API_BASE = import.meta.env.VITE_API_URL

// Fetch dashboard stats
export async function fetchStats () {
  try {
    const res = await fetch(`${API_BASE}/api/dashboard/stats`)

    if (!res.ok) {
      throw new Error('Failed to fetch dashboard stats')
    }

    const data = await res.json()

    return data
  } catch (error) {
    console.error('Dashboard API Error:', error)
    throw error
  }
}

// Fetch all notices
export async function fetchNotices() {
  const res = await fetch(`${API_BASE}/api/notices`);
  if (!res.ok) throw new Error("Failed to fetch notices");
  return await res.json();
}

// Fetch individual student report (TERM + YEAR wise)
export async function fetchReport ({
  studentClass,
  rollNumber,
  term,
  academicYear
}) {
  try {
    const response = await fetch(`${API_BASE}/api/report/view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        studentClass,
        rollNumber,
        term,
        academicYear
      })
    })

    // 🔐 safety check
    if (!response.ok) {
      const text = await response.text()
      throw new Error(text)
    }

    return await response.json()
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}

// Fetch class wise report
export async function fetchClassReport ({ className, term, academicYear }) {
  try {
    const query = new URLSearchParams({
      term,
      academicYear
    }).toString()

    const response = await fetch(
      `${API_BASE}/api/report/class/${className}?${query}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    return await response.json()
  } catch (error) {
    return { success: false, error: error.message }
  }
}
// Fetch students info
export async function fetchStudents ({
  page = 1,
  limit = 10,
  className = '',
  sort = ''
} = {}) {
  try {
    const params = new URLSearchParams()

    params.append('page', page)
    params.append('limit', limit)

    if (className) params.append('class', className)
    if (sort) params.append('sort', sort)

    const res = await fetch(`${API_BASE}/api/student?${params.toString()}`)

    return await res.json()
  } catch (error) {
    console.error(error)
    return { success: false, data: [], totalPages: 0 }
  }
}

// Get student by ID
export async function fetchStudentById (id) {
  const res = await fetch(`${API_BASE}/api/student/${id}`)
  return await res.json()
}

// Add new student
export async function addStudent (data) {
  const res = await fetch(`${API_BASE}/api/student/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  return await res.json()
}

// Update student
export async function updateStudent (id, data) {
  const res = await fetch(`${API_BASE}/api/student/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return await res.json()
}

// Delete Student
export async function deleteStudent (id) {
  const res = await fetch(`${API_BASE}/api/student/${id}`, {
    method: 'DELETE'
  })
  return await res.json()
}

// Delete notice
export async function deleteNotice(id) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token");
  }

  const res = await fetch(`${API_BASE}/api/notices/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  // 🔥 handle expired token
  if (
    data.message === "Not authorized, token invalid" ||
    data.message === "jwt expired"
  ) {
    localStorage.clear();
    window.location.href = "/login";
    throw new Error("Session expired");
  }

  if (!res.ok) {
    throw new Error(data.message || "Delete failed");
  }

  return data;
}

// Edit notice
export async function updateNotice(id, editData) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Please login again");
  }

  const res = await fetch(`${API_BASE}/api/notices/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(editData),
  });

  const data = await res.json();

  // 🔥 handle expired token
  if (
    data.message === "Not authorized, token invalid" ||
    data.message === "jwt expired"
  ) {
    localStorage.clear();
    window.location.href = "/login";
    throw new Error("Session expired");
  }

  if (!res.ok) {
    throw new Error(data.message || "Update failed");
  }

  return data;
}