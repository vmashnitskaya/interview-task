import React from 'react';
import {
  List,
  Box,
  Drawer as DrawerComponent,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule';

import {
  useAppSelector,
  getIsDrawerOpen,
  useAppDispatch,
  toggleDrawer,
  getPages,
} from '../../../store';
import { useNavigate } from 'react-router-dom';

export const Drawer = () => {
  const isOpen = useAppSelector(getIsDrawerOpen);
  const pages = useAppSelector(getPages);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const iconsMapper = {
    cities: <ViewModuleIcon />,
  };

  const onToggleDrawer = () => {
    dispatch(toggleDrawer());
  };

  const onPageSelect = (path: string) => {
    navigate(path);
  };

  return (
    <DrawerComponent open={isOpen}>
      <Box sx={{ width: 250 }} role="presentation" onClick={onToggleDrawer}>
        <List>
          {pages.map((page) => (
            <ListItem key={page.id} disablePadding>
              <ListItemButton onClick={() => onPageSelect(page.path)}>
                <ListItemIcon>{iconsMapper[page.icon]}</ListItemIcon>
                <ListItemText primary={page.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </DrawerComponent>
  );
};
