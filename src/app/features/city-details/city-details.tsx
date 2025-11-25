import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  getSelectedCity,
  useAppDispatch,
  selectCity,
  useAppSelector,
} from 'src/app/store';
import { Map } from './map';
import { Weather } from './weather';

import classes from './city-details.module.scss';

export const CityDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const city = useAppSelector(getSelectedCity);

  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const detailsId = `details-${city?.id || ''}`;

  useEffect(() => {
    dispatch(selectCity(id || ''));
  }, [id, dispatch]);

  return (
    city && (
      <section>
        <div className={classes['image-container']}>
          <img
            onLoad={() => setIsImgLoaded(true)}
            className={isImgLoaded ? classes['is-loaded'] : ''}
            src={city.imageLargeUrl}
            alt={city.description}
          />
        </div>
        <div className={classes['details-container']}>
          <h2>
            {city.name}, {city.country}
          </h2>

          <p>{city.description}</p>
          <h3 id={detailsId}>Details</h3>
          <ul aria-describedby={detailsId}>
            <li>Population: {city.population}</li>
            <li>Latitude: {city.latitude}</li>
            <li>Longitude: {city.longitude}</li>
          </ul>

          <Weather />

          <Map
            key={city.id}
            cityName={city.name}
            latitude={city.latitude}
            longitude={city.longitude}
          />
        </div>
      </section>
    )
  );
};
