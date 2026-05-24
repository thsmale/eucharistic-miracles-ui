// Used to determine which AccordionPanels should be open/closed
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AccordionState {
  indexes: number[];
  countries: string[];
}

const initialState: AccordionState = {
  indexes: [],
  countries: [],
}

export const accordionSlice = createSlice({
  name: 'accordion',
  initialState,
  reducers: {
    setIndexes: (state, action: PayloadAction<number[]>) => {
      state.indexes = action.payload;
    },
    setCountries: (state, action: PayloadAction<string[]>) => {
      state.countries = action.payload;
    },
  }
})

export const { setIndexes, setCountries } = accordionSlice.actions;

export default accordionSlice.reducer;