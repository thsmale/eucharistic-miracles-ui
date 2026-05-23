import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type allowedToggleValues = 'table' | 'map' | 'card';

interface ToggleState {
  value: allowedToggleValues,
}

const initialState: ToggleState = {
  value: 'table',
}

export const toggleGroupSlice = createSlice({
  name: 'toggleGroup',
  initialState,
  reducers: {
    setToggleGroup: (state, action: PayloadAction<allowedToggleValues>) => {
      state.value = action.payload;
    }
  }
})

export const { setToggleGroup }  = toggleGroupSlice.actions;

export type { allowedToggleValues };

export default toggleGroupSlice.reducer;

