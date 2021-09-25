import axios from 'axios'

export const getAllBrands = async () => {
  const options = {
    method: 'GET',
    url: `/api/brands`
  }

  const { data } = await axios.request(options)
  console.log(data)
  //   return data
}

export const getAllGuitars = async () => {
  const options = {
    method: 'GET',
    url: `/api/guitars`
  }

  const { data } = await axios.request(options)
  console.log(data)
  //   return data
}
