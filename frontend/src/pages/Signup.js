import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import signupgif from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { imagetoBase64 } from "../utilities/imagetobase64";
import {toast} from "react-hot-toast";
const Signup = () => {
  const [showpassword, setShowpassword] = useState(false);
  const [showconfirmpassword, setShowconfirmpassword] = useState(false);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    image:"",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handlePassword = () => {
    setShowpassword((show) => !show);
  };
  const handleconfirmPassword = () => {
    setShowconfirmpassword((show) => !show);
  };

  const handleProfileimage = async (e)=>{
    const data = await imagetoBase64(e.target.files[0]) 
    // console.log(data);

    setData((prev)=>{
      return {
        ...prev,
        image:data
      }
    })
  }


// console.log(process.env.REACT_APP_SERVER_DOMAIN);

  const handlesubmit = async(e)=>{
    e.preventDefault();
    const {firstname,lastname,email,password,confirmpassword} = data;
    if(firstname && lastname && email && password && confirmpassword){
      if(password === confirmpassword){
        const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/signup`,{
          method:"POST",
          headers:{
            "content-type":"application/json",
          },
          body:JSON.stringify(data)

        });

        const res_data = await fetchData.json()
        // console.log(res_data);
        // alert(res_data.message);

        toast(res_data.message);
        
        // alert("successfully logged in");
        // alert(res_data.message);
        
        if(res_data.alert){
          navigate("/login");
        }

      }
      else{
        toast("passwords not matching");
      }
    }
    else{
      toast("Enter required fields");
    }
  }

  return (
    <div className="p-3 md:p-4">
      <div className="w-full bg-white max-w-sm m-auto flex flex-col items-center p-4 rounded">
        {/* <h1 className='text-center font-bold text-2xl'>Signup</h1> */}
        <div className="w-20 h-20 overflow-hidden rounded-full shadow-md drop-shadow-md m-auto relative">
          <img src={data.image ? data.image : signupgif} alt="signup logo gif" className="w-full h-full" />

          <label htmlFor="profile">
          <div className="absolute w-full h-1/3 text-white bg-slate-500 bottom-0 text-center bg-opacity-50">
            <p className="text-white p-1 text-sm cursor-pointer">Upload</p>
          </div>
          <input type="file" id="profile" accept="image/*" className="hidden" onChange={handleProfileimage} />
          </label>

        </div>

        <form className="w-full py-4" onSubmit={handlesubmit}>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            value={data.firstname}
            onChange={handleChange}
            className="w-full mt-1 mb-2 bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
          />

          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            value={data.lastname}
            onChange={handleChange}
            className="w-full mt-1 mb-2 bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={data.email}
            onChange={handleChange}
            className="w-full mt-1 mb-2 bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
          />

          <label htmlFor="password">Password</label>
          <div className=" flex items-center mt-1 mb-2 bg-slate-200 px-2 py-1 focus-within:outline rounded focus-within:outline-blue-300">
            <input
              type={showpassword ? "text" : "password"}
              name="password"
              id="password"
              value={data.password}
              onChange={handleChange}
              className="w-full bg-slate-200 border-none outline-none h-7"
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handlePassword}
            >
              {showpassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
          <label htmlFor="confirmpassword">Confirm Password</label>
          <div className=" flex items-center mt-1 mb-2 bg-slate-200 px-2 py-1 focus-within:outline rounded focus-within:outline-blue-300">
            <input
              type={showconfirmpassword ? "text" : "password"}
              name="confirmpassword"
              id="confirmpassword"
              value={data.confirmpassword}
              onChange={handleChange}
              className="w-full bg-slate-200 border-none outline-none h-7"
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleconfirmPassword}
            >
              {showconfirmpassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
          <button type="submit" className="w-full bg-blue-300 mt-4 py-1 rounded text-xl">
            Sign Up
          </button>
        </form>
        <p>
          Already Have an account ?{" "}
          <Link to={"../login"} className="text-red-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
