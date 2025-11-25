import { render, screen, waitFor } from '@testing-library/react';
import { Weather } from '../weather';
import { TestWrapper } from 'src/app/tests/mocks/ui/render';
import { makeStore, TestStore } from 'src/app/tests/mocks/redux/store';
import { act } from 'react';

describe('Weather', () => {
  let store: TestStore;

  beforeEach(() => {
    store = makeStore();
    jest.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <TestWrapper store={store}>
        <Weather />
      </TestWrapper>
    );

  it('shows loading state while fetching weather', async () => {
    global.fetch = jest.fn(
      () =>
        new Promise((_resolve, _reject) => {
          void _resolve;
          void _reject;
        })
    );

    await act(async () => {
      renderComponent();
    });

    await waitFor(() => {
      expect(screen.getByText(/Loading weather data/i)).toBeInTheDocument();
    });
  });

  it('shows error message if fetch fails', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      } as Response)
    ) as jest.Mock;

    await act(async () => {
      renderComponent();
    });

    await waitFor(() => {
      expect(
        screen.getByText(/Error loading weather data/i)
      ).toBeInTheDocument();
    });
  });
});
