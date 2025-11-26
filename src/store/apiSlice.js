// src/store/apiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    fetchApiRequested(state, action) {
      state.loading = true;
      state.error = null;
    },
    fetchApiSucceeded(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchApiFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchApiRequested,
  fetchApiSucceeded,
  fetchApiFailed,
} = apiSlice.actions;

export const apiReducer = apiSlice.reducer;
