import React from 'react'
import Link from 'next/link'
import { ImMobile } from 'react-icons/im'
import { IoWatch } from 'react-icons/io5'
import { LiaTabletSolid, LiaLaptopSolid } from 'react-icons/lia'




const ProductTabs = () => {
    return (
        <div className='max-w-[100vw]'>
            <ul className='flex justify-normal space-x-3 px-3 bg-black text-white py-2 max-w-[100vw] overflow-auto'>
                <Link className='flex-shrink' href='/mobiles'>
                    <li className='flex items-center cursor-pointer py-2 px-[7px] rounded-lg hover:bg-blue-500 '>
                        <p className='mr-3'>Mobiles</p>
                        <div className='text-2xl'>
                            <ImMobile />
                        </div>
                    </li>
                </Link>
                <Link className='flex-shrink-0' href='/smartwatches'>
                    <li className='flex items-center cursor-pointer py-2 px-[7px] rounded-lg hover:bg-blue-500 '>
                        <p className='mr-3'>Smart Watches</p>
                        <div className='text-2xl'>
                            <IoWatch />
                        </div>
                    </li>
                </Link>
                <Link className='flex-shrink ' href='/tablets'>
                <li className='flex items-center cursor-pointer py-2 px-[7px] rounded-lg hover:bg-blue-500 '>
                    <p className='mr-3'>Tablets</p>
                    <div className='text-2xl'>
                        <LiaTabletSolid />
                    </div>
                </li>
                </Link>
                <Link className='flex-shrink' href='/laptops'>
                <li className='flex items-center cursor-pointer py-2 px-[7px] rounded-lg hover:bg-blue-500'>
                    <p className='mr-3'>Laptops</p>
                    <div className='text-2xl'>
                        <LiaLaptopSolid />
                    </div>
                </li>
                </Link>
            </ul>

        </div>
    )
}

export default ProductTabs
