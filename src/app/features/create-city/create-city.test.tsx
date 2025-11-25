import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CreateCity } from '../create-city';
import { TestWrapper } from 'src/app/tests/mocks/ui/render';
import { makeStore, TestStore } from 'src/app/tests/mocks/redux/store';

const mockUseLocation = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => mockUseLocation(),
}));

describe('CreateCity', () => {
  let store: TestStore;

  beforeEach(() => {
    store = makeStore();
    jest.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <TestWrapper store={store}>
        <CreateCity />
      </TestWrapper>
    );

  it('does not render button when pathname is not /cities', () => {
    mockUseLocation.mockReturnValue({ pathname: '/other' });
    renderComponent();

    expect(screen.queryByText('Add City')).not.toBeInTheDocument();
  });

  it('renders Add City button when pathname is /cities', () => {
    mockUseLocation.mockReturnValue({ pathname: '/cities' });
    renderComponent();

    expect(screen.getByText('Add City')).toBeInTheDocument();
  });

  it('opens modal when Add City button is clicked', async () => {
    mockUseLocation.mockReturnValue({ pathname: '/cities' });
    renderComponent();

    const button = screen.getByText('Add City');
    fireEvent.click(button);

    const submitButton = screen.queryByRole('button', { name: /submit/i });

    await waitFor(() => {
      expect(submitButton).toBeInTheDocument();
    });
  });

  it('closes modal after outside click', async () => {
    mockUseLocation.mockReturnValue({ pathname: '/cities' });
    renderComponent();

    const addButton = screen.getByText('Add City');
    fireEvent.click(addButton);
    fireEvent.click(addButton);

    const submitButton = screen.queryByRole('button', { name: /submit/i });

    await waitFor(() => {
      expect(submitButton).not.toBeInTheDocument();
    });
  });
});
