// src/store/productsSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Define the Product type matching your product.json structure
export interface Product {
  id: string;
  name: string;
  category: string;
  weight?: string;
  color?: string;
  price: number;
  oldPrice?: number;
  tags?: string[];
  badge?: string;
  rating?: number;   // <-- এখন optional
  href?: string;
  image?: string;
  imageUrl?: string;
}



// Define the state shape for products
interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state for the slice
const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
};

// Async thunk to fetch product data from API or JSON file
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  // The product.json file should be placed inside the public folder
  const response = await fetch('/json/product.json');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await response.json();
  return data;
});

// Create the products slice
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},

  // Handle the lifecycle of async thunks (pending, fulfilled, rejected)
  extraReducers: (builder) => {
    builder
      // When fetching starts
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      // When data is successfully fetched
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      // When fetching fails
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

// Export the reducer for store configuration
export default productsSlice.reducer;
