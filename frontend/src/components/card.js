import React from "react";
import { Link } from "react-router-dom";
import { addCartItem } from "../redux/productSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
const Card = ({ name, image, price, category, loading ,id }) => {

  const dispatch = useDispatch();
 const hanldecartItems = (e)=>{
  dispatch(addCartItem({
    _id:id,
    name:name,
    price:price,
    category:category,
    image:image
  }));
 }
  return (
    <div className="w-full min-w-[250px] max-w-[250px] bg-white shadow-lg drop-shadow-lg py-5 px-4 cursor-pointer flex flex-col ">
      {
        name ? <>
        <Link to={`/menu/${id}`} onClick={()=> window.scrollTo({top:"0",behavior:"smooth"})}>
        <div className="h-28 flex flex-col justify-center items-center">
        <img src={image} alt="vegetables" className="h-full" />
      </div>
      <h3 className="font-semibold text-slate-600 text-center capitalize text-lg my-1">
        {name}
      </h3>
      <p className="font-medium text-slate-500 text-center capitalize my-1">
        {category}
      </p>
      <p className="font-bold text-center">
        <span className="text-red-500 my-1">₹</span> {price}
      </p>
      </Link>
      <button className="bg-red-500 text-center w-full text-lg text-white my-2 capitalize p-2 rounded" onClick={()=>hanldecartItems(id)}>add to cart</button>
      </>
      :
      <div className="min-h-[140px] flex justify-center items-center"><p>{loading}</p></div>
      }
    </div>
  );
};

export default Card;
