import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { Layout } from './layout';
import { makeStore, TestStore } from '../../tests/mocks/redux/store';
import { TestWrapper } from '../../tests/mocks/ui/render';

describe('Layout', () => {
  let store: TestStore;

  const renderLayout = () => {
    store = makeStore();

    return render(
      <TestWrapper store={store}>
        <Layout />
      </TestWrapper>
    );
  };

  it('renders title and menu button', () => {
    renderLayout();

    expect(screen.getByRole('heading', { name: 'Cities' })).toBeInTheDocument();
    expect(screen.getByLabelText('open drawer')).toBeInTheDocument();
  });

  it('toggles drawer state when clicking menu button', () => {
    renderLayout();

    const menuButton = screen.getByLabelText('open drawer');

    expect(store.getState().ui.isDrawerOpen).toBe(false);

    fireEvent(
      menuButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(store.getState().ui.isDrawerOpen).toBe(true);
  });

  it('renders footer', () => {
    renderLayout();

    expect(
      screen.getByText(/© 2025 City Explorer. All rights reserved./i)
    ).toBeInTheDocument();
  });
});
