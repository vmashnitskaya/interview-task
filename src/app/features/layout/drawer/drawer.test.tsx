import React from 'react';
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';

import { Drawer } from './drawer';
import { TestWrapper } from '../../../tests/mocks/ui/render';
import { makeStore, TestStore } from '../../../tests/mocks/redux/store';
import { toggleDrawer } from 'src/app/store';
import { routes } from 'src/app/config';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Drawer', () => {
  let store: TestStore;

  const renderDrawer = () =>
    render(
      <TestWrapper store={store}>
        <Drawer />
      </TestWrapper>
    );

  beforeEach(() => {
    store = makeStore();
    mockNavigate.mockReset();
  });

  it('renders drawer as closed by default', () => {
    renderDrawer();

    expect(screen.queryByText('Cities')).not.toBeInTheDocument();
  });

  it('shows drawer when UI state changes', async () => {
    renderDrawer();

    act(() => {
      store.dispatch(toggleDrawer());
    });

    await waitFor(() => expect(screen.getByText('Cities')).toBeInTheDocument());
  });

  it('navigates when clicking on an item', async () => {
    renderDrawer();

    act(() => {
      store.dispatch(toggleDrawer());
    });

    await waitFor(() => {
      expect(screen.getByText('Cities')).toBeInTheDocument();
    });

    const button = await screen.findByText('Cities', {}, { timeout: 1000 });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith(routes.cities);
  });

  it('closes drawer when clicking on an item', async () => {
    renderDrawer();

    act(() => {
      store.dispatch(toggleDrawer());
    });

    await waitFor(() => expect(screen.getByText('Cities')).toBeInTheDocument());

    const button = await screen.findByText('Cities', {}, { timeout: 1000 });
    fireEvent.click(button);

    await waitFor(() =>
      expect(screen.queryByText('Cities')).not.toBeInTheDocument()
    );
  });
});
