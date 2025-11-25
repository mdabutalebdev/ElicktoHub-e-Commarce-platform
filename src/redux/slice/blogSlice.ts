// src/redux/slice/blogSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// ডেটা টাইপ ডিফাইন করা হলো
export interface Article {
  id: number;
  title: string;
  date: string;
  category: string;
  image: string;
  description: string;
  details: string;
}

export interface BlogData {
  articles: Article[];
  categories: string[];
}

export interface BlogState extends BlogData {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BlogState = {
  articles: [],
  categories: [],
  status: 'idle',
  error: null,
};

// Async thunk যা blog.json থেকে ডেটা ফেচ করবে
export const fetchBlogData = createAsyncThunk<BlogData>(
  'blog/fetchData',
  async () => {
    const response = await fetch('/json/blog.json');
    if (!response.ok) {
      throw new Error('Failed to fetch blog data');
    }
    const data: BlogData = await response.json();
    return data;
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogData.fulfilled, (state, action: PayloadAction<BlogData>) => {
        state.status = 'succeeded';
        state.articles = action.payload.articles;
        state.categories = action.payload.categories;
      })
      .addCase(fetchBlogData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default blogSlice.reducer;