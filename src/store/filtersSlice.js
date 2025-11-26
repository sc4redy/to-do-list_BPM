// src/store/filtersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'all',        // 'all' | 'completed' | 'active'
  category: 'all',      // 'all' atau nama kategori
  search: '',           // keyword
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setStatusFilter(state, action) {
      state.status = action.payload;
    },
    setCategoryFilter(state, action) {
      state.category = action.payload;
    },
    setSearchFilter(state, action) {
      state.search = action.payload;
    },
  },
});

export const {
  setStatusFilter,
  setCategoryFilter,
  setSearchFilter,
} = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;
