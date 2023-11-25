import { revalidateTag } from 'next/cache'
import React from 'react'
export const dynamic = 'force-dynamic'
import Link from 'next/link'
import AddToCartButton from '@/components/AddToCartButton'
import BuyNowButton from '@/components/BuyNowButton'
import Quantity from '@/components/Quantity'



export const generateMetadata = async ({ params: { id } }) => {
  const response = await fetch(`${process.env.GET_SMART_WATCHES}/${id}`)
  const data = await response.json()
  return {
    title: `eShop | ${data.myRes.smartWatchId.name}`,
    description: `${data.myRes.smartWatchId.desc}`,
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1,
      userScalable: 0
    },
    themeColor: 'rgb(37 99 235)'
  }
}



const SmartWatch = async ({ params: { id }, searchParams }) => {
  // console.log('ID is:',id)
  // console.log('Query is:',searchParams)



  const response = await fetch(`${process.env.GET_SMART_WATCHES}/${id}?variant=${searchParams.variant}&slug=${searchParams.slug}`, { next: { tags: ['updateVariants'] } })
  const data = await response.json()
  console.log('7777777777777777777777777777777777777777777777777')
  console.log('ok', data)

  return (
    <>
      <div className='shadow-[5px_5px_20px_-12px_rgba(0,0,0,1)] rounded-2xl md:mx-32'>
        <div className='flex flex-col px-[15px] pt-5 my-4 lg:my-2 space-x-2'>
          <img className='w-[100%] md:w-[30%] md:mx-auto lg:w-[20%] lg:mx-auto p-1' src={data.myRes.smartWatchId.imgUrl} alt="" />
          <div className='mt-4 text-xl'>
            <div className='font-bold'>{data.myRes.smartWatchId.name}</div>
            <div className='badge badge-info bg-gray-500 text-white py-3 mr-3'>{data.myRes.smartWatchId.color}</div>
            <div className='badge badge-neutral text-white py-3 mr-3'>{data.myRes.smartWatchId.variant}</div>
            {data.myRes.smartWatchId.quantity === 0 && <div className='badge mt-3 badge-warning bg-red-600 text-md text-white py-3'>Out of Stock</div>}
            <div className='font-semibold mt-7 text-lg'>{`₹ ${data.myRes.smartWatchId.price.toLocaleString('en-IN')}`}</div>
          </div>
        </div>
        <div className='text-xl pl-5 pb-3 pt-2 items-center'>
          Choose a variant:
          <div className='flex flex-col space-y-3 pt-3 text-sm md:text-lg'>
            {data.myRes.smartWatchVariants.map((smartWatchVariant, index) => {
              return (
                <Link key={smartWatchVariant._id} href={`/smartwatches/${smartWatchVariant._id}?variant=${smartWatchVariant.variant}&slug=${data.myRes.smartWatchId.slug}`} className=' cursor-pointer'>
                  {/* checked={data.myRes.smartWatchId._id===smartWatchVariant._id ? `checked` : ``} */}

                  <button className={`${data.myRes.smartWatchId._id === smartWatchVariant._id ? 'bg-slate-700 text-white' : 'bg-white text-black'} px-2 py-1 rounded-md border-black border-2 hover:text-white hover:bg-blue-600`}>{smartWatchVariant.color}, {smartWatchVariant.variant}</button>



                </Link>)
            })}
          </div>
        </div>
        <Quantity />
        <div className='flex px-[15px] pb-10 pr-4 md:pr-8  my-4 space-x-2 justify-end'>
          <AddToCartButton itemName={data.myRes.smartWatchId.name} itemID={data.myRes.smartWatchId._id} itemPrice={data.myRes.smartWatchId.price} itemColor={data.myRes.smartWatchId.color} itemVariant={data.myRes.smartWatchId.variant} itemImgUrl={data.myRes.smartWatchId.imgUrl} />
          {data.myRes.smartWatchId.quantity !== 0 && <BuyNowButton itemName={data.myRes.smartWatchId.name} itemID={data.myRes.smartWatchId._id} itemPrice={data.myRes.smartWatchId.price} itemColor={data.myRes.smartWatchId.color} itemVariant={data.myRes.smartWatchId.variant} itemImgUrl={data.myRes.smartWatchId.imgUrl}/>}
        </div>
      </div>
      <div className='px-5 mt-5 py-5 shadow-[5px_5px_20px_-12px_rgba(0,0,0,1)] rounded-2xl md:mx-32'>
        <div className='text-xl font-semibold pb-3'>Product Description</div>
        <div className='text-lg'>{data.myRes.smartWatchId.desc}</div>
      </div>
      <div className='px-5 mt-5 py-5 shadow-[5px_5px_20px_-12px_rgba(0,0,0,1)] rounded-2xl md:mx-32'>
        <div className='text-xl font-semibold pb-2'>Specifications</div>
        <div className='text-lg'>
          <div className='mt-3 mb-1'><strong className='font-medium'>Network: </strong>{data.myRes.smartWatchId.specs.network}</div>
          <div className='mb-1'><strong className='font-medium'>Color: </strong>{data.myRes.smartWatchId.color}</div>
          <div className='mb-1'><strong className='font-medium'>Display: </strong>{data.myRes.smartWatchId.specs.screenSize}</div>
          <div className='mb-1'><strong className='font-medium'>Processor: </strong>{data.myRes.smartWatchId.specs.soc} </div>
          <div className='mb-1'><strong className='font-medium'>OS: </strong>{data.myRes.smartWatchId.specs.os}</div>
          <div className='mb-1'><strong className='font-medium'>Camera: </strong>{data.myRes.smartWatchId.specs.camera}</div>
          <div className='mb-1'><strong className='font-medium'>Battery: </strong>{data.myRes.smartWatchId.specs.battery}</div>
          <div className='mb-1'><strong className='font-medium'>RAM: </strong>{data.myRes.smartWatchId.specs.ram}</div>
          <div className='mb-1'><strong className='font-medium'>ROM: </strong>{data.myRes.smartWatchId.specs.rom}</div>
          <div className='mb-1'><strong className='font-medium'>Weight: </strong>{data.myRes.smartWatchId.specs.weight}</div>
        </div>
      </div>
    </>

  )
}

export default SmartWatch
