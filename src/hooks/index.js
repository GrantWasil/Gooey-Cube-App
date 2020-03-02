import { useState } from 'react'
import axios from 'axios'

const baseUrl = '/api'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

// module can have several named exports
export const useResource = (route) => {
  const [token, setTokenState] = useState(null)

  const setToken = newToken => {
    setTokenState(`bearer ${newToken}`) 
  }
  
  const getAll = () => {
    const request = axios.get(`${baseUrl}/${route}`)
    return request.then(response => response.data)
  }
  
  const create =  async (newObject) => {
    const config = {
      headers: { Authorization: token },
    }
    const res = await axios.post(`${baseUrl}/${route}`, newObject, config)
    return res.data
  }
  
  const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${route}/${id}`, newObject)
    return request.then(response => response.data)
  }
  
  const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${route}/${id}`)
    return request.then(response => response.data)
  }

  return {
    setToken,
    getAll,
    create,
    update,
    remove
  }
}