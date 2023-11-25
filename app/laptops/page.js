// 'use client'

import ProductTabs from '@/components/ProductTabs'
import React from 'react'
export const dynamic = 'force-dynamic'
import Link from 'next/link'
import BuyNowButtonQuick from '@/components/BuyNowButtonQuick'
import AddToCartButtonQuick from '@/components/AddToCartButtonQuick'
import { CartContext } from '@/providers/CartProvider'


export const metadata = {
  title: 'eShop | Laptops',
  description: 'Latest laptops from all the leading brands in the world.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: 0
  },
  themeColor: 'rgb(37 99 235)'
}

const Laptops = async () => {
  const response = await fetch(process.env.GET_LAPTOPS, { method: 'POST', headers: { "Content-Type": "application/json" } })
  const data = await response.json()
  const laptops = await data.rawFetch

 
  return (
    <>
      <ProductTabs />
      {laptops.length == 0 && <p className='h-[300px] font-bold text-center text-2xl pt-[130px]'>New products will be added soon...</p>}
      <div className='md:grid md:grid-cols-2 md:space-x-2 lg:grid-cols-3 2xl:grid-cols-4'>
        {laptops.map((laptop, index) => {
          return (

            <div key={laptop._id} className='shadow-md md:shadow-[5px_5px_20px_-12px_rgba(0,0,0,1)]'>
              <Link href={`/laptops/${laptop._id}?variant=${laptop.variant}&slug=${laptop.slug}`} className='flex px-[15px] pt-5 my-4 space-x-2'>
                <img className='w-[120px] h-[120px]' src={laptop.imgUrl} alt="" />
                <div className='pl-[15px]'>
                  <div className='font-bold'>{laptop.name}</div>
                  <div className='badge badge-info bg-gray-500 text-white py-3 mr-3'>{laptop.color}</div>
                  <div className='badge badge-neutral text-white py-3 mr-3'>{laptop.variant}</div>
                  {laptop.quantity === 0 && <div className='badge mt-3 badge-warning bg-red-600 text-md text-white py-3'>Out of Stock</div>}
                  <div className='font-semibold mt-7 text-lg'>{`₹ ${laptop.price.toLocaleString('en-IN')}`}</div>
                </div>
              </Link>
              <div className='flex px-[15px] pb-5 pr-4  my-4 space-x-2 justify-end'>
                <AddToCartButtonQuick itemName={laptop.name} itemID={laptop._id} itemPrice={laptop.price} itemColor={laptop.color} itemVariant={laptop.variant} itemImgUrl={laptop.imgUrl} />
                {laptop.quantity !== 0 && <BuyNowButtonQuick itemName={laptop.name} itemID={laptop._id} itemPrice={laptop.price} itemColor={laptop.color} itemVariant={laptop.variant} itemImgUrl={laptop.imgUrl} />}

              </div>
            </div>


          )
        })}
      </div>
    </>

  )
}

export default Laptops
