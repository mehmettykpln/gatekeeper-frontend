import axios from 'axios';
import { config } from 'process';

const api = axios.create({
  baseURL:"http://localhost:3001/api",
  withCredentials:true,
})

export default  api

api.interceptors.request.use((config)=> {
  const token = localStorage.getItem("token")
  if(token) {config.headers.Authorization = 'bearer ${token}'

  }
  return config
})