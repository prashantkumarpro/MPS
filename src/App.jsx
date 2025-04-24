import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'
import './App.css'
import AllGallery from './pages/AllGallery'
import Root from './Root'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Root />}>
          <Route index element={<Home />} />
          <Route path='/allgallery' element={<AllGallery />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
