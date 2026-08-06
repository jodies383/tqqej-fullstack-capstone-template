import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
})

export function setToken(token) {
  if (token) api.defaults.headers.common['Authorization'] = `Token ${token}`
  else delete api.defaults.headers.common['Authorization']
}

export default api
