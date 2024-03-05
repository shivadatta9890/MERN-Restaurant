const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// const { default: Stripe } = require("stripe");
const dotenv = require("dotenv").config();
const app = express();
// const Stripe = require('stripe')
// const stripe = require("stripe")("sk_test_51OjfwUSEBecV9f3bOZy19kABFNXhiiQFmKWcThofrclNAXJ3ll5LrOcYV6rAxOHIPZdlkpQIAcfGU7r1J8a7uB7v00EaWO6kYJ");



// console.log(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json({ limit: "20mb" }));
const PORT = process.env.PORT || 8080;
// console.log(process.env.MONGODB_URL);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("connected to database");
  })
  .catch((e) => {
    console.log(e);
    console.log("could not connect");
  });

// schema

const userSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmpassword: String,
  image: String,
});

// model

const userModel = mongoose.model("user", userSchema);

// get data
app.get("/products",async(req,res)=>{
  const data = await productsModel.find({});

  res.send(data);
})

app.get("/", (req, res) => {
  res.send("Welcome to Home page");
});

// signup backend
app.post("/signup", async (req, res) => {
  // console.log(req.body);
  const { email } = req.body;
  const data = await userModel.findOne({ email: email });

  if (data) {
    res.send({ message: "Email already exists..." });
  } else {
    const new_data = userModel(req.body);
    const save = new_data.save();
    res.send({ message: "signup successfull", alert: true });
  }
});

// login backend

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const server_data = await userModel.findOne({ email: email });
  // console.log(server_data);
  if (server_data) {
    const sentdata = {
      id: server_data._id,
      firstname: server_data.firstname,
      lastname: server_data.lastname,
      email: server_data.email,
      image: server_data.image,
    };
    // }
    // const password = server_data.password;
    if (password === server_data.password) {
      // res.send({message:"password matching",alert:true});
      res.send({ message: "Login Successful", alert: true,data:sentdata });
    } else {
      res.send({ message: "Invalid Credentials...", alert: false });
    }
  } else {
    res.send({
      message: "Email is not registered..Please Signup",
      alert: false,
    });
  }
  // console.log(server_data);
  // console.log(req.body);
});

// products schema

const productsSchema = mongoose.Schema({
  name: String,
    category: String,
    image: String,
    price: String,
    description: String,
});

const productsModel = mongoose.model("product",productsSchema);

// save data in mongodb

app.post("/uploadproduct",async(req,res)=>{
  // console.log(req.body);
  const posted_data = await productsModel(req.body);
  const saved_data = await posted_data.save();
  res.send({message:"Product Uploaded Successfully..."});
});

// payment gateway

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
