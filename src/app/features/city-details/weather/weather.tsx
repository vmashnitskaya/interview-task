import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import React, { useEffect } from 'react';

import {
  fetchCityWeather,
  getCityWeather,
  getCityWeatherError,
  getCityWeatherLoading,
  useAppDispatch,
  useAppSelector,
} from 'src/app/store';

import classes from './weather.module.scss';

export const Weather = () => {
  const dispatch = useAppDispatch();
  const weather = useAppSelector(getCityWeather);
  const loading = useAppSelector(getCityWeatherLoading);
  const error = useAppSelector(getCityWeatherError);

  useEffect(() => {
    dispatch(fetchCityWeather());
  }, [dispatch]);

  return (
    <div className={classes['weather-container']}>
      <h3>Weather</h3>
      {loading ? (
        <div className={loading ? classes['loading'] : ''}>
          <p>Loading weather data...</p>
        </div>
      ) : error ? (
        <div className={error ? classes['error'] : ''}>
          <p>Error loading weather data</p>
        </div>
      ) : weather ? (
        <TableContainer component={Paper}>
          <Table aria-label="weather table">
            <TableBody>
              <TableRow>
                <TableCell>Temperature</TableCell>
                <TableCell>{weather.temperature} °C</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Wind Speed</TableCell>
                <TableCell>{weather.windspeed} km/h</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Wind Direction</TableCell>
                <TableCell>{weather.winddirection}°</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Weather Code</TableCell>
                <TableCell>{weather.weathercode}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Interval</TableCell>
                <TableCell>{weather.interval} seconds</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Day / Night</TableCell>
                <TableCell>{weather.is_day === 1 ? 'Day' : 'Night'}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className={classes['error']}>
          <p>No weather data available.</p>
        </div>
      )}
    </div>
  );
};
