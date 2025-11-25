import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { Dashboard } from '../dashboard';
import { TestWrapper } from '../../tests/mocks/ui/render';
import { makeStore, TestStore } from '../../tests/mocks/redux/store';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Dashboard', () => {
  let store: TestStore;

  const renderDashboard = () => {
    return render(
      <TestWrapper store={store}>
        <Dashboard />
      </TestWrapper>
    );
  };

  beforeEach(() => {
    store = makeStore();
    mockNavigate.mockReset();
  });

  it('renders all city cards', () => {
    renderDashboard();

    const state = store.getState();
    const { ids, map } = state.cities.citiesMap;

    ids.forEach((id) => {
      const headerText = `${map[id].name}, ${map[id].country}`;
      expect(screen.getByText(headerText)).toBeInTheDocument();
    });
  });

  it('navigates to city page when "Show more" is clicked', () => {
    renderDashboard();

    const { ids } = store.getState().cities.citiesMap;
    const firstCityId = ids[0];

    const showMoreButtons = screen.getAllByText('Show more');

    fireEvent.click(showMoreButtons[0]);

    expect(mockNavigate).toHaveBeenCalledWith(`/cities/${firstCityId}`);
  });
});
