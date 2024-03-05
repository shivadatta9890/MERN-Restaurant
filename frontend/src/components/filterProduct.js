import React from 'react'
import { CiForkAndKnife } from "react-icons/ci";
const FilterProduct = ({category,onClick}) => {
  return (
    <div onClick={onClick}>
        <div className='text-3xl p-5 rounded-full bg-blue-300 cursor-pointer'><CiForkAndKnife /></div>
        <p className='font-bold text-center mt-1 capitalize'>{category}</p>
    </div>
  )
}

export default FilterProduct;