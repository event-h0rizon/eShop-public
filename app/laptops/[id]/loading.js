import React from 'react'
import ProductTabs from '@/components/ProductTabs'
import styles from '@/styles/skeletonProduct.module.css'



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

const Loading = () => {

  const skeletonLoader = [0, 1, 2, , 3, 4, 5, 6, 7, 8, 9]
  return (
    <>
      <div className='shadow-[5px_5px_20px_-12px_rgba(0,0,0,1)] rounded-2xl md:mx-32'>
        <div className='flex flex-col px-[15px] pt-5 my-4 lg:my-2 space-x-2'>
          <div className={`${styles.skeletonImageResponsive}  w-[100%] h-[400px] md:w-[30%] md:mx-auto md:h-[300px] lg:w-[20%] lg:mx-auto lg:h-[300px] p-1 rounded-md`}></div>
          <div className='mt-4 text-xl'>
            <div className={`${styles.skeletonLong} font-bold rounded-md`}></div>
            <div className={`${styles.skeletonBadge} badge badge-info bg-gray-500 text-white py-3 mr-3`}></div>
            <div className={`${styles.skeletonBadge} badge badge-info text-white py-3 mr-3`}></div>
            <div className={`${styles.skeletonBadge} badge mt-3 badge-warning bg-red-600 text-md text-white py-3`}></div>
            <div className={`${styles.skeletonBadge} font-semibold mt-7 text-lg rounded-md`}></div>
          </div>
        </div>
        <div className='flex px-[15px] pb-10 pr-4 md:pr-8  my-4 space-x-2 justify-end'>
          <button className='rounded-lg bg-blue-600 transition-colors hover:bg-black font-medium px-3 py-2 text-white shadow-[5px_5px_20px_-4px_rgba(0,0,0,1)] '>Add to Cart</button>
          <button className='rounded-lg bg-green-500 font-medium px-2 py-1 transition-colors hover:bg-black text-white shadow-[5px_5px_20px_-4px_rgba(0,0,0,1)]'>Buy Now</button>
        </div>
      </div>
      <div className='px-5 mt-5 py-5 shadow-[5px_5px_20px_-12px_rgba(0,0,0,1)] rounded-2xl md:mx-32'>
        <div className={`${styles.skeletonLong} text-xl font-semibold pb-3 mb-4 rounded-md`}></div>
        <div className={`${styles.skeletonShort} text-lg rounded-md`}></div>
      </div>
      <div className='px-5 mt-5 py-5 shadow-[5px_5px_20px_-12px_rgba(0,0,0,1)] rounded-2xl md:mx-32'>
        <div className={`${styles.skeletonLong} text-xl font-semibold pb-2 rounded-md`}></div>
        <div className='text-lg'>
          <div className={`${styles.skeletonLong} mt-3 mb-1 rounded-md`}></div>
          <div className={`${styles.skeletonShort} mb-1 rounded-md`}></div>
          <div className={`${styles.skeletonLong} mb-1 rounded-md`}></div>
          <div className={`${styles.skeletonShort} mb-1 rounded-md`}></div>
          <div className={`${styles.skeletonShort} mb-1 rounded-md`}></div>
          <div className={`${styles.skeletonLong} mb-1 rounded-md`}></div>
          <div className={`${styles.skeletonLong} mb-1 rounded-md`}></div>
          <div className={`${styles.skeletonLong} mb-1 rounded-md`}></div>
          <div className={`${styles.skeletonShort} mb-1 rounded-md`}></div>
        </div>
      </div>
    </>
  )
}

export default Loading
