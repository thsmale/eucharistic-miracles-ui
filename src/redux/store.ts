import { configureStore } from '@reduxjs/toolkit';
import accordionSlice from './accordion';
import filtersSlice from './filters';
import searchSlice from './search';
import sortSlice from './sort';
import toggleGroupSlice from './toggle';

export const store = configureStore({
  reducer: {
    accordion: accordionSlice,
    filters: filtersSlice,
    search: searchSlice,
    sort: sortSlice,
    toggleGroup: toggleGroupSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch