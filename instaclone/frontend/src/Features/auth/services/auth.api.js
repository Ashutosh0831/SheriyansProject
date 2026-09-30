import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export async function register({ name, username, email, password }) {
  const response = await api.post("/auth/register", {
    name,
    username,
    email,
    password,
  });
  console.log("Registered Succesfully.");

  return response.data;
}

export async function login({username, password}) {

  const response = await api.post("/auth/login", { username, password });
  console.log("login successfull");

  return response.data;
}

export async function get_me() {
  const response = await api.get("/auth/get-me");

  return response.data;
}
