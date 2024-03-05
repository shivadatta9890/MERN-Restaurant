import { configureStore } from '@reduxjs/toolkit';
import userSliceRedux from './userSlice';
import  productSliceRedux from './productSlice';
export const store = configureStore({
    reducer: {
      user : userSliceRedux,
      products:productSliceRedux
    }
  });