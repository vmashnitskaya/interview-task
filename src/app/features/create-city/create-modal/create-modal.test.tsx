import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { CreateModal } from '../create-modal';
import { TestWrapper } from '../../../tests/mocks/ui/render';
import { makeStore, TestStore } from '../../../tests/mocks/redux/store';
import * as storeModule from 'src/app/store';

describe('CreateModal', () => {
  let store: TestStore;
  const onClose = jest.fn();

  beforeEach(() => {
    store = makeStore();
    jest.clearAllMocks();
  });

  const renderModal = (isOpen = true) =>
    render(
      <TestWrapper store={store}>
        <CreateModal isOpen={isOpen} onClose={onClose} />
      </TestWrapper>
    );

  it('renders nothing when modal is closed', () => {
    renderModal(false);
    expect(screen.queryByText('City Name')).not.toBeInTheDocument();
  });

  it('renders modal fields when open', () => {
    renderModal(true);

    expect(screen.getByLabelText('City Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByLabelText('Latitude')).toBeInTheDocument();
    expect(screen.getByLabelText('Longitude')).toBeInTheDocument();
    expect(screen.getByLabelText('Population')).toBeInTheDocument();
    expect(screen.getByLabelText('Image URL')).toBeInTheDocument();
    expect(screen.getByLabelText('Large Image URL')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('opens PopOver when info icon is clicked', async () => {
    renderModal(true);

    const infoButtons = screen.getAllByRole('button', { hidden: true });
    fireEvent.click(infoButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/Hint: Minsk/i)).toBeInTheDocument();
    });
  });

  it('dispatches createCity and calls onClose on form submit', async () => {
    const createCitySpy = jest.spyOn(storeModule, 'createCity');

    renderModal(true);

    const testCity = {
      name: 'Test City',
      country: 'Test Country',
      latitude: 10,
      longitude: 20,
      imageUrl: 'http://example.com/img.jpg',
      imageLargeUrl: 'http://example.com/img-large.jpg',
      description: 'A test city',
    };

    fireEvent.change(screen.getByLabelText('City Name'), {
      target: { value: testCity.name },
    });
    fireEvent.change(screen.getByLabelText('Country'), {
      target: { value: testCity.country },
    });
    fireEvent.change(screen.getByLabelText('Latitude'), {
      target: { value: testCity.latitude },
    });
    fireEvent.change(screen.getByLabelText('Longitude'), {
      target: { value: testCity.longitude },
    });
    fireEvent.change(screen.getByLabelText('Image URL'), {
      target: { value: testCity.imageUrl },
    });
    fireEvent.change(screen.getByLabelText('Large Image URL'), {
      target: { value: testCity.imageLargeUrl },
    });
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: testCity.description },
    });

    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(createCitySpy).toHaveBeenCalledWith(
        expect.objectContaining(testCity)
      );
      expect(onClose).toHaveBeenCalled();
    });
  });
});
