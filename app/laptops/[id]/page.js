import { revalidateTag } from 'next/cache'
import React from 'react'
export const dynamic = 'force-dynamic'
import Link from 'next/link'
import AddToCartButton from '@/components/AddToCartButton'
import BuyNowButton from '@/components/BuyNowButton'
import Quantity from '@/components/Quantity'


export const generateMetadata = async ({ params: { id } }) => {
  const response = await fetch(`${process.env.GET_LAPTOPS}/${id}`)
  const data = await response.json()
  return {
    title: `eShop | ${data.myRes.laptopId.name}`,
    description: `${data.myRes.laptopId.desc}`,
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1,
      userScalable: 0
    },
    themeColor: 'rgb(37 99 235)'
  }
}



const Laptop = async ({ params: { id }, searchParams }) => {



  // console.log('ID is:',id)
  // console.log('Query is:',searchParams)



  const response = await fetch(`${process.env.GET_LAPTOPS}/${id}?variant=${searchParams.variant}&slug=${searchParams.slug}`, { next: { tags: ['updateVariants'] } })
  const data = await response.json()
  console.log('7777777777777777777777777777777777777777777777777')
  console.log('ok', data)

  return (
    <>
      <div className='shadow-[5px_5px_20px_-12px_rgba(0,0,0,1)] rounded-2xl md:mx-32'>
        <div className='flex flex-col px-[15px] pt-5 my-4 lg:my-2 space-x-2'>
          <img className='w-[100%] md:w-[30%] md:mx-auto lg:w-[20%] lg:mx-auto p-1' src={data.myRes.laptopId.imgUrl} alt="" />
          <div className='mt-4 text-xl'>
            <div className='font-bold'>{data.myRes.laptopId.name}</div>
            <div className='badge badge-info bg-gray-500 text-white py-3 mr-3'>{data.myRes.laptopId.color}</div>
            <div className='badge badge-neutral text-white py-3 mr-3'>{data.myRes.laptopId.variant}</div>
            {data.myRes.laptopId.quantity === 0 && <div className='badge mt-3 badge-warning bg-red-600 text-md text-white py-3'>Out of Stock</div>}
            <div className='font-semibold mt-7 text-lg'>{`₹ ${data.myRes.laptopId.price.toLocaleString('en-IN')}`}</div>
          </div>
        </div>
        <div className='text-xl pl-5 pb-3 pt-2 items-center'>
          Choose a variant:
          <div className='flex flex-col space-y-3 pt-3 text-sm md:text-lg'>
            {data.myRes.laptopVariants.map((laptopVariant, index) => {
              return (
                <Link key={laptopVariant._id} href={`/laptops/${laptopVariant._id}?variant=${laptopVariant.variant}&slug=${data.myRes.laptopId.slug}`} className='cursor-pointer'>
                  {/* checked={data.myRes.laptopId._id===laptopVariant._id ? `checked` : ``} */}

                  <button className={`${data.myRes.laptopId._id === laptopVariant._id ? 'bg-slate-700 text-white' : 'bg-white text-black'} px-2 py-1 rounded-md border-black border-2 hover:text-white hover:bg-blue-600`}>{laptopVariant.color}, {laptopVariant.variant}</button>



                </Link>)
            })}
          </div>
        </div>
        <Quantity/>
        <div className='flex px-[15px] pb-10 pr-4 md:pr-8  my-4 space-x-2 justify-end'>
          <AddToCartButton itemName={data.myRes.laptopId.name} itemID={data.myRes.laptopId._id} itemPrice={data.myRes.laptopId.price} itemColor={data.myRes.laptopId.color} itemVariant={data.myRes.laptopId.variant} itemImgUrl={data.myRes.laptopId.imgUrl} />
          {data.myRes.laptopId.quantity !== 0 && <BuyNowButton itemName={data.myRes.laptopId.name} itemID={data.myRes.laptopId._id} itemPrice={data.myRes.laptopId.price} itemColor={data.myRes.laptopId.color} itemVariant={data.myRes.laptopId.variant} itemImgUrl={data.myRes.laptopId.imgUrl} />}
        </div>
      </div>
      <div className='px-5 mt-5 py-5 shadow-[5px_5px_20px_-12px_rgba(0,0,0,1)] rounded-2xl md:mx-32'>
        <div className='text-xl font-semibold pb-3'>Product Description</div>
        <div className='text-lg'>{data.myRes.laptopId.desc}</div>
      </div>
      <div className='px-5 mt-5 py-5 shadow-[5px_5px_20px_-12px_rgba(0,0,0,1)] rounded-2xl md:mx-32'>
        <div className='text-xl font-semibold pb-2'>Specifications</div>
        <div className='text-lg'>
          <div className='mt-3 mb-1'><strong className='font-medium'>Network: </strong>{data.myRes.laptopId.specs.network}</div>
          <div className='mb-1'><strong className='font-medium'>Color: </strong>{data.myRes.laptopId.color}</div>
          <div className='mb-1'><strong className='font-medium'>Display: </strong>{data.myRes.laptopId.specs.screenSize}</div>
          <div className='mb-1'><strong className='font-medium'>Processor: </strong>{data.myRes.laptopId.specs.soc} </div>
          <div className='mb-1'><strong className='font-medium'>OS: </strong>{data.myRes.laptopId.specs.os}</div>
          <div className='mb-1'><strong className='font-medium'>Camera: </strong>{data.myRes.laptopId.specs.camera}</div>
          <div className='mb-1'><strong className='font-medium'>Battery: </strong>{data.myRes.laptopId.specs.battery}</div>
          <div className='mb-1'><strong className='font-medium'>RAM: </strong>{data.myRes.laptopId.specs.ram}</div>
          <div className='mb-1'><strong className='font-medium'>ROM: </strong>{data.myRes.laptopId.specs.rom}</div>
          <div className='mb-1'><strong className='font-medium'>Weight: </strong>{data.myRes.laptopId.specs.weight}</div>
        </div>
      </div>
    </>

  )
}

export default Laptop
