import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './states/products/productsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});
