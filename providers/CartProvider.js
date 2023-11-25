'use client'
import React, { useState, useEffect, createContext } from 'react'

export const CartContext = createContext()

const CartProvider = ({ children }) => {

  const [cart, setCart] = useState({})
  const [cartItem, setCartItem] = useState({})
  const [trigger, setTrigger] = useState(false)

  const [qtyVar, setQtyVar] = useState(1)

  const [verity, setVerity] = useState(false)


  const [renderTrigger, setRenderTrigger] = useState(true)
  const [renderTriggerQuick, setRenderTriggerQuick] = useState(true)
  const [renderTriggerItemRemoved, setRenderTriggerItemRemoved] = useState(true)
  const [renderTriggerItemDecremented, setRenderTriggerItemDecremented] = useState(true)
  const [renderTriggerItemIncremented, setRenderTriggerItemIncremented] = useState(true)
  const [renderTriggerVerityFailed, setRenderTriggerVerityFailed] = useState(true)


  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [refreshLoginStatus, setRefreshLoginStatus] = useState(true)






  useEffect(() => {
    const getCart = JSON.parse(localStorage.getItem('Cart'))
    setCart(getCart ? getCart : {})
  }, [])

  const saveCart = (newCart) => {
    localStorage.setItem('Cart', JSON.stringify(newCart))
  }
  const addItemToCart = async (cartItem) => {
    let newCart = cart

    if (cartItem.itemID in cart) {
      newCart[cartItem.itemID] = {
        itemName: cartItem.itemName,
        itemPrice: cartItem.itemPrice,
        itemColor: cartItem.itemColor,
        itemVariant: cartItem.itemVariant,
        itemImgUrl: cartItem.itemImgUrl,
        itemQty: parseInt(cart[cartItem.itemID].itemQty) + parseInt(cartItem.itemQty)
      }
    }
    else {
      newCart[cartItem.itemID] = {
        itemName: cartItem.itemName,
        itemPrice: cartItem.itemPrice,
        itemColor: cartItem.itemColor,
        itemVariant: cartItem.itemVariant,
        itemImgUrl: cartItem.itemImgUrl,
        itemQty: cartItem.itemQty
      }

    }
    setCart(newCart)
    saveCart(newCart)
    console.log(cart)
    console.log(newCart)
    setQtyVar(1)
    setRenderTrigger(prevValue => !prevValue)
    setRenderTriggerQuick(prevValue => !prevValue)


  }

  const removeItemFromCart = async (itemID) => {
    let newCART = cart
    delete newCART[itemID]

    // const {itemID, ...rest}=
    // console.log('helllloooooo', cart)
    // console.log('helllloooooo', itemID)

    // let tempCart = cart
    // let newCart= {itemID, ...cart}
    // let {itemID, ...neWCart}= cart

    // let newCart={itemID, ...cart}
    // delete cart.itemID;

    // let newCart = tempCart



    // newCart[itemID]= {
    //   itemName: cartItem.itemName,
    //   itemPrice : cartItem.itemPrice,
    //   itemColor : cartItem.itemColor,
    //   itemVariant: cartItem.itemVariant,
    //   itemImgUrl: cartItem.itemImgUrl,
    //   itemQty: parseInt(cart[cartItem.itemID].itemQty) + parseInt(cartItem.itemQty)
    // }

    setCart(newCART)
    saveCart(newCART)
    console.log(cart)
    console.log(newCART)
    // setQtyVar(1)
    // setRenderTrigger(prevValue => !prevValue)
    // setRenderTriggerQuick(prevValue => !prevValue)
    setRenderTriggerItemRemoved(prevValue => !prevValue)



  }
  const decrementItem = async (itemID, itemQty) => {
    let decCart = cart
    // delete newCART[itemID]

    decCart[itemID] = {
      ...decCart[itemID],
      itemQty: itemQty - 1
    }

    setCart(decCart)
    saveCart(decCart)
    console.log(decCart)
    console.log(decCart)
 
    setRenderTriggerItemDecremented(prevValue => !prevValue)
  }
  const incrementItem = async (itemID, itemQty) => {
    let incCart = cart
    // delete newCART[itemID]

    incCart[itemID] = {
      ...incCart[itemID],
      itemQty: itemQty + 1
    }

    setCart(incCart)
    saveCart(incCart)
    console.log(incCart)
    console.log(incCart)
 
    setRenderTriggerItemIncremented(prevValue => !prevValue)
  }

  return (
    <CartContext.Provider value={{ cart, setCart, cartItem, setCartItem, addItemToCart, removeItemFromCart, decrementItem, incrementItem, renderTrigger, setRenderTrigger, renderTriggerQuick, setRenderTriggerQuick, renderTriggerItemRemoved, setRenderTriggerItemRemoved, renderTriggerItemDecremented, setRenderTriggerItemDecremented, renderTriggerItemIncremented, setRenderTriggerItemIncremented, qtyVar, setQtyVar, refreshLoginStatus, setRefreshLoginStatus, isLoggedIn, setIsLoggedIn, renderTriggerVerityFailed, setRenderTriggerVerityFailed }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
