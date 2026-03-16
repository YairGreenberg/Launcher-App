import React, { useEffect, useState } from 'react'
import useAuthStore from '../store/authStore'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { type Launcher } from '../types/type-index'
import LaunchersTable from '../components/LaunchersTable';

function HomePage() {
  const [launchers,setLaunchers] = useState<Launcher[]>([])
  const {token} = useAuthStore();
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchLaunchers = async ()=>{
      try{
        const res = await axios.get('http://localhost:5011/api/launchers');
        setLaunchers(res.data.launchers)

      }catch(error){
        console.error(error)
      }
    }
    fetchLaunchers()
  },[])
    
  return (
    <div>
      <div>
        <h1>Launcher System</h1>
      </div>
      <div>
        <h4>Launcher management</h4>
      </div>
      {/* <button onClick={()=> navigate(token ? '/launcher' : '/auth')}>
        {token ? 'conect' : 'register'}
      </button> */}
      <h2>All launchers</h2>
      <LaunchersTable launchers={launchers}/>

      
    </div>
  )
}

export default HomePage
