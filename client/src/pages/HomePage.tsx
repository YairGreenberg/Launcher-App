import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { type Launcher } from '../types/type-index'
import LaunchersTable from '../components/LaunchersTable';
import Navbar from '../components/Navbar';
import { useAuth } from '../components/useContext';

function HomePage() {
  const [launchers, setLaunchers] = useState<Launcher[]>([])
  const token = useAuth()?.token
  const username = useAuth()?.username
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLaunchers = async () => {
      try {
        const res = await axios.get('http://localhost:5011/api/launchers', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setLaunchers(res.data.launchers)

      } catch (error) {
        console.error(error)
      }
    }
    fetchLaunchers()
  }, [])
  console.log(launchers)

  return (
    <div>
      <Navbar></Navbar>
      <div>
        <h1>Launcher System</h1>
      </div>
      <div>
        <h4>Launcher management</h4>
        <div>
          <span>Hello {username}</span>
        </div>
        <div>
          <button onClick={() => navigate(`/launchers/add`)}>add launcher</button>
        </div>
      </div>
     
      <h2>All launchers</h2>
      <LaunchersTable launchers={launchers} />
      

    </div>
  )
}

export default HomePage
