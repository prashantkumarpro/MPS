import React from 'react'

const Image = ({ image, name, className }) => {
  return (
    <img
      src={image}
      alt={name}
      width='400'
      height='400'
      className={`w-full aspect-[16/16] ${className}`}
      loading='lazy'
    />
  )
}

export default Image
