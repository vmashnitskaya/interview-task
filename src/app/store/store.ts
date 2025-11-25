import { combineSlices, configureStore } from '@reduxjs/toolkit';

import citiesReducer from './slices/cities/citiesSlice';
import uiReducer from './slices/ui/uiSlice';

const reducer = combineSlices({
  cities: citiesReducer,
  ui: uiReducer,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
