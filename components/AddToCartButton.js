'use client'
import React, { useContext } from 'react'
import { CartContext } from '@/providers/CartProvider'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';

const AddToCartButton = ({ itemName, itemID, itemPrice, itemColor, itemVariant, itemImgUrl }) => {
  const { cart, setContext, addItemToCart, qtyVar, renderTrigger, setRenderTrigger } = useContext(CartContext)

  const handleAddToCart = async () => {
    const cartItem = {
      itemName,
      itemID,
      itemPrice,
      itemColor,
      itemVariant,
      itemImgUrl,
      itemQty: qtyVar
    }
    addItemToCart(cartItem)
    setRenderTrigger(prevValue => !prevValue)
    toast.success('Item added to Cart !', {
      transition: Flip,
      position: "bottom-center",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });

  }


  return (
    <button onClick={handleAddToCart} className='rounded-lg bg-blue-600 transition-colors hover:bg-black font-medium px-3 py-2 text-white shadow-[5px_5px_20px_-4px_rgba(0,0,0,1)] '>Add to Cart</button>
  )
}

export default AddToCartButton
