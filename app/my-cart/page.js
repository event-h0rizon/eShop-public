'use client'
import ProductTabs from '@/components/ProductTabs'
import { CartContext } from '@/providers/CartProvider';
import React, { useState, useEffect, useContext } from 'react'
import { FaShoppingCart } from "react-icons/fa";
import Link from 'next/link';

import 'flowbite';
import { TiDelete } from "react-icons/ti"
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
export const dynamic = 'force-dynamic'




const MyCart = () => {

    let myCart
    const [getCartLS, setGetCartLS] = useState({})
    useEffect(() => {
        setGetCartLS(JSON.parse(localStorage.getItem('Cart')) || {})

    }, [])


    // useEffect(() => {
    //     const myCart = JSON.parse(localStorage.getItem('Cart'))
    //     setGetCartLS(myCart)
    // }, [])




    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const [cartReload, setCartReload] = useState(false)
    const [cartReloadAfterItemRemoved, setCartReloadAfterItemRemoved] = useState(false)
    const [cartReloadAfterItemDecremented, setCartReloadAfterItemDecremented] = useState(false)
    const [cartReloadAfterItemIncremented, setCartReloadAfterItemIncremented] = useState(false)
    const [cartReloadAfterVerityFailed, setCartReloadAfterVerityFailed] = useState(false)





    const { addItemToCart, decrementItem, incrementItem, removeItemFromCart, renderTrigger, renderTriggerQuick, setRenderTriggerQuick, renderTriggerItemRemoved, setRenderTriggerItemRemoved, renderTriggerItemDecremented, setRenderTriggerItemDecremented, renderTriggerItemIncremented, setRenderTriggerItemIncremented, renderTriggerVerityFailed, setRenderTriggerVerityFailed } = useContext(CartContext)




    // let getCartLS
    // let cartList= []
    const [cartList, setCartList] = useState([])
    const [cartCount, setCartCount] = useState(0)

    const [amountPayable, setAmountPayable] = useState(0)


    useEffect(() => {
        setGetCartLS(JSON.parse(localStorage.getItem('Cart')))
        let tempCart = []
        console.log('Cart is', getCartLS)

        for (let key in getCartLS) {
            console.log(getCartLS[key])
            tempCart.push({
                itemID: key,
                itemName: getCartLS[key].itemName,
                itemPrice: getCartLS[key].itemPrice,
                itemColor: getCartLS[key].itemColor,
                itemVariant: getCartLS[key].itemVariant,
                itemImgUrl: getCartLS[key].itemImgUrl,
                itemQty: getCartLS[key].itemQty
            })
        }
        setCartList(tempCart)
        // console.log('Array is ++++++++', cartList)
        let accumulator = 0
        let itemsInCart = 0
        for (let i = 0; i < tempCart.length; i++) {
            accumulator = parseInt(tempCart[i].itemPrice * tempCart[i].itemQty) + parseInt(accumulator)
            itemsInCart = parseInt(tempCart[i].itemQty) + parseInt(itemsInCart)
        }
        setCartCount(itemsInCart)
        setAmountPayable(accumulator)
        console.log('here', accumulator)
        setCartReload(value => !value)
        setCartReloadAfterItemRemoved(value => !value)
        setCartReloadAfterItemDecremented(value => !value)
        setCartReloadAfterItemIncremented(value => !value)
        setCartReloadAfterVerityFailed(value => !value)



    }, [renderTrigger, renderTriggerQuick, renderTriggerItemRemoved, renderTriggerItemDecremented, renderTriggerItemIncremented, renderTriggerVerityFailed])

    useEffect(() => {
        setGetCartLS(JSON.parse(localStorage.getItem('Cart')))
        let tempCart = []
        console.log('Cart is', getCartLS)

        for (let key in getCartLS) {
            console.log(getCartLS[key])
            tempCart.push({
                itemID: key,
                itemName: getCartLS[key].itemName,
                itemPrice: getCartLS[key].itemPrice,
                itemColor: getCartLS[key].itemColor,
                itemVariant: getCartLS[key].itemVariant,
                itemImgUrl: getCartLS[key].itemImgUrl,
                itemQty: getCartLS[key].itemQty
            })
        }
        setCartList(tempCart)
        // console.log('Array is ++++++++', cartList)
        let accumulator = 0
        let itemsInCart = 0
        for (let i = 0; i < tempCart.length; i++) {
            accumulator = parseInt(tempCart[i].itemPrice * tempCart[i].itemQty) + parseInt(accumulator)
            itemsInCart = parseInt(tempCart[i].itemQty) + parseInt(itemsInCart)
        }
        setCartCount(itemsInCart)
        setAmountPayable(accumulator)

    }, [cartReload, cartReloadAfterItemRemoved, cartReloadAfterItemDecremented, cartReloadAfterItemIncremented, cartReloadAfterVerityFailed])

    const handleRemoveFromCart = async (itemID) => {
        // const cartItem = {
        //   itemName,
        //   itemID,
        //   itemPrice,
        //   itemColor,
        //   itemVariant,
        //   itemImgUrl,
        //   itemQty: 1
        // }
        removeItemFromCart(itemID)
        // setRenderTriggerQuick(prevValue => !prevValue)
        // setRenderTriggerItemRemoved(prevValue => !prevValue)

    }
    const handleDecrementItem = async (itemID, itemQty) => {

        decrementItem(itemID, itemQty)


    }

    const handleIncrementItem = async (itemID, itemQty) => {

        incrementItem(itemID, itemQty)


    }



    return (
        <div>
            <ProductTabs />
            <div className='shadow-[5px_5px_20px_-12px_rgba(0,0,0,1)] rounded-2xl px-3 py-8 md:mx-8 font-bold'>
                <div className='flex space-x-3 text-2xl pb-6 mb-2 border-b-4'>
                    <FaShoppingCart />
                    <div>Cart Details:</div>
                </div>
                <div className=''>
                    {cartList && cartList.length == 0 ? <div className='flex justify-center'><img className='w-[200px]' src="/emptycart.png" alt="" /></div> : <div></div>}
                    {cartList && cartList.map((item, index) => {
                        return (
                            <div key={index} className={`flex flex-nowrap justify-between ${index + 1 === cartList.length ? '' : 'border-b-2'} my-4 py-2 px-1  hover:bg-slate-300 hover:rounded-md`}>
                                <div className='flex items-center space-x-4'>
                                    <button onClick={() => { handleRemoveFromCart(item.itemID) }}>
                                        <TiDelete className='text-red-600 text-4xl md:hover:text-6xl hover:cursor-pointer' />
                                    </button>
                                    <div>
                                        <div className='w-[] font-semibold'>{item.itemName}</div>
                                        <div className='w-[] font-normal'>{item.itemColor}, {item.itemVariant}</div>
                                        <div className='w-[]'><span className='font-normal'>Quantity: </span><button disabled={item.itemQty == 1 ? 'true' : ''} className='disabled:text-slate-600' onClick={() => { handleDecrementItem(item.itemID, item.itemQty) }}><AiFillMinusCircle className='inline mr-2 text-xl  hover:bg-white hover:rounded-full hover:cursor-pointer hover:text-blue-600' /></button>{item.itemQty}<button onClick={() => { handleIncrementItem(item.itemID, item.itemQty) }}><AiFillPlusCircle className='inline ml-2 text-xl hover:bg-white hover:rounded-full hover:cursor-pointer hover:text-blue-600' /></button></div>
                                        <div className='w-[]'><span className='font-normal'>Price: {item.itemQty.toLocaleString('en-IN')} x ₹ {item.itemPrice.toLocaleString('en-IN')}=</span> ₹ {(item.itemPrice * item.itemQty).toLocaleString('en-IN')}</div>
                                    </div>
                                </div>

                                <div className=''>
                                    <img src={item.itemImgUrl} className='w-[100px] h-[100px]' alt="" />
                                </div>

                            </div>

                        )
                    })}

                </div>

            </div>
            <div className='shadow-[5px_5px_20px_-12px_rgba(0,0,0,1)] rounded-2xl px-3 py-8 md:mx-8 font-bold'>
                <div className='text-2xl pb-6 mb-2 border-b-4'>
                    Cart Summary:
                </div>
                <div>
                    <span className='font-normal'>Number of Items: </span>{cartCount.toLocaleString('en-IN')}
                </div>
                <div>
                    <span className='font-normal'>Amount Payable: </span>₹ {amountPayable.toLocaleString('en-IN')}
                </div>
                <div className="flex mx-2 my-2 mt-4 justify-center">
                    <button disabled={cartList.length == 0} className="rounded-md py-2 font-normal text-2xl bg-blue-500 hover:bg-pink-600 disabled:bg-slate-900 disabled:text-white  text-white w-[150px]">{cartList && cartList.length!=0 ?<Link href='/check-out'>Check Out</Link> : <div>Check Out</div>}</button>
                </div>

            </div>
            {/* <div className="flex mx-2 my-2 justify-center">
                <button className="btn btn-primary bg-blue-500 hover:bg-pink-600  text-white w-[150px]">Proceed to Check out</button>
            </div> */}
        </div>
    )
}

export default MyCart
