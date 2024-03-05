import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { setDataproduct } from "./redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Success from "./pages/success";
const App = () => {
  const dispatch = useDispatch();
  const productsData = useSelector(state => state.products)

  const user = useSelector((state)=> state.user);


  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/products`
      );
      const data = await res.json();
      console.log(data);
      dispatch(setDataproduct(data));
    })();
  }, []);
  console.log(productsData);

  return (
    <>
      <Toaster />
      <div>
        <Header />
        <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
          {/* bg-slate-100 */}
          <Outlet/>
        </main>
      </div>
    </>
  );
};

export default App;
