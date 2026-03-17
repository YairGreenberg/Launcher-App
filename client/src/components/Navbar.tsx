import axios from 'axios'
import { useAuth } from './useContext'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const auth = useAuth()
    const token = auth?.token
    const username = auth?.username
    const user_type = auth?.user_type
    const logout = auth?.logout
    const navigate = useNavigate()

    const handleGetUser = async () =>{
        if(!token){
            navigate('/login')
            return
        }
        try{
            const {data} = await axios.get('http://localhost:5011/auth/getUser',{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            alert(`username: ${data.username} user type${data.user_type}`)
        }catch{
            navigate('/login')
        }
    }

    const handleLogout = () =>{
        if(logout){
            logout()
        }
        navigate('/login')
    }


  return (
    <div>
        <div><h2>Launcher Sustem</h2></div>
        {token && (
            <div>
                <button onClick={()=> navigate('/launchers')}>launchers</button>
                {user_type==='admin'|| user_type=== 'intrlligence' &&(
                    <button onClick={()=> navigate('/launchers/add')}>add launcher</button>
                )}
                {user_type === 'admin' && (
                    <button onClick={()=> navigate('/register')}>User management</button>
                )}
                <button onClick={handleGetUser}>user: {username}</button>
                <button onClick={handleLogout}>logout</button>
            </div>
        ) }
        {!token && <button onClick={()=> navigate('/login')}>login</button>}

      
    </div>
  )
}

export default Navbar
