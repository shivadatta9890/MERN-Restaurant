import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
const initialState = {
  productsList: [],
  cartItem: [],
};
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setDataproduct: (state, action) => {
      // console.log(action);
      state.productsList = [...action.payload];
    },
    addCartItem: (state, action) => {
      // console.log(action);
      const itemIncart = state.cartItem.some(
        (el) => el._id === action.payload._id
      );
      if (itemIncart) {
        toast.success("Item Alreday in Cart");
      } else {
        const total = action.payload.price;
        state.cartItem = [
          ...state.cartItem,
          { ...action.payload, qty: 1, total: total },
        ];
        toast.success("Item added to cart");
      }
    },
    removeCartItem: (state, action) => {
      // console.log(action.payload);
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      state.cartItem.splice(index, 1);
      toast.success("Item Deleted From Cart");
    },
    incrementQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      let qty = state.cartItem[index].qty;
      const incQty = ++qty;
      state.cartItem[index].qty = incQty;
      const price = state.cartItem[index].price;
      const total = price * incQty;

      state.cartItem[index].total = total;
    },
    decrementQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      let qty = state.cartItem[index].qty;
      if (qty > 1) {
          const decQty = --qty;
        state.cartItem[index].qty = decQty;
        const price = state.cartItem[index].price;
        const total = price * decQty;

        state.cartItem[index].total = total;
      }
    },
  },
});

export const {
  setDataproduct,
  addCartItem,
  removeCartItem,
  incrementQty,
  decrementQty,
} = productSlice.actions;
export default productSlice.reducer;
