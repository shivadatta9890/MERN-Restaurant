import React,{useState} from 'react'
import { Link,useNavigate } from "react-router-dom";
import signupgif from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import {toast} from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { loginRedux } from '../redux/userSlice';
const Login = () => {
  const [showpassword, setShowpassword] = useState(false);
  const [data, setData] = useState({ 
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const userData = useSelector(state => state);

  const dispatch = useDispatch()

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

  const handlesubmit = async(e)=>{
    e.preventDefault();
    const {email,password} = data;
    if( email && password){
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/login`,{
        method:"POST",
        headers:{
          "content-type":"application/json",
        },
        body:JSON.stringify(data)
      });

      const res_data = await fetchData.json()
      // console.log(res_data);
      toast.success(res_data.message);
      if(res_data.alert){
        dispatch(loginRedux(res_data));
        setTimeout(()=>{
          navigate("/");
        },2000);
      }
      
      else{
        console.log("Invalid Credentials...");
      }
      
  
    }
    else{
      toast("Enter required fields");
    }

  }
  // console.log(userData);


  return (
      <div className="p-3 md:p-4">
      <div className="w-full bg-white max-w-sm m-auto flex flex-col items-center p-4 rounded">
        {/* <h1 className='text-center font-bold text-2xl'>Signup</h1> */}
        <div className="w-20 overflow-hidden rounded-full shadow-md drop-shadow-md">
          <img src={signupgif} alt="signup logo gif" className="w-full" />
        </div>

        <form className="w-full py-4" onSubmit={handlesubmit}>
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
          <button type="submit" className="w-full bg-blue-300 mt-4 py-1 rounded text-xl">
            Login
          </button>
        </form>
        <p>
          Don't Have an account ?{" "}
          <Link to={"/signup"} className="text-red-600">
            Sign up
          </Link>
        </p>
      </div>
    </div>
    
  )
}

export default Login;