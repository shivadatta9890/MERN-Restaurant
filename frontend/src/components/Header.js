import React, { useState } from "react";
import logo from "../assest/logo.png";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import toast from "react-hot-toast";
const Header = () => {
  const [showitems, setShowitems] = useState(false);
  const userData = useSelector((state) => state.user);

  const dispatch = useDispatch();
  // console.log("header data " ,userData);
  const handlemenu = () => {
    setShowitems((prev) => !prev);
  };

  const handlelogout = () => {
    dispatch(logoutRedux());
    toast("Logout successful");
  };

  const cartData  = useSelector((state)=> state.products.cartItem);

  // console.log(process.env.REACT_APP_ADMIN_EMAIL);
  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      {/* desktop */}
      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-11">
            <img src="https://tse4.mm.bing.net/th?id=OIP.6kcZou42RsNwy8Xjd7r62AHaFC&pid=Api&P=0&h=180" alt="logo" className="h-full" />
          </div>
        </Link>
        <div className="flex items-center gap-6 md:gap-7">
          <nav className="gap-5 md:gap-7 text-base md:text-lg hidden md:flex">
            <Link to={""}>Home</Link>
            <Link to={"menu/65c73ce896fd3cae8e601f79"}>Menu</Link>
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>
          <div className="text-2xl text-slate-600 relative">
            <Link to="cart"><BsCartFill />
            <div className="absolute -top-1 -right-5 text-white text-sm bg-red-500 h-5 w-7 rounded-full m-0 p-0 text-center">
              {cartData.length}
            </div>
          </Link>
          </div>
          <div className="text-sm text-slate-600" onClick={handlemenu}>
            <div className="border-2 border-solid border-slate-600 rounded-full p-2 cursor-pointer">
              {userData.firstname ? userData.firstname : <FaUserAlt />}
            </div>
            {showitems && (
              <div className="absolute shadow bg-white drop-shadow-md text-base right-2 py-2 px-4 flex flex-col min-w-[120px] text-center">
                {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                  <Link
                    to={"newproduct"}
                    className="whitespace-nowrap cursor-pointer"
                  >
                    New Product
                  </Link>
                )}
                {userData.firstname ? (
                  <p
                    className="cursor-pointer bg-blue-300 p-1 my-1 w-full"
                    onClick={handlelogout}
                  >
                    Logout
                  </p>
                ) : (
                  <Link
                    to={"login"}
                    className="whitespace-nowrap cursor-pointer"
                  >
                    Login
                  </Link>
                )}

                <nav className="text-base md:text-lg flex flex-col my-1 md:hidden">
                  <Link to={""} className="px-2 py-1">Home</Link>
                  <Link to={"menu/65c73c3e96fd3cae8e601f71"} className="px-2 py-1">Menu</Link>
                  <Link to={"about"} className="px-2 py-1">About</Link>
                  <Link to={"contact"} className="px-2 py-1">Contact</Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
    </header>
  );
};

export default Header;
