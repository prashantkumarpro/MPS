import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'
import './App.css'
import AllGallery from './pages/AllGallery'
import Root from './Root'
import Profile from './components/Profile'
import Notification from './pages/Notification'
import ResultPage from './pages/resutlPage'
import AdminLayout from './pages/admin/Dashboard'
import CheckResult from './pages/CheckResult'
import { ReportProvider } from './context/ReportContext'

function App () {
  return (
    <ReportProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Root />}>
            <Route index element={<Home />} />
            <Route path='/teachers' element={<Profile />} />
            <Route path='/notification' element={<Notification />} />
            <Route path='/allgallery' element={<AllGallery />} />
            <Route path='/check-result' element={<CheckResult />} />
            <Route path='/result' element={<ResultPage />} />
            <Route path='/admin' element={<AdminLayout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ReportProvider>
  )
}

export default App
