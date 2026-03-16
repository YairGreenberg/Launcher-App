import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<HomePage/>}></Route>
      <Route path='/auth' element={<AuthPage/>}></Route>

    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
