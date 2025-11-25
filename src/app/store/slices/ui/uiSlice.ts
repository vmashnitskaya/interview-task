import { createSlice } from '@reduxjs/toolkit';

import { Page } from '../../../types';
import { pages } from 'src/app/config';

interface UiState {
  isDrawerOpen: boolean;
  pages: Array<Page>;
}

const initialState: UiState = {
  isDrawerOpen: false,
  pages,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
  },
  selectors: {
    getIsDrawerOpen: (state) => state.isDrawerOpen,
    getPages: (state) => state.pages,
  },
});

export const { toggleDrawer } = uiSlice.actions;
export const { getIsDrawerOpen, getPages } = uiSlice.selectors;

export default uiSlice.reducer;
