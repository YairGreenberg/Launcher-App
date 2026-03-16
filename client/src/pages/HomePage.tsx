import React from 'react'
import useAuthStore from '../store/authStore'
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const {token} = useAuthStore();
  const navigate = useNavigate();
    
  return (
    <div>
      <div>
        <h1>Launcher System</h1>
      </div>
      <div>
        <h4>Launcher management</h4>
      </div>
      <button onClick={()=> navigate(token ? '/launcher' : '/auth')}>
        {token ? 'conect' : 'register'}

      </button>
      
    </div>
  )
}

export default HomePage
