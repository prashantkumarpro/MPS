import { createContext, useState } from 'react'

export const ReportContext = createContext()

export function ReportProvider ({ children }) {
  const [student, setStudent] = useState(null)
  const [report, setReport] = useState(null)

  return (
    <ReportContext.Provider value={{ student, report, setStudent, setReport }}>
      {children}
    </ReportContext.Provider>
  )
}
