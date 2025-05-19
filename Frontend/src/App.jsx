import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import './App.css'
import CarList from './pages/CarList'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import AdminLogin from './pages/AdminLogin'
import AdminSignup from './pages/AdminSignup'
import UserDashboard from "./dashboard/UserDashboard"
import AdminDashboard from "./dashboard/AdminDashboard"
import ManageCars from "./pages/ManageCars"
import ManageUsers from "./pages/ManageUsers"
import Dashboard from "./pages/Dashboard"
import ManageBookings from "./pages/ManageBookings"
import Reports from "./pages/Reports"
import Setting from "./pages/Setting"

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

          <Route path='/admin/dashboard' element={<AdminDashboard />}>
            <Route index element={<Dashboard />} />
            <Route path='manage-cars' element={<ManageCars />} />
            <Route path='manage-users' element={<ManageUsers />} />
            <Route path='manage-bookings' element={<ManageBookings />} />
            <Route path='reports' element={<Reports />} />
            <Route path='setting' element={<Setting />} />
          </Route>

          <Route path='/list' element={<CarList />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
