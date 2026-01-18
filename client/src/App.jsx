import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './Home/Home.jsx'
import { NotFound } from './NotFound/NotFound.jsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
