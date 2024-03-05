import React from 'react'
import { Link } from 'react-router-dom';
const Homecard = ({image,name,price,category,loading,id}) => {
  return (
    <div className='bg-white shadow-md p-2 rounded min-w-[180px] min-h-[160px]'>
      {
        name ? (
        <>
        <Link to={`/menu/${id}`} onClick={()=> window.scrollTo({top:"0",behavior:"smooth"})}>
        <div className="w-40 min-h-[150px]">
        <img src={image} className='w-full h-full' alt="product"/>
      </div>
      <h3 className='font-semibold text-slate-600 text-center capitalize text-lg my-1'>{name}</h3>
      <p className='font-medium text-slate-500 text-center capitalize my-1'>{category}</p>
      <p className='font-bold text-center'><span className='text-red-500 my-1'>₹</span> {price}</p>
        </Link>
        </>
        ):<p className='text-center my-20'>{loading}</p>
      }
      </div>
  )
}

export default Homecard;