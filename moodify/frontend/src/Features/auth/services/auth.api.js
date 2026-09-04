import axios from "axios"

const api = axios.create({
    baseURL:"http://localhost:5000/api/auth",
    withCredentials: true
})


export async function register({username, email, password}){
    const response= await api.post("/register",{
        email, username, password
    })

    return response.data
}

export async function login({email, username, password}){
    const response= await api.post("/user-login",{
        email,username,password
    })

    return response.data
}

export async function getUser(){
    const response= await api.get("/get-user")
    return response.data
}

export async function logout(){
    const response= await api.post("/logout")
    return response.data
}
