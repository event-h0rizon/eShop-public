'use client'
import React, { useState, useEffect, useContext } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
export const dynamic = 'force-dynamic'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartContext } from '@/providers/CartProvider'
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';



const Login = () => {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    // const [pwdWarning, setPwdWarning] = useState(false)
    const [disableButton, setDisableButton] = useState(true)
    const [isPwdVisible, setIsPwdVisible] = useState(false)

    const router = useRouter()

    const {refreshLoginStatus, setRefreshLoginStatus} = useContext(CartContext)
    


    useEffect(() => {
        if (password.length == 0 || email.length == 0 ) {

            setDisableButton(true)
            // setPwdWarning(false)

        }
        else {
           setDisableButton(false)
        }

    }, [password, email])


    const handleChange = (e) => {
        if (e.target.name === 'email') {
            setEmail(e.target.value)
        }
       
        if (e.target.name === 'password') {
            setPassword(e.target.value)
        }
    }

    const togglePwdVisibility = () => {
        setIsPwdVisible(prev => !prev)
    }

    const login = async () => {
        const response = await fetch(process.env.NEXT_PUBLIC_LOGIN, {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                email,
                password
            })
        })
        const data = await response.json()
        console.log(data)
        if (data.myRes && data.myRes.auth_token) {
            localStorage.setItem('auth_token', data.myRes.auth_token);
            toast.success(`Welcome, ${data.myRes.firstName}`, {
                transition: Flip,
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
          
            router.push('/')
            setRefreshLoginStatus(value=>!value)
        }
        if (data.errorPWD) {
            // alert('Email already Registerted')
            toast.error('Incorrect Password', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setRefreshLoginStatus(value=>!value)

        }
        if (data.errorUSER) {
            // alert('Mobile already Registerted')
            toast.error('Email is not registered', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setRefreshLoginStatus(value=>!value)


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
                            <h1 className="text-2xl text-center font-semibold">eShop Login</h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                            
                                <div className="relative">
                                    <input id="email" name="email" type="email" value={email} onChange={handleChange} className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email Address" />
                                    <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                                </div>
                                
                              
                                <div className='flex space-x-2 justify-between items-center'>
                                    <div className="relative w-[94%]">
                                        <input autoComplete="off" id="password" name="password" value={password} onChange={handleChange} type={`${isPwdVisible ? 'text' : 'password'}`} className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                                        <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                    </div>
                                    {isPwdVisible ? <AiFillEyeInvisible onClick={togglePwdVisibility} className='text-3xl' /> : <AiFillEye onClick={togglePwdVisibility} className='text-3xl' />}

                                </div>

                                {/* <div className={`${pwdWarning ? 'block' : 'hidden'} text-sm pb-2 text-red-600`}>Passwords don't match</div> */}
                                <div className="relative text-center">
                                    <button onClick={login} disabled={disableButton} className="bg-blue-500 text-white rounded-md px-2 py-1 disabled:bg-black">Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
