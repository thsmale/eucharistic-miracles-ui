import { createSlice } from '@reduxjs/toolkit';

export const toggleGroupSlice = createSlice({
  name: 'toggleGroup',
  initialState: {
    value: 'table',
  },
  reducers: {
    setToggleGroup: (state, action) => {
      state.value = action.payload;
    }
  }
})

export const { setToggleGroup }  = toggleGroupSlice.actions;

export default toggleGroupSlice.reducer;

