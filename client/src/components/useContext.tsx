import  { useState, createContext, useContext} from 'react'

export interface Auth {
    token: string | null,
    username: string |null,
    user_type: string| null,
    login: (token:string,username:string,user_type:string)=>void;
    logout: ()=> void;
}
const AuthContext = createContext<Auth|null>(null)




export function AuthProvider({ children }:{children :React.ReactNode}) {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [username, setUsername] = useState<string | null>(localStorage.getItem('username'));
    const [user_type, setUser_type] = useState<string | null>(localStorage.getItem('user_type'))

    const login = (token: string, username: string, user_type: string)=> {
        localStorage.setItem('token', token)
        localStorage.setItem('username', username)
        localStorage.setItem('user_type', user_type)
        setToken(token)
        setUsername(username)
        setUser_type(user_type)

    }
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('user_type')
        setToken(null)
        setUsername(null)
        setUser_type(null)
    }

    return (
        <div>
            <AuthContext.Provider value={{token,username,user_type,login,logout}}>
                { children }
            </AuthContext.Provider>


        </div>
    )

}


export const useAuth = () =>{
    const context = useContext(AuthContext)
    return context
}

