import axios from 'axios'
import { getToken } from './auth'

export const getAllBrands = async () => {
  const options = {
    method: 'GET',
    url: `http://localhost:3000/api/brands`
  }

  const { data } = await axios.request(options)
  
  console.log(data)
    return data
}

// export const getAllBrands = async () => {
//   const
// }

export const getAllGuitars = async () => {
  const options = {
    method: 'GET',
    url: `/api/guitars`
  }

  const { data } = await axios.request(options)
  console.log(data)
    return data
}

export const getGuitar = async (id) => {
  const options = {
    method: 'GET',
    url: `/api/guitars/${id}`,
  }

  const { data } = await axios.request(options)
  console.log(data)
  return data
}

export const createGuitar = (formData) => {
  const requestConfig = {
    headers: { Authorization: `Bearer ${getToken()}` }, // requires function to get bearer token
  }

  return axios.post(`/api/guitars`, formData, requestConfig)
  
}

export const deleteGuitar = (id) => {
  const requestConfig = {
    headers: { Authorization: `Bearer ${getToken()}` },
  }

  return axios.delete(`/api/guitars/${id}`, requestConfig)
}

export const updateGuitar = (id, formData) => {
  const requestConfig = {
    headers: { Authorization: `Bearer ${getToken()}` },
  }

  return axios.put(`/api/guitars/${id}`, formData, requestConfig)
}