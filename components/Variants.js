// 'use client'
// import React, {useState} from 'react'

// const Variants = ({data}) => {
//     const [isChecked, setisChecked] = useState()
//   return (
//     <div className='flex text-xl pl-5'>
//           Choose a variant:
//           <div className='flex ml-6 space-x-3'>
//             {data.myRes.mobileVariants.map((mobileVariant, index) => {
//               return (
//               <div className=' space-x-3'>
//                 <input type='radio' id={`${mobileVariant._id}`} name='variant' checked={data.myRes.mobileId._id===mobileVariant._id ? `checked` : isChecked} onChange={(e)=> {setisChecked(true)}}  />
//                 <label htmlFor={`${mobileVariant._id}`}>{mobileVariant.color}, {mobileVariant.variant}</label>
//               </div>)
//             })}
//           </div>
//         </div>
//   )
// }

// export default Variants
