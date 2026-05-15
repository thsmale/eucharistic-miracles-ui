import { configureStore } from '@reduxjs/toolkit';
import filtersSlice from './filters';
import searchSlice from './search';
import toggleGroupSlice from './toggle';

export default configureStore({
  reducer: {
    filters: filtersSlice,
    search: searchSlice,
    toggleGroup: toggleGroupSlice,
  }
})