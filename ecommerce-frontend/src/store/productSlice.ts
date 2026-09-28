import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'; 

// Define the Product interface
export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
}

// Keep the initial state as an empty array as per the video
const initialState: Product[] = [];

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Action to store the fetched products data in the reducer's initial state
    setProducts: (state, action: PayloadAction<Product[]>) => {
      return action.payload;
    },
  },
});

// Export the action to be used in the component
export const { setProducts } = productSlice.actions;
export default productSlice.reducer;