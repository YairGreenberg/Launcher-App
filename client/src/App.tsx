import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './components/useContext';
// import { AuthProvider } from './components/useContext';

function App() {

  return (
    <>

      <BrowserRouter>
       <AuthProvider>

          <Routes>
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/auth' element={<AuthPage />}></Route>

          </Routes>
       </AuthProvider>
      


      </BrowserRouter>

    </>
  )
}

export default App
