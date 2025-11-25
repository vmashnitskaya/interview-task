import { configureStore } from '@reduxjs/toolkit';
import citiesReducer from '../../../store/slices/cities/citiesSlice';
import uiReducer from '../../../store/slices/ui/uiSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      cities: citiesReducer,
      ui: uiReducer,
    },
  });

export type TestStore = ReturnType<typeof makeStore>;
