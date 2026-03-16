import { create } from "zustand";
import axios from "axios";


interface AuthStore {
    token: string | null,
    username: string |null,
    login: (username:string,password:string)=>Promise<void>
    register: (username:string,password:string)=>Promise<void>
     
}


const useAuthStore = create<AuthStore>((set)=>({
    token: localStorage.getItem('token'),
    username: localStorage.getItem('username'),

    login: async(username,password) => {
        const {data} = await axios.post('http://localhost:5011/auth/login',{username,password})
        localStorage.setItem('token',data.token)
        localStorage.setItem('username',data.username)
        set({token: data.token,username: data.username})
    },
    register: async (username,password)=>{
        await axios.post('http://localhost:5011/register',{username,password})
    }
}))
    

export default useAuthStore;