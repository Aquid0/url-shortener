import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './Home/Home.jsx'
import { Redirect } from './Redirect/Redirect.jsx'
import { NotFound } from './NotFound/NotFound.jsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/:code" element={<Redirect />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
