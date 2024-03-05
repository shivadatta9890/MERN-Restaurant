import React, { useState, useEffect } from "react";
import FilterProduct from "./filterProduct";
import Card from "./card";
import { useSelector } from "react-redux";

const Allproducts = ({ header }) => {
  const productsData = useSelector((state) => state.products.productsList);

  const categories = [...new Set(productsData.map((el) => el.category))];

  const [filterproducts, setFilterproducts] = useState("");
  const [datafilter, setDatafilter] = useState(productsData);

  const loadingArrayFeature = new Array(10).fill(null);
  useEffect(() => {
    setDatafilter(productsData);
  }, [productsData]);
  const handleFilterproducts = (category) => {
    const filteredProduct = productsData.filter(
      (el) => el.category.toLowerCase() === category.toLowerCase()
    );
    setDatafilter(() => {
      return [...filteredProduct];
    });
  };
  return (
    <div>
      <div className="my-5">
        <h2 className=" text-4xl mb-4 text-slate-800">{header}</h2>
      </div>
      <div className="flex gap-5 justify-center">
        {
        categories[0] ?
          categories.map((el, id) => {
            return (
              <FilterProduct
                key={id}
                category={el}
                onClick={() => handleFilterproducts(el)}
              />
            );
          })
          :<p>Loading...</p>
          }
      </div>
      <div className="flex gap-2 mt-5 justify-center flex-wrap">
        {
        datafilter[0] ? 
        datafilter.map((el) => {
          return (
            <Card
              key={el._id}
              id={el._id}
              name={el.name}
              image={el.image}
              category={el.category}
              price={el.price}
            />
          );
        })
    :loadingArrayFeature.map((el, id) => {
        return <Card key={id} loading={"Loading..."} />;
      })
    }
      </div>
    </div>
  );
};

export default Allproducts;
