import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Allproducts from "../components/Allproducts";
import { addCartItem } from "../redux/productSlice";
const Menu = ({header}) => {
  const { filterproducts } = useParams();
  const productsData = useSelector((state) => state.products.productsList);
  const productDisplay = productsData.filter(
    (el) => el._id === filterproducts
  )[0];

  const navigate = useNavigate();

  const dispatch = useDispatch();
 const hanldecartItems = (e)=>{
  dispatch(addCartItem(productDisplay));
 }

 const handleBuy = ()=>{
  dispatch(addCartItem(productDisplay));
  navigate("/cart");
 }

  // console.log("menu product is ", productDisplay);
  return (
    <div className="p-2 md:p-4">
      <div className="w-full max-w-4xl m-auto flex gap-7 bg-white">
        <div className="max-w-sm overflow-hidden w-full">
          <img
            src={productDisplay.image}
            alt="selected"
            className="hover:scale-105 cursor-pointer transition-all cursor:pointer"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h4 className="font-bold text-black-500 text-xl capitalize">
            {productDisplay.name}
          </h4>
          <p className="capitalize text-lg">{productDisplay.category}</p>
          <p className="text-lg">
            <span className="text-lg text-red-500">₹</span>{" "}
            {productDisplay.price}
          </p>
          <div className="flex gap-4 my-2">
            <button onClick={handleBuy} className="bg-red-500 text-white p-1 text-lg min-w-[100px] hover:bg-red-700 transition-all rounded">Buy</button>
            <button onClick={hanldecartItems} className="bg-red-500 text-white p-1 text-lg min-w-[150px] hover:bg-red-700 transition-all rounded ">Add To Cart</button>
          </div>
          <div className="">
            <p className="text-lg my-1">Description:</p>
            <p className="capitalize">{productDisplay.description}</p>
          </div>
        </div>
      </div>
      <Allproducts header={"Related Products"}/>
    </div>
  );
};

export default Menu;
