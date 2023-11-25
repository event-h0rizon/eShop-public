import React from 'react'
import ProductTabs from '@/components/ProductTabs'
import styles from '@/styles/skeleton.module.css'



export const metadata = {
  title: 'eShop | Mobiles',
  description: 'Latest mobiles from all the leading brands in the world.',
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
      <ProductTabs />
      <div className='md:grid md:grid-cols-2 md:space-x-2 lg:grid-cols-3 2xl:grid-cols-4'>
        {skeletonLoader.map((skeleton, index) => {
          return (

            <div key={skeleton}>
              <div className='flex px-[15px] pt-5 my-4 space-x-2'>
                <div className={`${styles.skeletonImage} rounded-md`}></div>
                <div className='pl-[15px]'>
                  <div className={`${styles.skeletonLong} my-8 rounded-md`}></div>
                  <div className={`${styles.skeletonShort} w-[100px] rounded-md`}></div>
                </div>
              </div>
              <div className='flex px-[15px] pb-5 pr-4 my-4 space-x-2 justify-end'>
                <button className='rounded-lg bg-blue-600 transition-colors hover:bg-black font-medium px-2 py-1 text-white'>Add to Cart</button>
                <button className='rounded-lg bg-green-500 font-medium px-2 py-1 transition-colors hover:bg-black text-white'>Buy Now</button>

              </div>
            </div>
          )
        })}
      </div>




    </>
  )
}

export default Loading
