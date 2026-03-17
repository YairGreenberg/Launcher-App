import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useAuth } from '../components/useContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function LoginPage() {
  const [username,setUsername] =useState('')
  const [password,setPassword] = useState('')
  const authContext = useAuth()
  const {login} = authContext || {login: ()=>{}}
  const navigate = useNavigate()

  const hndaleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try{
      const {data} = await axios.post('http://localhost:5011/api/auth/login',{
        username,password
      })
    
      login(data.token, data.user.username, data.user.user_type)
      navigate('/launchers')
    }catch(error){
      console.error(error)
    }
    
  }
  return (
    <div>
      <Navbar></Navbar>
      <div>
        <hr />
        <h2>connection</h2>
        <form onSubmit={hndaleSubmit}>
          <input type="text"
          placeholder='user name'
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          required
          />
          <br />
          <input type="password"
          placeholder='password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
          />
          <br />
          <button type='submit'>login</button>
        </form>
      </div>
      
    </div>
  )
}

export default LoginPage
