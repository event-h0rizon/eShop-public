'use client'
import { CartContext } from '@/providers/CartProvider'
import React, { useState, useContext} from 'react'

const Quantity = () => {

const {qtyVar, setQtyVar} = useContext(CartContext)

const handleChange= (e)=> {
    setQtyVar(e.target.value)

}

  return (
    <div className='flex px-[15px] pb-10 pr-4 md:pr-8  my-4 space-x-2 justify-end'>
    <div>
      <label className='' htmlFor="quantity">Quantity:</label>
      <input type="number" value={qtyVar} onChange={handleChange} className='border-black outline mx-2 rounded-md pl-2 text-center py-1' min="1" max="10" />
    </div>
  </div>
  )
}

export default Quantity
