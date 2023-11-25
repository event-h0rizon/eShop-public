import React from 'react'
import ProductTabs from '@/components/ProductTabs'
import Link from 'next/link'
import BuyNowButtonQuick from '@/components/BuyNowButtonQuick'
import AddToCartButtonQuick from '@/components/AddToCartButtonQuick'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'eShop | Smart Watches',
  description: 'Latest smart watches from all the leading brands in the world.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: 0
  },
  themeColor: 'rgb(37 99 235)'
}

const SmartWatches = async () => {
  const response = await fetch(process.env.GET_SMART_WATCHES, { method: 'POST', headers: { "Content-Type": "application/json" } })
  const data = await response.json()
  const smartWatches = await data.rawFetch
  return (
    <>
      <ProductTabs />
      
      
      {smartWatches.length == 0 && <p className='h-[300px] font-bold text-center text-2xl pt-[130px]'>New products will be added soon...</p>}
      <div className='md:grid md:grid-cols-2 md:space-x-2 lg:grid-cols-3 2xl:grid-cols-4'>
        {smartWatches.map((smartWatch, index) => {
          return (

            <div key={smartWatch._id} className='shadow-md md:shadow-[5px_5px_20px_-12px_rgba(0,0,0,1)]'>
              <Link href={`/smartwatches/${smartWatch._id}?variant=${smartWatch.variant}&slug=${smartWatch.slug}`} className='flex px-[15px] pt-5 my-4 space-x-2'>
                <img className='w-[120px] h-[120px]' src={smartWatch.imgUrl} alt="" />
                <div className='pl-[15px]'>
                  <div className='font-bold'>{smartWatch.name}</div>
                  <div className='badge badge-info bg-gray-500 text-white py-3 mr-3'>{smartWatch.color}</div>
                  <div className='badge badge-neutral text-white py-3 mr-3'>{smartWatch.variant}</div>
                  {smartWatch.quantity === 0 && <div className='badge mt-3 badge-warning bg-red-600 text-md text-white py-3'>Out of Stock</div>}
                  <div className='font-semibold mt-7 text-lg'>{`₹ ${smartWatch.price.toLocaleString('en-IN')}`}</div>
                </div>
              </Link>
              <div className='flex px-[15px] pb-5 pr-4  my-4 space-x-2 justify-end'>
                <AddToCartButtonQuick itemName={smartWatch.name} itemID={smartWatch._id} itemPrice={smartWatch.price} itemColor={smartWatch.color} itemVariant={smartWatch.variant} itemImgUrl={smartWatch.imgUrl} />
                {smartWatch.quantity !== 0 && <BuyNowButtonQuick itemName={smartWatch.name} itemID={smartWatch._id} itemPrice={smartWatch.price} itemColor={smartWatch.color} itemVariant={smartWatch.variant} itemImgUrl={smartWatch.imgUrl} />}

              </div>
            </div>


          )
        })}
      </div>
    </>
  )
}

export default SmartWatches
