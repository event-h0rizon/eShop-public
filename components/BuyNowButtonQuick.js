'use client'

import React, { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const BuyNowQuick = ({ itemName, itemID, itemPrice, itemColor, itemVariant, itemImgUrl }) => {

  const router = useRouter()
  let myCart
  const [getCartLS, setGetCartLS] = useState({})
  const [getDeliveryAddress, setGetDeliveryAddress] = useState('')

  const [address, setAddress] = useState('')
  const [userID, setuserID] = useState('')


  const [dbAddress, setDbAddress] = useState("")
  const [newAddress, setNewAddress] = useState("")
  const [orderAddress, setOrderAddress] = useState("")

  const [verityCheck, setVerityCheck] = useState(true)
  const [verityOK, setVerityOK] = useState(true)

  const fetchDeliveryAddress = async (token) => {
    const response = await fetch(process.env.NEXT_PUBLIC_AUTHENTICATE_USER, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
        auth_token: `${token}`
      })
    })
    const data = await response.json()
    console.log('KKKKKKKKKKKKKKK', data)
    if (data.myRes.success) {
      setGetDeliveryAddress(data.myRes.deliveryAddress)
      setDbAddress(data.myRes.deliveryAddress)
      setAddress(data.myRes.deliveryAddress)
      setuserID(data.myRes.userID)

      setOrderAddress(data.myRes.deliveryAddress)

    }
    else {
      toast.error('Security Issue, Login Again', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })


      localStorage.removeItem('auth_token')
      setRefreshLoginStatus(value => !value)
      router.push("/")


    }




  }
  useEffect(() => {

    const getToken = localStorage.getItem('auth_token')
    fetchDeliveryAddress(getToken)

}, [])

const buyNowQuick = async () => {
  setVerityCheck(value => !value)
  if (verityOK === true) {


      // orderList: [{
      //     productIDfromDB: 45445455,
      //     itemQty: 21,
      //     itemColor: red,
      //     itemImgUrl: www.google.com,
      //     itemName: Asus,
      //     itemPrice: 999,
      //     itemVariant: red
      // }],

      const response = await fetch(process.env.NEXT_PUBLIC_PLACE_ORDER, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({

              userID: userID,
              orderList: [{
                itemID,
                itemQty: "1",
                itemColor,
                itemImgUrl,
                itemName,
                itemPrice,
                itemVariant
              }],
              orderTotal: itemPrice,
              orderItemsCount: "1",
              deliveryAddress: orderAddress,
              orderStatus: "Paid",
              orderID: Date.now()


          })
      })

      router.push("/my-orders")

  }
}


  return (
    <button onClick={buyNowQuick} className='rounded-lg bg-green-500 font-medium px-2 py-1 transition-colors hover:bg-black text-white'>Buy Now</button>
  )
}

export default BuyNowQuick
