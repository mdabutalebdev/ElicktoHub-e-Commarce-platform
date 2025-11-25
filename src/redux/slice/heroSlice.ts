// src/redux/slice/heroSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* ==========================
   Type Definitions
========================== */

// Category structure for Hot Categories section
export interface Category {
  name: string;
  image: string;
  href: string;
}

// Product structure for Best Picks section
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


// Combined structure for Hero section data
export interface HeroData {
  hotCategories: Category[];
  bestPicks: Product[];
}

// Redux slice state including async status and error tracking
export interface HeroState extends HeroData {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

/* ==========================
   Initial State
========================== */
const initialState: HeroState = {
  hotCategories: [],
  bestPicks: [],
  status: 'idle',
  error: null,
};

/* ==========================
   Async Thunk
========================== */
// Fetch hero data (categories and products) from a local JSON file
export const fetchHeroData = createAsyncThunk<HeroData>(
  "hero/fetchData",
  async () => {
    const res = await fetch("/json/data.json");
    if (!res.ok) throw new Error("Failed to load hero data");
    const data: HeroData = await res.json();
    return data;
  }
);

/* ==========================
   Slice Definition
========================== */
const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {},

  // Handle async thunk states
  extraReducers: (builder) => {
    builder
      // When fetch starts
      .addCase(fetchHeroData.pending, (state) => {
        state.status = 'loading';
      })

      // When data is successfully fetched
      .addCase(fetchHeroData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.hotCategories = action.payload.hotCategories;
        state.bestPicks = action.payload.bestPicks;
      })

      // When fetch fails
      .addCase(fetchHeroData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch hero data';
      });
  },
});

/* ==========================
   Export Reducer
========================== */
export default heroSlice.reducer;
