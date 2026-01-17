import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-indigo-950">
      <div className="flex flex-col justify-center gap-2 items-center bg-cyan-900/20 w-2/3 h-100 rounded-[3rem] border-cyan-900 border-1 p-5">  
        <div className="text-white text-4xl font-bold mb-8">
          URL Shortener
        </div>
        <div className="flex flex-col bg-white w-full rounded-[2.5rem] p-7 h-[75%]">
          <h3 className="text-3xl font-semibold">Shorten a long URL</h3>
          <p className="mt-2">Make your link easier to share.</p>
        </div>
      </div>
    </div>

  )
}

export default App
