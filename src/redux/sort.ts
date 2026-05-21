import { createSlice } from '@reduxjs/toolkit';

export const sortSlice = createSlice({
  name: 'sort',
  initialState: {
    direction: 'Ascending',
    property: 'Country',
  },
  reducers: {
    setSort: (state, action) => {
      const { direction, property } = action.payload;
      state.direction = direction;
      state.property = property;
    },
  }
})

export const { setSort } = sortSlice.actions;

export default sortSlice.reducer;