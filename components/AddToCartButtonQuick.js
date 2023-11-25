'use client'
import { CartContext } from '@/providers/CartProvider'
import React, { useState, useContext, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';

const AddToCartButtonQuick = async ({ itemName, itemID, itemPrice, itemColor, itemVariant, itemImgUrl }) => {

  const { cart, setCart, cartItem, setCartItem, addItemToCart, renderTrigger, setRenderTrigger, renderTriggerQuick, setRenderTriggerQuick, } = useContext(CartContext)
  // console.log('********************************************', cart)
  // console.log(typeof(setCart))



  const handleAddToCart = async () => {
    const cartItem = {
      itemName,
      itemID,
      itemPrice,
      itemColor,
      itemVariant,
      itemImgUrl,
      itemQty: 1
    }
    addItemToCart(cartItem)
    setRenderTriggerQuick(prevValue => !prevValue)
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
    <button onClick={handleAddToCart} className='rounded-lg bg-blue-600 transition-colors hover:bg-black font-medium px-2 py-1 text-white'>Add to Cart</button>
  )
}

export default AddToCartButtonQuick
