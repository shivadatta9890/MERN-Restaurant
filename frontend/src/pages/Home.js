import React, {useRef} from "react";
import { useSelector } from "react-redux";
import Homecard from "../components/Homecard";
import Card from "../components/card";
import { GrPrevious, GrNext } from "react-icons/gr";
import Allproducts from "../components/Allproducts";
// import FilterProduct from "../components/filterProduct";
const Home = () => {
  const productsData = useSelector((state) => state.products.productsList);
  const homeProductsList = productsData.slice(0, 4);
  const vegetablesList = productsData.filter(
    (item) => item.category === "vegetables"
  );
  //  console.log(vegetablesList);

  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const scrollProduct = useRef();
  const nextProduct = () => {
    scrollProduct.current.scrollLeft += 200;
  };

  const previousProduct = () => {
    scrollProduct.current.scrollLeft -= 200;
  };
  return (
    <div className="p-2 md:p-4">
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2">
          <div className="flex gap-3 bg-slate-300 w-40 px-2 items-center rounded-full">
            <p className="text-sm font-medium text-slate-900">Bike Delivery</p>
            <img
              src="https://vectoricons.net/images/products/iconsets/bike@700x575.png"
              className="h-10 p-2"
              alt="delivery"
            />
          </div>
          <h2 className="text-4xl md:text-7xl font-bold py-3">
            Fastest Delivery in{" "}
            <span className="text-red-700">Quick Time..</span>
          </h2>
          <p className="py-3 text-base">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged..
          </p>
          <button className="font-bold text-slate-200 bg-red-500 m-5 px-7 py-2 rounded">
            Order Now
          </button>
        </div>
        <div className="md:w-1/2 flex flex-wrap gap-5 justify-center items-center p-4">
          {homeProductsList[0]
            ? homeProductsList.map((item) => {
                return (
                  <Homecard
                    key={item._id}
                    id={item._id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    category={item.category}
                  />
                );
              })
            : loadingArray.map((e, id) => {
                return <Homecard key={id} loading={"Loading..."} />;
              })}
        </div>
      </div>
      <div>
        <div className="flex w-full">
          <h2 className="font-bold text-slate-800 text-2xl capitalize mb-4">
            Fresh vegetables
          </h2>
          <div className="ml-auto flex gap-4">
            <button
              onClick={previousProduct}
              className="bg-slate-300 h-10 hover:bg-slate-400 text-base p-1 rounded"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-300 h-10 hover:bg-slate-400 text-base p-1 rounded"
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={scrollProduct}
        >
          {vegetablesList[0]
            ? vegetablesList.map((item) => {
                return (
                  <Card
                    key={item._id}
                    id={item._id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    category={item.category}
                  />
                );
              })
            : loadingArrayFeature.map((el, id) => {
                return <Card key={id} loading={"Loading..."} />;
              })}
        </div>
      </div>
      <Allproducts header={"Your Products"}/>
    </div>
  );
};

export default Home;
