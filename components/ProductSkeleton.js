import React from 'react'
import styles from '@/styles/skeletonProduct.module.css'

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


const ProductSkeleton = () => {
    return (
        <>
            <div className='shadow-[5px_5px_20px_-12px_rgba(0,0,0,1)]'>
                <div className='flex flex-col px-[15px] pt-5 my-4 space-x-2'>
                    <div className={`${styles.skeletonImage} w-[100%] p-1`}></div>
                    <div className='mt-4 text-xl'>
                        <div className={`${styles.skeletonLong} font-bold`}></div>
                        <div className={`${styles.skeletonBadge} badge badge-info bg-gray-500 text-white py-3 mr-3`}></div>
                        <div className={`${styles.skeletonBadge} badge badge-neutral text-white py-3 mr-3`}></div>
                        <div className={`${styles.skeletonBadge} badge mt-3 badge-warning bg-red-600 text-md text-white py-3`}></div>
                        <div className={`${styles.skeletonBadge} font-semibold mt-7 text-lg`}></div>
                    </div>
                </div>
                <div className='flex px-[15px] pb-5 pr-4  my-4 space-x-2 justify-end'>
                    <button className='rounded-lg bg-primary transition-colors hover:bg-black font-medium px-2 py-1 text-white'>Add to Cart</button>
                    <button className='rounded-lg bg-green-500 font-medium px-2 py-1 transition-colors hover:bg-black text-white'>Buy Now</button>
                </div>
            </div>
            <div className='px-5 mt-5 py-5 shadow-[5px_5px_20px_-12px_rgba(0,0,0,1)]'>
                <div className={`${styles.skeletonLong} text-xl font-semibold pb-3`}></div>
                <div className={`${styles.skeletonShort} text-lg`}></div>
            </div>
            <div className='px-5 mt-5 py-5 shadow-[5px_5px_20px_-12px_rgba(0,0,0,1)]'>
                <div className={`${styles.skeletonLong} text-xl font-semibold pb-2`}></div>
                <div className='text-lg'>
                    <div className={`${styles.skeletonLong} mt-3 mb-1`}></div>
                    <div className={`${styles.skeletonShort} mb-1`}></div>
                    <div className={`${styles.skeletonLong} mb-1`}></div>
                    <div className={`${styles.skeletonShort} mb-1`}></div>
                    <div className={`${styles.skeletonShort} mb-1`}></div>
                    <div className={`${styles.skeletonLong} mb-1`}></div>
                    <div className={`${styles.skeletonLong} mb-1`}></div>
                    <div className={`${styles.skeletonLong} mb-1`}></div>
                    <div className={`${styles.skeletonShort} mb-1`}></div>
                </div>
            </div>
        </>
    )
}

export default ProductSkeleton
