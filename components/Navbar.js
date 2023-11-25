'use client'
import React, { useState, useContext, useEffect } from 'react'
import Link from 'next/link'
import DD from './Cart'
import Cart from './Cart'
import Account from './Account'
import { CartContext } from '@/providers/CartProvider'
import { useRouter } from 'next/navigation'


const Navbar = () => {

    const { cart, sertCart, refreshLoginStatus, setRefreshLoginStatus, isLoggedIn, setIsLoggedIn } = useContext(CartContext)

    const router= useRouter()


    useEffect(() => {

        const getToken = localStorage.getItem('auth_token')
        console.log('ok bro', getToken)

        if (getToken) {
            setIsLoggedIn(true)
        }
        else {
            setIsLoggedIn(false)
        }

    }, [refreshLoginStatus])

    const logout= async ()=> {
        localStorage.removeItem('auth_token')
        // localStorage.removeItem('Cart')
        setRefreshLoginStatus(value=>!value)
        router.push("/")
    }




    // console.log(cart)

    return (
        <div className="navbar max-w-[100vw] min-h-[0px] h-[50px] py-7 bg-blue-600 text-white fixed z-10">

            <div className="flex-1 justify-between">
                <Link href='/' className="btn btn-ghost normal-case text-xl">eShop</Link>
                <div className='flex space-x-3 pr-4 items-center'>
                    <div className=''>
                        <Cart />
                    </div>
                    <Account />
                    {!isLoggedIn && <Link className='text-xl hover:bg-white hover:text-blue-700 border border-[rgba(0,0,0,0)] hover:border rounded-md px-2 py-1' href='/login'>Login</Link>}
                    {!isLoggedIn && <Link className='text-xl hover:bg-white hover:text-blue-700 border border-[rgba(0,0,0,0)] hover:border rounded-md px-2 py-1' href='/signup'>Sign Up</Link>}
                    {isLoggedIn && <button onClick={logout} className='text-xl hover:bg-white hover:text-blue-700 border border-[rgba(0,0,0,0)] hover:border rounded-md px-2 py-1'>Logout</button>}




                </div>
            </div>


        </div>
    )
}

export default Navbar

