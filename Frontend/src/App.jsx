import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import './App.css'
import CarList from './pages/CarList'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import AdminLogin from './pages/AdminLogin'
import AdminSignup from './pages/AdminSignup'
import UserDashboard from "./dashboard/UserDashboard"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<UserLogin />} />
          <Route path='/signup' element={<UserSignup />} />
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/admin/signup' element={<AdminSignup />} />
          <Route path='/user/dashboard' element={<UserDashboard />} />
          <Route path='/list' element={<CarList />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
