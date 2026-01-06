import { BrowserRouter, Route, Routes } from 'react-router'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import './App.css'
import AllGallery from './pages/AllGallery'
import Root from './Root'
import Profile from './components/Profile'
import Notification from './pages/Notification'
import ResultPage from './pages/resutlPage'
import CheckResult from './pages/CheckResult'
import ClassResult from './pages/ClassResult'
import { ReportProvider } from './context/ReportContext'
import AdminLayout from './admin/layout/AdminLayout'
import Dashboard from './admin/pages/Dashboard'
import Students from './admin/pages/Students'
import Notices from './admin/pages/Notices'
import Reports from './admin/pages/Reports'
import BulkUpload from './admin/pages/BulkUpload'
import Settings from './admin/pages/Settings'
import Logout from './admin/pages/Logout'
import StudentProfile from './admin/pages/StudentProfile'

console.log(Toaster)
function App () {
  return (
    <ReportProvider>
      <Toaster
        position='top-right'
        toastOptions={{
          duration: 3000
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Root />}>
            <Route index element={<Home />} />
            <Route path='/teachers' element={<Profile />} />
            <Route path='/notification' element={<Notification />} />
            <Route path='/allgallery' element={<AllGallery />} />
            <Route path='/check-result' element={<CheckResult />} />
            <Route path='/result' element={<ResultPage />} />
            <Route path='/class-result' element={<ClassResult />} />
          </Route>

          <Route path='admin' element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='students' element={<Students />} />
            <Route path='students/:id' element={<StudentProfile />} />
            <Route path='notices' element={<Notices />} />
            <Route path='reports' element={<Reports />} />
            <Route path='bulk-upload' element={<BulkUpload />} />
            <Route path='settings' element={<Settings />} />
            <Route path='logout' element={<Logout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ReportProvider>
  )
}

export default App
