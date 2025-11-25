import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';

import { Weather } from '../weather';
import { TestWrapper } from 'src/app/tests/mocks/ui/render';
import { makeStore, TestStore } from 'src/app/tests/mocks/redux/store';
import { selectCity } from 'src/app/store';

describe('Weather', () => {
  const mockWeatherData = {
    current_weather: {
      interval: 900,
      temperature: 22.5,
      windspeed: 15.2,
      winddirection: 180,
      weathercode: 1,
      is_day: 1,
    },
  };
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

  it('should display weather data when fetch succeeds', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockWeatherData),
    });

    await act(async () => {
      store.dispatch(selectCity('amsterdam'));

      renderComponent();
    });

    await waitFor(() => {
      expect(
        screen.getByRole('table', { name: /weather table/i })
      ).toBeInTheDocument();
    });

    expect(screen.getByText('Temperature')).toBeInTheDocument();
    expect(screen.getByText('22.5 °C')).toBeInTheDocument();

    expect(screen.getByText('Wind Speed')).toBeInTheDocument();
    expect(screen.getByText('15.2 km/h')).toBeInTheDocument();

    expect(screen.getByText('Wind Direction')).toBeInTheDocument();
    expect(screen.getByText('180°')).toBeInTheDocument();

    expect(screen.getByText('Weather Code')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();

    expect(screen.getByText('Interval')).toBeInTheDocument();
    expect(screen.getByText('900 seconds')).toBeInTheDocument();

    expect(screen.getByText('Day / Night')).toBeInTheDocument();
    expect(screen.getByText('Day')).toBeInTheDocument();

    expect(
      screen.queryByText('Loading weather data...')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('Error loading weather data')
    ).not.toBeInTheDocument();
  });
});
