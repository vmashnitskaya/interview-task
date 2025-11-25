import React from 'react';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useAppSelector, getCities } from 'src/app/store';
import { Card } from './card';
import { routes } from 'src/app/config';

import classes from './dashboard.module.scss';

export const Dashboard = () => {
  const citiesMap = useAppSelector(getCities);
  const navigate = useNavigate();

  const onCitySelect = (cityId: string) => {
    navigate(`${routes.cities}/${cityId}`);
  };

  return (
    <section className={classes.dashboard}>
      <Grid
        container
        columnSpacing={3}
        rowSpacing={2}
        sx={{
          justifyContent: 'center',
          display: 'flex',
        }}
        columns={{ xs: 1, sm: 2, md: 3 }}
      >
        {citiesMap.ids.map((id) => (
          <Grid
            sx={{
              justifyContent: 'center',
              display: 'flex',
            }}
            key={citiesMap.map[id].id}
            size={{ xs: 1, sm: 1, md: 1 }}
          >
            <Card
              buttonLabel="Show more"
              description={citiesMap.map[id].description}
              header={`${citiesMap.map[id].name}, ${citiesMap.map[id].country}`}
              id={citiesMap.map[id].id}
              imageAlt={citiesMap.map[id].description}
              imageUrl={citiesMap.map[id].imageUrl}
              onButtonClick={onCitySelect}
            />
          </Grid>
        ))}
      </Grid>
    </section>
  );
};
