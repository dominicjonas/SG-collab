import React, { useState, useEffect } from 'react'
import { getAllBrands } from '../api/callerFunctions.js'
import BrandCard from './BrandCard.js'

const Brands = () => {
  const [brands, setBrands] = useState([])

  useEffect(() => {
    getAllBrands().then((brands) => {
      setBrands(brands)
    })
  }, [])

  console.log('this is the brands state:', brands)

  return (
    <>
      <div className='brand-cards-container'>
        {brands.map((brand) => (
          <BrandCard
            key={brand._id}
            brand={brand.brand}
            brandLogoUrl={brand.brandLogoUrl}
          />
        ))}
      </div>
    </>
  )
}

export default Brands
