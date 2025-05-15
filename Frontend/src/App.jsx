import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import './App.css'
import CarList from './pages/CarList'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<UserLogin />} />
          <Route path='/signup' element={<UserSignup />} />
          <Route path='/list' element={<CarList />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
