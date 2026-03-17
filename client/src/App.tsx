import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './components/useContext';
import LauncherPage from './pages/LauncherPage';
import AddLauncherPage from './pages/AddLauncherPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    <>

      <BrowserRouter>
        <AuthProvider>

          <Routes>
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='/launchers' element={<ProtectedRoute><HomePage /></ProtectedRoute>}></Route>
            <Route path='/launchers/add' element={<ProtectedRoute><AddLauncherPage /></ProtectedRoute>}></Route>
            <Route path='/launchers/:id' element={<ProtectedRoute><LauncherPage /></ProtectedRoute>}></Route>
            <Route path='/register' element={<ProtectedRoute><RegisterPage /></ProtectedRoute>}></Route>

          </Routes>
        </AuthProvider>



      </BrowserRouter>

    </>
  )
}

export default App
