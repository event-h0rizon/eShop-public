'use client'
import React, { useState, useEffect, useContext } from 'react'
export const dynamic = 'force-dynamic'


const MyOrders = () => {
  let myOrders

  const [orderList, setOrderList] = useState([])

  const fetchOrders = async (token) => {
    const response = await fetch(process.env.NEXT_PUBLIC_GET_ORDERS, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
        auth_token: `${token}`
      })
    })
    const data = await response.json()
    myOrders = data.myRes.orders
    console.log('7878788787787878', myOrders)
    myOrders.reverse()
    setOrderList(myOrders)

  }

  useEffect(() => {
    const getToken = localStorage.getItem('auth_token')
    fetchOrders(getToken)
    // setOrderList(myOrders)s


  }, [])





  console.log(orderList)
  return (
    <div>
      <div className='shadow-[5px_5px_20px_-12px_rgba(0,0,0,1)] rounded-2xl px-3 py-8 md:mx-8 font-bold'>
        <div className='text-2xl pb-6 mb-2 border-b-4'>
          <div>My Orders :</div>
        </div>
        {orderList && orderList.map((order, index) => {
          return (
            <div className='pb-6 mb-2 border-b-4 border-black hover:bg-slate-100' key={index}>
              <div className='font-bold'>Order No: {parseInt(orderList.length)-parseInt(index)}</div>
              <div className='font-semibold'>Order placed on: {order.addedOn}</div>
              <div className='font-semibold'>Order ID: {order.orderID}</div>
              <div className='font-semibold'>Order Status: {order.orderStatus}</div>
              <div className='font-semibold'>Delivery Address: {order.deliveryAddress}</div>
              <div className='font-semibold'>No. of items: {order.orderItemsCount}</div>
              <div className='font-semibold'>Amount: ₹ {order.orderTotal.toLocaleString('en-IN')}</div>
              <div className='font-semibold mt-2'>Ordered Items:</div>
              {order.orderList.map((orderItem, index) => {
                return (
                  <div key={index} className='bg-yellow-200 px-3 py-2'>
                    <div>{orderItem.itemName}</div>
                    <div>{orderItem.itemColor}, {orderItem.itemVariant}</div>
                    <div>{orderItem.itemQty} x ₹ {orderItem.itemPrice.toLocaleString('en-IN')}= ₹ {(parseInt(orderItem.itemPrice)*parseInt(orderItem.itemQty)).toLocaleString('en-IN')}</div>
                  </div>
                )
              })}
            </div>)
        })}
      </div>
    </div>
  )
}

export default MyOrders
