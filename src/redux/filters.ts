import { createSlice } from '@reduxjs/toolkit';

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    categories: [],
    countries: [],
  },
  reducers: {
    clearFilters: (state) => {
      state.categories = [];
      state.countries = [];
    },
    setFilters: (state, action) => {
      const { categories, countries } = action.payload;
      state.categories = categories;
      state.countries = countries;
    },
  }
})

export const { clearFilters, setFilters }  = filtersSlice.actions;

export default filtersSlice.reducer;
