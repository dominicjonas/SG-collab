import axios from 'axios'

export const getAllBrands = async () => {
  const options = {
    method: 'GET',
    url: `http://localhost:3000/api/brands`
  }

  const { data } = await axios.request(options)
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
  //   return data
}
