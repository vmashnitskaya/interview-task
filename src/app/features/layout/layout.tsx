import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet } from 'react-router';

import { Drawer } from './drawer';
import { useAppDispatch, toggleDrawer } from '../../store';
import { CreateCity } from '../create-city';

import classes from './layout.module.scss';

export const Layout = () => {
  const dispatch = useAppDispatch();

  const onToggleDrawer = () => {
    dispatch(toggleDrawer());
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={onToggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            Cities
          </Typography>
          <CreateCity />
        </Toolbar>
      </AppBar>

      <main className={classes.main}>
        <Drawer />
        <Outlet />
      </main>
      <footer className={classes.footer}>
        <p>© 2025 City Explorer. All rights reserved.</p>
      </footer>
    </>
  );
};
