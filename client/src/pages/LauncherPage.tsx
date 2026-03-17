import React, { useEffect, useState } from 'react'
import {type Launcher } from '../types/type-index';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function LauncherPage() {
    const [launcher,setLauncher] = useState<Launcher[]>([]);
    const {username} = useAuthStore();
    const navigate = useNavigate();

    useEffect( ()=>{
        const fetchLauchers = async ()=>{
            try{
                const res = await axios.get('http://localhost:5011/api/launchers')
                console.log(res)

            }catch(error){
                console.error(error)
                navigate('/auth')
            }
        }
    },[]
)
  return (
    <div>
        <div>
            <h1>List of launchers</h1>
            <div>
                <span>Hello {username}</span>
            </div>
            <div>
                <p>add launcher</p>
                <button></button>
            </div>
        </div>
        <div>
            {launcher.length === 0 ?(
                <p>There are no launchers in the system</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>{'Name'}</th>
                            <th>{'Location'}</th>
                            <th>{'Status'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {launcher.map((l)=>{
                            <tr key={l.id}>
                                <td>{l.name}</td>
                                <td>{l.city}</td>
                                <td>{l.rocketType}</td>
                                
                            </tr>
                        })}
                    </tbody>
                </table>
            )
        }
        </div>
      
    </div>
  )
}

export default LauncherPage
