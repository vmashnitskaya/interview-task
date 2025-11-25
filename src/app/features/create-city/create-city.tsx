import React, { useCallback, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';

import { CreateModal } from './create-modal';
import { useLocation } from 'react-router-dom';
import { routes } from 'src/app/config';

export const CreateCity = () => {
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  return (
    location.pathname === routes.cities && (
      <div>
        <Button
          color="inherit"
          startIcon={<AddIcon />}
          onClick={handleToggleModal}
        >
          Add City
        </Button>
        <CreateModal isOpen={isModalOpen} onClose={handleToggleModal} />
      </div>
    )
  );
};
