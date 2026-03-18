import React from 'react'
import { useAuth } from './useContext'
import { useNavigate } from 'react-router-dom'

interface Props {
    children: React.ReactNode,

}

function ProtectedRoute({children}:Props) {
    const navigate = useNavigate()
    const token = useAuth()?.token
    if(!token){
        navigate('/login')
    }
  return (
    <div>
        {children}
      
    </div>
  )
}

export default ProtectedRoute
