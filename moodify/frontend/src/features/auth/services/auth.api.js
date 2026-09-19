import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

console.log(api.baseURL);

export async function register({
  name,
  username,
  email,
  password,
  confirmpassword,
}) {
  const response = await api.post("/api/auth/register", {
    name,
    username,
    email,
    password,
    confirmpassword,
  });

  return response.data;
}

export async function login({ username, email, password }) {
  const response = await api.post("/api/auth/login", {
    username,
    email,
    password,
  });

  return response.data;
}

export async function getUser() {
  const response = await api.get("/api/auth/get-user");

  return response.data;
}

export async function logout() {
  const response = await api.post("/api/auth/logout");

  return response.data;
}
