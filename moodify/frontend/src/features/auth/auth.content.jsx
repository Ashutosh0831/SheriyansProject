import { createContext } from "react";
import { useState } from "react";

const AuthContext= createContext()

export const AuthProvider = ({children})=>{

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState("")

    return (
        <AuthContext.Provider  value ={{user, setUser, loading, setLoading, message, setMessage}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext