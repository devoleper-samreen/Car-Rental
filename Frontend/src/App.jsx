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
import { Toaster } from "react-hot-toast";
import UserProtectedRoute from './UserProtectedRoute'
import AdminProtectedRoute from './AdminProtectedRoute'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentFailed from './pages/PaymentFail'


function App() {

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/list' element={<CarList />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />

          //User
          <Route path='/user/login' element={<UserLogin />} />
          <Route path='/user/signup' element={<UserSignup />} />
          <Route
            path="/user/dashboard"
            element={
              <UserProtectedRoute>
                <UserDashboard />
              </UserProtectedRoute>
            }
          />


          //Admin
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/admin/signup' element={<AdminSignup />} />
          <Route path='/admin/dashboard'
            element={<AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path='manage-cars' element={<ManageCars />} />
            <Route path='manage-users' element={<ManageUsers />} />
            <Route path='manage-bookings' element={<ManageBookings />} />
            <Route path='reports' element={<Reports />} />
            <Route path='setting' element={<Setting />} />
          </Route>

        </Routes>
      </Router>
    </>
  )
}

export default App
