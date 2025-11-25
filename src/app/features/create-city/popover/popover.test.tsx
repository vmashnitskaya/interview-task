import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { PopOver } from '../popover';

describe('PopOver', () => {
  const text = 'Text';
  const onClose = jest.fn();

  it('does not render popover when anchorEl is null', () => {
    render(<PopOver anchorEl={null} onClose={onClose} text={text} />);
    const popover = screen.queryByText(text);
    expect(popover).not.toBeInTheDocument();
  });

  it('renders popover when anchorEl is provided', async () => {
    const anchor = document.createElement('div');
    render(<PopOver anchorEl={anchor} onClose={onClose} text={text} />);
    await waitFor(() => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });
});
