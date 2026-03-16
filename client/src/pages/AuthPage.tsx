import React, { useState } from 'react'
import {useNavigate } from "react-router-dom"
import useAuthStore from '../store/authStore'

function AuthPage() {
    const [islogin, setIsLogin] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { login, register } = useAuthStore()
    const navigate = useNavigate();

    const hndleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (islogin) {
                await login(username, password)
            }
            else {
                await register(username, password)
                setIsLogin(true)
                setUsername('')
                setPassword('')
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div>
            <div>
                <h1>{islogin ? 'login' : 'register'}</h1>

                <form onSubmit={hndleSubmit}>
                    <label >User Name:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label >password:</label>
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <p>
                        <button
                        type='submit'
                        >
                            {islogin ? 'connect' : 'register'}
                        </button>
                    </p>
                    {/* <p>
                        {islogin ? 'You already have an account' : "You don't have an account"}
                        <button onClick={()=> setIsLogin(false)}>
                            {islogin ? 'connect' : 'register'}
                            
                        </button>
                    </p> */}
                    <p>
                        <button onClick={()=> navigate('/')}>
                            "Back to Home"
                        </button>
                    </p>

                </form>


            </div>

        </div>
    )
}

export default AuthPage
