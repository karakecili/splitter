import { configureStore } from '@reduxjs/toolkit';

import splitSlice from '../slices/splitSlices';
import tableSlice from '../slices/tableSlices';

const store = configureStore({
  reducer: { split: splitSlice.reducer, table: tableSlice.reducer },
});

export default store;
