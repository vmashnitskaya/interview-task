import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { TestStore } from '../redux/store';

export const TestWrapper = ({
  children,
  store,
}: {
  children: ReactNode;
  store: TestStore;
}) => (
  <Provider store={store}>
    <BrowserRouter>{children}</BrowserRouter>
  </Provider>
);
