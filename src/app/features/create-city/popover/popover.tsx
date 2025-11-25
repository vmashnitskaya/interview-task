import React from 'react';
import { Popover, Typography } from '@mui/material';

interface CopyablePopoverProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  text: string;
}

const PopOverElement: React.FC<CopyablePopoverProps> = ({
  anchorEl,
  onClose,
  text,
}) => {
  const open = Boolean(anchorEl);

  return (
    <Popover
      id="popover"
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <Typography
        sx={{
          maxWidth: 450,
          userSelect: 'text',
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          padding: 2,
        }}
      >
        {text}
      </Typography>
    </Popover>
  );
};

export const PopOver = React.memo(PopOverElement);
