import React from 'react'
import Temperaments from '../Temperaments/Temperaments'

const Cards = (props) => {
  const {id, reference_image_id,weightMin, weightMax, name, temperaments} = props
  return (
    <div>
      <img src={reference_image_id} alt="" />
      <h2>{name}</h2>
      <h4>Min weight: {weightMin}</h4>
      <h4>Max weight: {weightMax}</h4>
      <Temperaments key={id} temperaments={temperaments}/>
    </div>
  )
}

export default Cards