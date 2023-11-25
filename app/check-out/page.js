'use client'
import ProductTabs from '@/components/ProductTabs'
import { CartContext } from '@/providers/CartProvider';
import React, { useState, useEffect, useContext } from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import 'flowbite';
import { TiDelete } from "react-icons/ti"
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
export const dynamic = 'force-dynamic'





const CheckOut = () => {
    const { addItemToCart, decrementItem, incrementItem, removeItemFromCart, renderTrigger, renderTriggerQuick, setRenderTriggerQuick, renderTriggerItemRemoved, setRenderTriggerItemRemoved, renderTriggerItemDecremented, setRenderTriggerItemDecremented, renderTriggerItemIncremented, setRenderTriggerItemIncremented, refreshLoginStatus, setRefreshLoginStatus, renderTriggerVerityFailed, setRenderTriggerVerityFailed } = useContext(CartContext)

    // const {} = useContext(CartContext)


    const router = useRouter()
    let myCart
    const [getCartLS, setGetCartLS] = useState({})
    const [getDeliveryAddress, setGetDeliveryAddress] = useState('')

    const [address, setAddress] = useState('')
    const [userID, setuserID] = useState('')


    const [dbAddress, setDbAddress] = useState("")
    const [newAddress, setNewAddress] = useState("")
    const [orderAddress, setOrderAddress] = useState("")

    const [verityCheck, setVerityCheck] = useState(true)
    const [verityOK, setVerityOK] = useState(true)



    // let discrepencyArray



    const fetchDeliveryAddress = async (token) => {
        const response = await fetch(process.env.NEXT_PUBLIC_AUTHENTICATE_USER, {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                auth_token: `${token}`
            })
        })
        const data = await response.json()
        console.log('KKKKKKKKKKKKKKK', data)
        if (data.myRes.success) {
            setGetDeliveryAddress(data.myRes.deliveryAddress)
            setDbAddress(data.myRes.deliveryAddress)
            setAddress(data.myRes.deliveryAddress)
            setuserID(data.myRes.userID)

            setOrderAddress(data.myRes.deliveryAddress)

        }
        else {
            toast.error('Security Issue, Login Again', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })


            localStorage.removeItem('auth_token')
            setRefreshLoginStatus(value => !value)
            router.push("/")


        }




    }


    useEffect(() => {
        setGetCartLS(JSON.parse(localStorage.getItem('Cart')) || {})
    }, [])

    const getPrice = async (id, name, checkCart) => {
        const response = await fetch(process.env.NEXT_PUBLIC_VERIFY_PRODUCT_INTEGRITY, {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                id: id,
                name: name
            })
        })
        const data = await response.json()
        // available as data.dbPrice
        if (parseInt(data.dbPrice) != parseInt(checkCart[id].itemPrice)) {
            // discrepencyArray.push(data.dbPrice)
            toast.error('Cart Inregrity Comprimised, Try Again', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })


            localStorage.removeItem('Cart')
            setRenderTriggerVerityFailed(value => !value)
            setVerityOK(false)
            // setRefreshLoginStatus(value => !value)
            router.push("/")
        }
    }

    useEffect(() => {
        let cartCompromised = null
        let discrepencyArray = []
        let checkCart = JSON.parse(localStorage.getItem('Cart'))
        // console.log('now', checkCart)



        for (let key in checkCart) {
            console.log('now1', key)
            console.log('now2', checkCart[key].itemName)

            getPrice(key, checkCart[key].itemName, checkCart)


            // now





            // tempCart.push({
            //     itemID: key,
            //     itemName: getCartLS[key].itemName,
            //     itemPrice: getCartLS[key].itemPrice,
            //     itemColor: getCartLS[key].itemColor,
            //     itemVariant: getCartLS[key].itemVariant,
            //     itemImgUrl: getCartLS[key].itemImgUrl,
            //     itemQty: getCartLS[key].itemQty
            // })
        }






    }, [verityCheck])

    useEffect(() => {

        const getToken = localStorage.getItem('auth_token')
        fetchDeliveryAddress(getToken)

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




    // const { addItemToCart, decrementItem, incrementItem, removeItemFromCart, renderTrigger, renderTriggerQuick, setRenderTriggerQuick, renderTriggerItemRemoved, setRenderTriggerItemRemoved, renderTriggerItemDecremented, setRenderTriggerItemDecremented, renderTriggerItemIncremented, setRenderTriggerItemIncremented } = useContext(CartContext)




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
        console.log('accumulator is:', accumulator)
        setCartReload(value => !value)
        setCartReloadAfterItemRemoved(value => !value)
        setCartReloadAfterItemDecremented(value => !value)
        setCartReloadAfterItemIncremented(value => !value)


    }, [renderTrigger, renderTriggerQuick, renderTriggerItemRemoved, renderTriggerItemDecremented, renderTriggerItemIncremented])

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

    }, [cartReload, cartReloadAfterItemRemoved, cartReloadAfterItemDecremented, cartReloadAfterItemIncremented])

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

    const handleOptionsChange = (e) => {
        setAddress(e.target.value)
        setOrderAddress(e.target.value)

        console.log('target is', e.target.value)

        console.log('address is', address)
        console.log('orderAddress is', orderAddress)


    }

    let orderArray = []

    console.log('THIS', cartList)


    const placeOrder = async () => {
        setVerityCheck(value => !value)
        if (verityOK === true) {


            // orderList: [{
            //     productIDfromDB: 45445455,
            //     itemQty: 21,
            //     itemColor: red,
            //     itemImgUrl: www.google.com,
            //     itemName: Asus,
            //     itemPrice: 999,
            //     itemVariant: red
            // }],

            const response = await fetch(process.env.NEXT_PUBLIC_PLACE_ORDER, {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({

                    userID: userID,
                    orderList: cartList,
                    orderTotal: amountPayable,
                    orderItemsCount: cartCount,
                    deliveryAddress: orderAddress,
                    orderStatus: "Paid",
                    orderID: Date.now()


                })
            })

            router.push("/my-orders")

        }
    }



    return (
        <div>
            <ProductTabs />
            <div className='shadow-[5px_5px_20px_-12px_rgba(0,0,0,1)] rounded-2xl px-3 py-8 md:mx-8 font-bold'>
                <div className='flex space-x-3 text-2xl pb-6 mb-2 border-b-4'>
                    <FaShoppingCart />
                    <div>You are about to place an order for the following items</div>
                </div>
                <div className=''>
                    {cartList && cartList.map((item, index) => {
                        return (
                            <div key={index} className={`flex flex-nowrap justify-between ${index + 1 === cartList.length ? '' : 'border-b-2'} my-4 py-2 px-1  hover:bg-slate-300 hover:rounded-md`}>
                                <div className='flex items-center space-x-4'>
                                    <div>
                                        <div className='w-[] font-semibold text-xl'>{item.itemName}</div>
                                        <div className='w-[] font-normal text-xl'>{item.itemColor}, {item.itemVariant}</div>
                                        <div className='w-[]'><span className='font-normal text-xl'>Quantity: </span>{item.itemQty}</div>
                                        <div className='w-[]'><span className='font-normal text-xl'>Price: {item.itemQty.toLocaleString('en-IN')} x ₹ {item.itemPrice.toLocaleString('en-IN')}=</span> ₹ {(item.itemPrice * item.itemQty).toLocaleString('en-IN')}</div>
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
                    Delivery Address:
                </div>
                {/* <div>{getDeliveryAddress}</div> */}
                <div className='flex space-x-3 font-normal text-xl mb-2'>
                    <input type="radio" id="dbAddressID" name="address" value={getDeliveryAddress} checked={address === `${getDeliveryAddress}`} onChange={handleOptionsChange} />
                    <label htmlFor="dbAddressID">{getDeliveryAddress}</label>

                </div>
                <hr />

                <div className='flex space-x-3 font-normal text-xl mt-2'>
                    <input type="radio" id="newAddressID" name="address" value={newAddress} checked={address === `${newAddress}`} onChange={handleOptionsChange} />
                    <label htmlFor="newAddressID"><input className='w-[100%]' type='text' value={newAddress} onChange={(e) => {
                        setNewAddress(e.target.value)
                        setAddress(e.target.value)
                        setOrderAddress(e.target.value)
                    }} placeholder='New address' /></label>

                </div>
                <div className='mt-3 font-normal'>
                    Delivering to: {orderAddress}
                </div>


            </div>





            <div className='shadow-[5px_5px_20px_-12px_rgba(0,0,0,1)] rounded-2xl px-3 py-8 md:mx-8 font-bold'>
                <div className='text-2xl pb-6 mb-2 border-b-4'>
                    Confirm Order:
                </div>
                <div>
                    <span className='font-normal text-xl'>Number of Items: </span>{cartCount.toLocaleString('en-IN')}
                </div>
                <div>
                    <span className='font-normal text-xl'>Items Total Price: </span>₹ {amountPayable.toLocaleString('en-IN')}
                </div>
                <div>
                    <span className='font-normal text-xl'>Discount: </span>₹ 0
                </div>
                <div>
                    <span className='font-normal text-xl'>Delivery Charges: </span>₹ 0
                </div>
                <div>
                    <span className='font-normal text-xl'>Amount Payable: </span>₹ {amountPayable.toLocaleString('en-IN')}
                </div>
                <div className="flex mx-2 my-2 mt-4 space-x-3 justify-end">
                    <button onClick={() => { router.push('/my-cart') }} className="rounded-md py-2 font-normal text-2xl bg-blue-500 hover:bg-pink-600  text-white w-[150px]">Cancel</button>
                    <button disabled={cartList && cartList.length==0} onClick={placeOrder} className="rounded-md py-2 font-normal text-2xl bg-blue-500 disabled:bg-black hover:bg-pink-600  text-white w-[150px]">Pay Now</button>
                </div>

            </div>

            {/* <div className="flex mx-2 my-2 justify-center">
                <button className="btn btn-primary bg-blue-500 hover:bg-pink-600  text-white w-[150px]">Place Order</button>
            </div> */}
        </div>
    )
}

export default CheckOut
