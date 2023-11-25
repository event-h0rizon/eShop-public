'use client'
import React, { useEffect, useState, useContext } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
export const dynamic = 'force-dynamic'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartContext } from '@/providers/CartProvider'


const SignUp = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [cPassword, setCPassword] = useState('')
    const [email, setEmail] = useState('')
    const [deliveryAddress, setDeliveryAddress] = useState('')
    const [pwdWarning, setPwdWarning] = useState(false)
    const [emailWarning, setEmailWarning] = useState(false)
    const [mobileWarning, setMobileWarning] = useState(false)
    const [disableButton, setDisableButton] = useState(true)
    const [mobile, setMobile] = useState('')
    const [isPwdVisible, setIsPwdVisible] = useState(false)

    const router = useRouter()

    const { refreshLoginStatus, setRefreshLoginStatus } = useContext(CartContext)




    useEffect(() => {
        if (password.length == 0 || cPassword.length == 0 || firstName.length == 0 || lastName.length == 0 || email.length == 0 || deliveryAddress.length == 0 || mobile.length == 0) {

            setDisableButton(true)
            setPwdWarning(false)

        }
        else {
            if (password === cPassword) {
                setDisableButton(false)
                setPwdWarning(false)
            }
            else {
                setDisableButton(true)
                setPwdWarning(true)

            }
        }

    }, [password, cPassword, firstName, lastName, email, deliveryAddress])


    const handleChange = (e) => {
        if (e.target.name === 'firstName') {
            setFirstName(e.target.value)
        }
        if (e.target.name === 'lastName') {
            setLastName(e.target.value)
        }
        if (e.target.name === 'email') {
            setEmail(e.target.value)
        }
        if (e.target.name === 'mobile') {
            setMobile(e.target.value)
        }
        if (e.target.name === 'password') {
            setPassword(e.target.value)
        }
        if (e.target.name === 'cPassword') {
            setCPassword(e.target.value)
        }
        if (e.target.name === 'deliveryAddress') {
            setDeliveryAddress(e.target.value)
        }
    }

    const togglePwdVisibility = () => {
        setIsPwdVisible(prev => !prev)
    }

    const signup = async () => {
        const response = await fetch(process.env.NEXT_PUBLIC_SIGNUP, {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
                mobile,
                deliveryAddress
            })
        })
        const data = await response.json()
        console.log(data)
        if (data.auth_token) {
            localStorage.setItem('auth_token', data.auth_token);
            toast.success(`Sign up success`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            router.push('/my-chats')
            setRefreshLoginStatus(value => !value)
        }
        if (data.dbUserEmailExists) {
            // alert('Email already Registerted')
            toast.error('Email is already registered', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setRefreshLoginStatus(value => !value)

        }
        if (data.dbUserMobileExists) {
            // alert('Mobile already Registerted')
            toast.error('Mobile number already registered', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setRefreshLoginStatus(value => !value)


        }

    }

    return (
        <div className=" bg-gray-100 py-16 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl ">

                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl text-center font-semibold">Sign Up for eShop</h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className='flex space-x-3'>
                                    <div className="relative">
                                        <input id="firstName" name="firstName" value={firstName} onChange={handleChange} type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="First Name" />
                                        <label htmlFor="firstName" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">First Name</label>
                                    </div>
                                    <div className="relative">
                                        <input id="lastName" name="lastName" value={lastName} onChange={handleChange} type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Last Name" />
                                        <label htmlFor="lastName" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Last Name</label>
                                    </div>
                                </div>

                                <div className="relative">
                                    <input id="email" name="email" type="email" value={email} onChange={handleChange} className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email Address" />
                                    <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                                </div>
                                <div className="relative">
                                    <input id="mobile" name="mobile" type="number" value={mobile} onChange={handleChange} className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Mobile Number" />
                                    <label htmlFor="mobile" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Mobile Number</label>
                                </div>
                                <div className="relative">
                                    <input autoComplete="off" id="deliveryAddress" value={deliveryAddress} onChange={handleChange} name="deliveryAddress" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Delivery Address" />
                                    <label htmlFor="deliveryAddress" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Delivery Address</label>
                                </div>
                                <div className='flex space-x-2 justify-between items-center'>
                                    <div className="relative w-[94%]">
                                        <input autoComplete="off" id="password" name="password" value={password} onChange={handleChange} type={`${isPwdVisible ? 'text' : 'password'}`} className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                                        <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                    </div>
                                    {isPwdVisible ? <AiFillEyeInvisible onClick={togglePwdVisibility} className='text-3xl' /> : <AiFillEye onClick={togglePwdVisibility} className='text-3xl' />}

                                </div>

                                <div className="relative">
                                    <input autoComplete="off" id="cPassword" name="cPassword" value={cPassword} onChange={handleChange} type={`${isPwdVisible ? 'text' : 'password'}`} className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Confirm Password" />
                                    <label htmlFor="cPassword" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Confirm Password</label>
                                </div>
                                <div className={`${pwdWarning ? 'block' : 'hidden'} text-sm pb-2 text-red-600`}>Passwords don't match.</div>
                                <div className={`${emailWarning ? 'block' : 'hidden'} text-sm pb-2 text-red-600`}>Email is already registered.</div>
                                <div className={`${mobileWarning ? 'block' : 'hidden'} text-sm pb-2 text-red-600`}>Mobile number is already registered.</div>
                                <div className="relative text-center">
                                    <button onClick={signup} disabled={disableButton} className="bg-blue-500 text-white rounded-md px-2 py-1 disabled:bg-black">Sign Up</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
