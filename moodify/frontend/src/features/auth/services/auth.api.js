import axios from "axios"


const api = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true
})

export async function register({name, username, email, password, confirmpassword}){
    const response = await api.post("/auth/register", {
        name, username, email, password, confirmpassword
    })

    return response.data
}

export async function login({username, email, password}){
    const response = await api.post("/auth/login",{
        username, email, password
    })

    return response.data
}


export async function getUser(){
    const response = await api.get("/auth/get-user")

    return response.data
}

export async function logout(){
    const response = await api.post("/auth/logout")

    return response.data
}