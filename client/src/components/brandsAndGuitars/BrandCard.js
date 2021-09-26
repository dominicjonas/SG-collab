import React from 'react'

const BrandCard = ({ _id, brand, placeOfOrigin, brandLogoUrl }) => {
  return (
    <div className='brand-card-container' id={_id}>
      <div className='brand-card-header'>
        <h4>{brand}</h4>
      </div>
      <div className='brand-card-img'>
        <img src={brandLogoUrl} />
      </div>
      <div className='brand-card-origin'>
        <h4>{placeOfOrigin}</h4>
      </div>
      <div className='brand-bio'>
        <p>some text about the brand</p>
      </div>
    </div>
  )
}

export default BrandCard

// TODO
// <Link> card with id
