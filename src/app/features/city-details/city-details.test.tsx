import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { CityDetails } from '../city-details';
import { TestWrapper } from 'src/app/tests/mocks/ui/render';
import { makeStore, TestStore } from 'src/app/tests/mocks/redux/store';
import * as storeModule from 'src/app/store';
import { useParams } from 'react-router-dom';

jest.mock('react-leaflet', () => ({
  MapContainer: ({ children }: { children: ReactNode }) => (
    <div data-testid="map">{children}</div>
  ),
  TileLayer: () => <div />,
  Marker: () => <div />,
  Popup: () => <div />,
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('CityDetails', () => {
  let store: TestStore;

  beforeEach(() => {
    store = makeStore();
    jest.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <TestWrapper store={store}>
        <CityDetails />
      </TestWrapper>
    );

  it('dispatches selectCity with param id on mount', () => {
    const selectCitySpy = jest.spyOn(storeModule, 'selectCity');
    (useParams as jest.Mock).mockReturnValue({ id: 'amsterdam' });

    renderComponent();

    expect(selectCitySpy).toHaveBeenCalledWith('amsterdam');
  });

  it('renders city details correctly', () => {
    const city = store.getState().cities.cities[0];
    (useParams as jest.Mock).mockReturnValue({ id: city.id });

    renderComponent();

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      `${city.name}, ${city.country}`
    );
    expect(screen.getByText(city.description)).toBeInTheDocument();
    expect(
      screen.getByText(`Population: ${city.population}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`Latitude: ${city.latitude}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Longitude: ${city.longitude}`)
    ).toBeInTheDocument();
  });
});
