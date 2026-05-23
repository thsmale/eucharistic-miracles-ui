import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  categories: string[],
  countries: string[],
}

const initialState: FiltersState = {
  categories: [],
  countries: [],
}

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    clearFilters: (state) => {
      state.categories = [];
      state.countries = [];
    },
    setFilters: (state, action: PayloadAction<FiltersState>) => {
      const { categories, countries } = action.payload;
      state.categories = categories;
      state.countries = countries;
    },
  }
})

export const { clearFilters, setFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
