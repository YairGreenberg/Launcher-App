import React, { useEffect, useState } from 'react'
import {type Launcher } from '../types/type-index'
import axios from 'axios'

function AddLauncherPage() {
    const [launcher,setLauncher] = useState<Launcher>()


    useEffect(()=>{
        const fetchLauncer = async () => {
            const res = axios.get('http://localhost:5011/launchers/:id')
        }
    })
  return (
    <div>
      
    </div>
  )
}

export default AddLauncherPage
