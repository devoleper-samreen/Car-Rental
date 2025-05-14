import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import './App.css'
import CarList from './pages/CarList'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/list' element={<CarList />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
