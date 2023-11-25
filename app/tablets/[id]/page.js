import { revalidateTag } from 'next/cache'
import React from 'react'
export const dynamic = 'force-dynamic'
import Link from 'next/link'
import AddToCartButton from '@/components/AddToCartButton'
import BuyNowButton from '@/components/BuyNowButton'
import Quantity from '@/components/Quantity'



export const generateMetadata = async ({ params: { id } }) => {
  const response = await fetch(`${process.env.GET_TABLETS}/${id}`)
  const data = await response.json()
  return {
    title: `eShop | ${data.myRes.tabletId.name}`,
    description: `${data.myRes.tabletId.desc}`,
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1,
      userScalable: 0
    },
    themeColor: 'rgb(37 99 235)'
  }
}



const Tablet = async ({ params: { id }, searchParams }) => {
  // console.log('ID is:',id)
  // console.log('Query is:',searchParams)



  const response = await fetch(`${process.env.GET_TABLETS}/${id}?variant=${searchParams.variant}&slug=${searchParams.slug}`, { next: { tags: ['updateVariants'] } })
  const data = await response.json()
  console.log('7777777777777777777777777777777777777777777777777')
  console.log('ok', data)

  return (
    <>
      <div className='shadow-[5px_5px_20px_-12px_rgba(0,0,0,1)] rounded-2xl md:mx-32'>
        <div className='flex flex-col px-[15px] pt-5 my-4 lg:my-2 space-x-2'>
          <img className='w-[100%] md:w-[30%] md:mx-auto lg:w-[20%] lg:mx-auto p-1' src={data.myRes.tabletId.imgUrl} alt="" />
          <div className='mt-4 text-xl'>
            <div className='font-bold'>{data.myRes.tabletId.name}</div>
            <div className='badge badge-info bg-gray-500 text-white py-3 mr-3'>{data.myRes.tabletId.color}</div>
            <div className='badge badge-neutral text-white py-3 mr-3'>{data.myRes.tabletId.variant}</div>
            {data.myRes.tabletId.quantity === 0 && <div className='badge mt-3 badge-warning bg-red-600 text-md text-white py-3'>Out of Stock</div>}
            <div className='font-semibold mt-7 text-lg'>{`₹ ${data.myRes.tabletId.price.toLocaleString('en-IN')}`}</div>
          </div>
        </div>
        <div className='flex text-xl pl-5 items-center'>
          Choose a variant:
          <div className='flex flex-col space-y-3 pt-3 text-sm md:text-lg'>
            {data.myRes.tabletVariants.map((tabletVariant, index) => {
              return (
                <Link key={tabletVariant._id} href={`/tablets/${tabletVariant._id}?variant=${tabletVariant.variant}&slug=${data.myRes.tabletId.slug}`} className='cursor-pointer'>
                  {/* checked={data.myRes.tabletId._id===tabletVariant._id ? `checked` : ``} */}

                  <button className={`${data.myRes.tabletId._id === tabletVariant._id ? 'bg-slate-700 text-white' : 'bg-white text-black'} px-2 py-1 rounded-md border-black border-2 hover:text-white hover:bg-blue-600`}>{tabletVariant.color}, {tabletVariant.variant}</button>



                </Link>)
            })}
          </div>
        </div>
        <Quantity/>
        <div className='flex px-[15px] pb-10 pr-4 md:pr-8  my-4 space-x-2 justify-end'>
        <AddToCartButton itemName={data.myRes.tabletId.name} itemID={data.myRes.tabletId._id} itemPrice={data.myRes.tabletId.price} itemColor={data.myRes.tabletId.color} itemVariant={data.myRes.tabletId.variant} itemImgUrl={data.myRes.tabletId.imgUrl} />
          {data.myRes.tabletId.quantity !== 0 && <BuyNowButton itemName={data.myRes.tabletId.name} itemID={data.myRes.tabletId._id} itemPrice={data.myRes.tabletId.price} itemColor={data.myRes.tabletId.color} itemVariant={data.myRes.tabletId.variant} itemImgUrl={data.myRes.tabletId.imgUrl} />}
        </div>
      </div>
      <div className='px-5 mt-5 py-5 shadow-[5px_5px_20px_-12px_rgba(0,0,0,1)] rounded-2xl md:mx-32'>
        <div className='text-xl font-semibold pb-3'>Product Description</div>
        <div className='text-lg'>{data.myRes.tabletId.desc}</div>
      </div>
      <div className='px-5 mt-5 py-5 shadow-[5px_5px_20px_-12px_rgba(0,0,0,1)] rounded-2xl md:mx-32'>
        <div className='text-xl font-semibold pb-2'>Specifications</div>
        <div className='text-lg'>
          <div className='mt-3 mb-1'><strong className='font-medium'>Network: </strong>{data.myRes.tabletId.specs.network}</div>
          <div className='mb-1'><strong className='font-medium'>Color: </strong>{data.myRes.tabletId.color}</div>
          <div className='mb-1'><strong className='font-medium'>Display: </strong>{data.myRes.tabletId.specs.screenSize}</div>
          <div className='mb-1'><strong className='font-medium'>Processor: </strong>{data.myRes.tabletId.specs.soc} </div>
          <div className='mb-1'><strong className='font-medium'>OS: </strong>{data.myRes.tabletId.specs.os}</div>
          <div className='mb-1'><strong className='font-medium'>Camera: </strong>{data.myRes.tabletId.specs.camera}</div>
          <div className='mb-1'><strong className='font-medium'>Battery: </strong>{data.myRes.tabletId.specs.battery}</div>
          <div className='mb-1'><strong className='font-medium'>RAM: </strong>{data.myRes.tabletId.specs.ram}</div>
          <div className='mb-1'><strong className='font-medium'>ROM: </strong>{data.myRes.tabletId.specs.rom}</div>
          <div className='mb-1'><strong className='font-medium'>Weight: </strong>{data.myRes.tabletId.specs.weight}</div>
        </div>
      </div>
    </>

  )
}

export default Tablet
