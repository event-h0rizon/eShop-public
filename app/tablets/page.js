import React from 'react'
import ProductTabs from '@/components/ProductTabs'
export const dynamic = 'force-dynamic'
import Link from 'next/link'
import BuyNowButtonQuick from '@/components/BuyNowButtonQuick'
import AddToCartButtonQuick from '@/components/AddToCartButtonQuick'

export const metadata = {
  title: 'eShop | Tablets',
  description: 'Latest tablets from all the leading brands in the world.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: 0
  },
  themeColor:  'rgb(37 99 235)'  
}

const Tablets = async () => {
  const response = await fetch(process.env.GET_TABLETS, { method: 'POST', headers: { "Content-Type": "application/json" } })
  const data = await response.json()
  const tablets = await data.rawFetch
  return (
    <>
      <ProductTabs />
      {tablets.length == 0 && <p className='h-[300px] font-bold text-center text-2xl pt-[130px]'>New products will be added soon...</p>}
      <div className='md:grid md:grid-cols-2 md:space-x-2 lg:grid-cols-3 2xl:grid-cols-4'>
        {tablets.map((tablet, index) => {
        return (

          <div key={tablet._id} className='shadow-md md:shadow-[5px_5px_20px_-12px_rgba(0,0,0,1)]'>
             <Link href={`/tablets/${tablet._id}?variant=${tablet.variant}&slug=${tablet.slug}`} className='flex px-[15px] pt-5 my-4 space-x-2'>
              <img className='w-[120px] h-[120px]' src={tablet.imgUrl} alt="" />
              <div className='pl-[15px]'>
                <div className='font-bold'>{tablet.name}</div>
                <div className='badge badge-info bg-gray-500 text-white py-3 mr-3'>{tablet.color}</div>
                <div className='badge badge-neutral text-white py-3 mr-3'>{tablet.variant}</div>
                {tablet.quantity === 0 && <div className='badge mt-3 badge-warning bg-red-600 text-md text-white py-3'>Out of Stock</div>}
                <div className='font-semibold mt-7 text-lg'>{`₹ ${tablet.price.toLocaleString('en-IN')}`}</div>
              </div>
            </Link>
            <div className='flex px-[15px] pb-5 pr-4  my-4 space-x-2 justify-end'>
            <AddToCartButtonQuick itemName={tablet.name} itemID={tablet._id} itemPrice={tablet.price} itemColor={tablet.color} itemVariant={tablet.variant} itemImgUrl={tablet.imgUrl} />
              {tablet.quantity !== 0 && <BuyNowButtonQuick  itemName={tablet.name} itemID={tablet._id} itemPrice={tablet.price} itemColor={tablet.color} itemVariant={tablet.variant} itemImgUrl={tablet.imgUrl}/>}

            </div>
          </div>


        )
      })}
      </div>
    </>
  )
}

export default Tablets
