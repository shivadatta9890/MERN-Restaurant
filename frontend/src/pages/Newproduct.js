import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { imagetoBase64 } from "../utilities/imagetobase64";
import { toast } from "react-hot-toast";
// import FileInput from "./chat";
const Newproduct = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
  });
  const uploadImage = async (e) => {
    const dataimg = await imagetoBase64(e.target.files[0]);

    setData((prev) => {
      return {
        ...prev,
        image: dataimg,
      };
    });
    // console.log(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { name, category, image, price, description } = data;
    // console.log(data);
    if (name && category && image && price && description) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/uploadproduct`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const res_data = await fetchData.json();
      console.log(res_data);
      toast.success(res_data.message);

      setData(()=>{
      return {
        name: "",
    category: "",
    image: "",
    price: "",
    description: "",
      }
      });
    }
    else{
      toast("Enter required Fields...")
    }
  };

  return (
    <div className="p-4">
      <form
        className="m-auto w-full max-w-md shadow flex flex-col p-4 bg-white rounded"
        onSubmit={submitHandler}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          autoComplete="off"
          name="name"
          value={data.name}
          onChange={handleChange}
          className="bg-slate-200 outline-blue-300 p-1 my-1 rounded"
        />
        <label htmlFor="category">Category</label>
        <select
          className="bg-slate-100 bg-white my-2 p-1"
          name="category"
          id="category"
          value={data.category}
          onChange={handleChange}
        >
          <option value={"other"}>Select anyone</option>
          <option value={"pizza"}>Pizza</option>
          <option value={"icecream"}>Ice Creams</option>
          <option value={"cakes"}>Cakes</option>
          <option value={"fruits"}>Fruits</option>
          <option value={"vegetables"}>vegatables</option>
          <option value={"burgers"}>Burgers</option>
          <option value={"rice"}>Rice</option>
        </select>
        <label htmlFor="image">
          Upload Image
          <div className="h-40 w-full bg-slate-300 my-3 rounded flex items-center justify-center">
            {data.image ? (
              <img src={data.image} alt="uploadedimgg" className="h-full p-1" />
            ) : (
              <span className="text-7xl cursor-pointer">
                <FaCloudUploadAlt />
              </span>
            )}

            <input
              type="file"
              accept="image/*"
              id="image"
              className="hidden"
              onChange={uploadImage}
            />
          </div>
        </label>
        <label htmlFor="price">Price</label>
        <input
          type="text"
          id="price"
          name="price"
          value={data.price}
          onChange={handleChange}
          className="bg-slate-200 rounded outline-blue-300 p-1 my-1"
        />

        <label htmlFor="description">Description</label>
        <textarea
          rows={4}
          cols={5}
          className="bg-slate-300 rounded outline-blue-300 resize-none p-1 my-1"
          id="description"
          name="description"
          value={data.description}
          onChange={handleChange}
        ></textarea>
        <button className="bg-blue-300 my-2 p-2 rounded text-2xl">
          Save Product
        </button>
      </form>
    </div>
  );
};

export default Newproduct;
