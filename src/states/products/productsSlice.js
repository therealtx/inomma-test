import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addItems: (state, action) => {
      state.items = state.items.concat(action.payload);
    }
  },
});

export const { addItems } = productsSlice.actions;

export const selectItems = state => state.products.items;

export default productsSlice.reducer;
