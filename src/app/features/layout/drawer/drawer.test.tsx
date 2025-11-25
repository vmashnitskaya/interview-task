import React from 'react';
import { render, screen } from '@testing-library/react';

import { Drawer } from './drawer';
import { makeStore, TestStore } from '../../../tests/mocks/redux/store';
import { TestWrapper } from '../../../tests/mocks/ui/render';
import { toggleDrawer } from 'src/app/store';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Drawer component', () => {
  let store: TestStore;

  const renderDrawer = () => {
    store = makeStore();

    return render(
      <TestWrapper store={store}>
        <Drawer />
      </TestWrapper>
    );
  };

  it('renders pages from the store', () => {
    renderDrawer();

    expect(screen.getByText('Cities')).toBeInTheDocument();
  });

  it('drawer visibility is controlled by Redux state', () => {
    const store = makeStore();

    const { rerender } = render(
      <TestWrapper store={store}>
        <Drawer />
      </TestWrapper>
    );

    expect(store.getState().ui.isDrawerOpen).toBe(false);

    store.dispatch(toggleDrawer());

    rerender(
      <TestWrapper store={store}>
        <Drawer />
      </TestWrapper>
    );

    expect(store.getState().ui.isDrawerOpen).toBe(true);
  });

  it('drawer visibility is controlled by Redux state', () => {
    const store = makeStore();

    const { rerender } = render(
      <TestWrapper store={store}>
        <Drawer />
      </TestWrapper>
    );

    expect(screen.queryByRole('presentation')).not.toBeInTheDocument();

    store.dispatch(toggleDrawer());

    rerender(
      <TestWrapper store={store}>
        <Drawer />
      </TestWrapper>
    );

    expect(screen.getByRole('presentation')).toBeInTheDocument();
  });

  //   it('clicking a page item navigates to its route', () => {
  //     renderDrawer();

  //     store.dispatch(toggleDrawer());
  //     const citiesButton = screen.getByText('Cities');

  //     fireEvent(
  //       citiesButton,
  //       new MouseEvent('click', { bubbles: true, cancelable: true })
  //     );

  //     expect(mockNavigate).toHaveBeenCalledWith('/cities');
  //   });
});
