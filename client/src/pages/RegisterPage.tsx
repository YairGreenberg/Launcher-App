import React, { useEffect, useState } from 'react'
import { useAuth } from '../components/useContext';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { type User } from '../types/type-index';

export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user_type, setUser_type] = useState('')
    const [users, setUsers] = useState<User[]>([])
    const token = useAuth()?.token;

    const headers = { Authorization: `Bearer ${token}` }

    const fetchUsers = async () => {
        const res = await axios.get('http://localhost:5011/api/auth/getUsers', {
            headers
        })
        console.log(res.data)
        setUsers(res.data)
    }

    useEffect(() => {
        fetchUsers()

    }, [])

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:5011/api/auth/register/create',
            {username, password, email, user_type}
                , { headers })
            alert('user added succssfully')
            setEmail('')
            setPassword('')
            setUser_type('')
            setUsername('')
            fetchUsers()
        } catch (error) {
            console.error(error)
        }

    }
    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:5011/api/auth/register/delete/${id}`,
                { headers }
            )
            fetchUsers()
        } catch {
            alert('Error deleting')
        }
    }

    return (
        <div>
            <Navbar></Navbar>
            <div>
                <h2>users system</h2>
                <form onSubmit={handleCreate}>
                    <input type="text"
                        placeholder='user name'
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="off"
                        required

                    />
                    <input type="password"
                        placeholder='password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input type="email"
                        placeholder='email'
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="new-password"
                        required
                    />
                    <select onChange={(e) => setUser_type(e.target.value)}>
                        <option value="intelligence">intelligence force</option>
                        <option value="airforce">air force</option>
                        <option value="admin">admin</option>
                    </select>
                    <button type='submit'>creat user</button>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>username</th>
                            <th>email</th>
                            <th>type</th>
                            <th>last login</th>
                            <th>operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id}>
                                <td>{u.username}</td>
                                <td>{u.email}</td>
                                <td>{u.user_type}</td>
                                <td>{u.last_login ? new Date(u.last_login).toDateString() : ''}</td>
                                <td><button onClick={() => handleDelete(u.id)}>delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
