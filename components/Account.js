import React, { useContext, useRef } from 'react'
import 'flowbite';
import { CartContext } from '@/providers/CartProvider';
import Link from 'next/link';

const Account = () => {

    const { isLoggedIn, setIsLoggedIn } = useContext(CartContext)
    const myRef = useRef(null)

    return (
        <div className={`${!isLoggedIn ? 'hidden' : 'block'}`}>
            <label tabIndex={0} ref={myRef} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="btn btn-ghost btn-circle">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img src='/logo.png' alt='error' />
                    </div>
                </label>
            </label>


            {/* <!-- Dropdown menu --> */}
            <div id="dropdown" className="z-10 hidden bg-white  rounded-lg shadow w-[400px] dark:bg-gray-700">
                <div className=" flex-col space-y-3 card-body text-black">
                    <Link onClick={()=>{myRef.current.click()}} href='/my-orders'>My Orders</Link>
                    <Link onClick={()=>{myRef.current.click()}} href='/my-cart'>My Cart</Link>
                    <Link onClick={()=>{myRef.current.click()}} href='/check-out'>Check Out</Link>

                </div>
            </div>
        </div>
    )
}

export default Account

{/* <div id="dropdownCart" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
<div className="card-body text-black">
    <span className="font-bold text-lg">7 Items</span>
    <span className=" text-black">Subtotal: $999</span>
    <div className="card-actions">
        <button className="btn btn-primary btn-block bg-blue-500 hover:bg-pink-600 text-white">View cart</button>
    </div>
</div>
</div> */}
