import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card, CardProps } from '../card';

describe('Card', () => {
  const mockOnButtonClick = jest.fn();

  const defaultProps: CardProps = {
    id: 'city-1',
    header: 'Amsterdam, Netherlands',
    description: 'Beautiful canals and architecture',
    imageUrl: '/amsterdam.jpg',
    imageAlt: 'Amsterdam image',
    buttonLabel: 'Show more',
    onButtonClick: mockOnButtonClick,
  };

  beforeEach(() => {
    mockOnButtonClick.mockReset();
  });

  it('renders header, description, and image', () => {
    render(<Card {...defaultProps} />);

    expect(screen.getByText(defaultProps.header)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();

    const img = screen.getByRole('img', { name: defaultProps.imageAlt });
    expect(img).toHaveAttribute('src', defaultProps.imageUrl);
  });

  it('calls onButtonClick with id when CardActionArea is clicked', () => {
    render(<Card {...defaultProps} />);

    const headerText = screen.getByText(defaultProps.header);
    fireEvent.click(headerText);

    expect(mockOnButtonClick).toHaveBeenCalledTimes(1);
    expect(mockOnButtonClick).toHaveBeenCalledWith(defaultProps.id);
  });

  it('calls onButtonClick with id when Button is clicked', () => {
    render(<Card {...defaultProps} />);

    const button = screen.getByRole('button', {
      name: defaultProps.buttonLabel,
    });
    fireEvent.click(button);

    expect(mockOnButtonClick).toHaveBeenCalledTimes(1);
    expect(mockOnButtonClick).toHaveBeenCalledWith(defaultProps.id);
  });
});
