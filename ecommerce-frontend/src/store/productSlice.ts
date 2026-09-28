import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'; // Separated type import for Vite compatibility

// Define the Product interface for type safety
export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
}

// Initial state is an empty array (data comes from the backend)
const initialState: Product[] = [];

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Action to store the fetched products data in the store
    setProducts: (state, action: PayloadAction<Product[]>) => {
      return action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;