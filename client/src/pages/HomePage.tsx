import React from 'react'
import useAuthStore from '../store/authStore'

function HomePage() {
  const {token} = useAuthStore();
    
  return (
    <div>
      <div>
        <h1>Launcher System</h1>
      </div>
      <div>
        <h4>Launcher management</h4>
      </div>
      <button>
        
      </button>
      
    </div>
  )
}

export default HomePage
