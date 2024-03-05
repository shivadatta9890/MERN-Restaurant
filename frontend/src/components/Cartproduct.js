import React from "react";
import { TbPlus, TbMinus } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { removeCartItem } from "../redux/productSlice";
import { incrementQty } from "../redux/productSlice";
import { decrementQty } from "../redux/productSlice";
import { useDispatch } from "react-redux";
const Cartproduct = ({ name, price, category, image, id, qty, total }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-slate-200 flex p-2 gap-4 my-2 rounded border border-slate-300">
      <div className="p-3 bg-white">
        <img
          src={image}
          alt={name}
          className="h-28 w-36 object-cover overflow-hidden"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between">
          <h4 className="font-semibold text-black-500 text-lg capitalize">
            {name}
          </h4>
          <div
            className="text-slate-500 hover:text-red-500 font-bold cursor-pointer text-xl"
            onClick={() => dispatch(removeCartItem(id))}
          >
            <MdDelete />
          </div>
        </div>
        <p className="capitalize text-lg">{category}</p>
        <p className="text-lg">
          <span className="text-lg text-red-500">₹</span> {price}
        </p>
        <div className="flex gap-3 items-center">
          <button
            className="bg-blue-300 p-2 rounded-full"
            onClick={() => dispatch(decrementQty(id))}
          >
            <TbMinus />
          </button>
          <p className="font-semibold">{qty}</p>
          <button
            className="bg-blue-300 p-2 rounded-full"
            onClick={() => dispatch(incrementQty(id))}
          >
            <TbPlus />
          </button>
        </div>
        <div>
          <p className="text-red-500 font-semibold">
            ₹ <span className="text-black text-lg">{total}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cartproduct;
