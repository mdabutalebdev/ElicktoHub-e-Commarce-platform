// src/redux/slice/homeGardenSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Category {
  name: string;
  image: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number | null;
  image: string;
  sale: boolean;
}

export interface HomeGardenData {
  categories: Category[];
  bestsellers: Product[];
}

export interface HomeGardenState extends HomeGardenData {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: HomeGardenState = {
  categories: [],
  bestsellers: [],
  status: 'idle',
  error: null,
};

export const fetchHomeGardenData = createAsyncThunk<HomeGardenData>(
  'homeGarden/fetchData',
  async () => {
    const response = await fetch('/json/homeAndGarden.json');
    if (!response.ok) {
      throw new Error('Failed to fetch Home & Garden data');
    }
    const data: HomeGardenData = await response.json();
    return data;
  }
);

const homeGardenSlice = createSlice({
  name: 'homeGarden',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeGardenData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHomeGardenData.fulfilled, (state, action: PayloadAction<HomeGardenData>) => {
        state.status = 'succeeded';
        state.categories = action.payload.categories;
        state.bestsellers = action.payload.bestsellers;
      })
      .addCase(fetchHomeGardenData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default homeGardenSlice.reducer;