import { configureStore } from '@reduxjs/toolkit';
import filtersSlice from './filters';
import searchSlice from './search';
import sortSlice from './sort';
import toggleGroupSlice from './toggle';

export default configureStore({
  reducer: {
    filters: filtersSlice,
    search: searchSlice,
    sort: sortSlice,
    toggleGroup: toggleGroupSlice,
  }
})