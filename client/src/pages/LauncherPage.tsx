import  { useEffect, useState } from 'react'
import { type Launcher } from '../types/type-index';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useAuth } from '../components/useContext';
import LaunchersTable from '../components/LaunchersTable';


function LauncherPage() {
    const [launcher, setLauncher] = useState<Launcher[]>([]);
    const  username = useAuth()?.username
    const navigate = useNavigate();
    const token = useAuth()?.token
    const headers = { Authorization: `Bearer ${token}` }
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        const fetchLauchers = async () => {
            try {
                const res = await axios.get(`http://localhost:5011/api/launchers/${id}`, {
                    headers
                })
                if (res.data.launcher) {
                    setLauncher([res.data.launcher]);
                } else {
                    setLauncher([]);
                }
            } catch (error) {
                console.error(error)
                navigate('/login')
            }
        }
        fetchLauchers()
    }, [id, token, navigate])
    return (
        <div>
            <Navbar></Navbar>
            <div>
                <h1>List of launchers</h1>
                <div>
                    <span>Hello {username}</span>
                </div>
                <div>
                    <button onClick={() => navigate(`/launchers/add`)}>add launcher</button>
                </div>
            </div>
            <div>


                {launcher.length === 0 ? (

                    <p>There are no launchers in the system</p>
                ) : (
                    <LaunchersTable launchers={launcher} />
                )
                }
            </div>

        </div>
    )
}

export default LauncherPage
