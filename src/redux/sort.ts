import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SortState {
  direction: "Ascending" | "Descending",
  property: "Country" | "City" | "Year" | "Categories",
}

const initialState: SortState = {
  direction: 'Ascending',
  property: 'Country',
}

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<SortState>) => {
      const { direction, property } = action.payload;
      state.direction = direction;
      state.property = property;
    },
  }
})

export const { setSort } = sortSlice.actions;

export type { SortState };

export default sortSlice.reducer;