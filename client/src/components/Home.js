import React, { useState, useEffect } from 'react'
import { getAllBrands, getAllGuitars } from './api/callerFunctions'

const Home = () => {
  const [brands, setBrands] = useState([])
  const [guitars, setGuitars] = useState([])

  //   const getAllBrands = () => {};

  useEffect(() => {
    getAllBrands().then((brands) => setBrands(brands))
    getAllGuitars().then((guitars) => setGuitars(guitars))
  }, [])

  return (
    <div>
      <h1>SGS!!</h1>
      <button onClick={getAllBrands}>Brands</button>
      <button onClick={getAllGuitars}>Artists</button>
      {/* <div>
        {brands.map((brand) => (
          <p key={brand._id}>{brand.brand}</p>
        ))}
      </div>
      <div>
        {artists.map((artist) => (
          <p key={artist._id}>{artist.signatureArtist}</p>
        ))}
      </div> */}
    </div>
  )
}

export default Home

// zksdnks
