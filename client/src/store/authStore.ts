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
    // user_type: l

    login: async(username,password) => {
        const {data} = await axios.post('http://localhost:5011/api/auth/login',{username,password})
        localStorage.setItem('token',data.token)
        localStorage.setItem('username',data.username)
        set({token: data.token,username: data.username})
    },
    register: async (username,password)=>{
        await axios.post('http://localhost:5011/api/auth/register/create',{username,password})
    }
}))
    

export default useAuthStore;