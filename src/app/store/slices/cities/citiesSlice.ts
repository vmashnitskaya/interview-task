import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { citiesConfig } from '../../../config';
import { City } from '../../../types';
import { RootState } from '../../store';

export interface CityWeather {
  interval: number;
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  is_day: number;
}

interface CitiesMap {
  map: Record<string, City>;
  ids: Array<string>;
}

interface CitiesState {
  cities: Array<City>;
  citiesMap: CitiesMap;
  selectedCityId?: string;
  selectedCityWeather?: CityWeather;
  isLoading: boolean;
  error?: string;
}

const initialState: CitiesState = {
  cities: citiesConfig,
  citiesMap: citiesConfig.reduce(
    (map: CitiesMap, city: City) => {
      map.map[city.id] = city;
      map.ids.push(city.id);
      return map;
    },
    {
      map: {},
      ids: [],
    }
  ),
  isLoading: false,
};

export const fetchCityWeather = createAsyncThunk<
  CityWeather,
  void,
  { state: RootState; rejectValue: string }
>('cities/fetchCityWeather', async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const city = state.cities.citiesMap.map[state.cities.selectedCityId || ''];

    if (!city) {
      return rejectWithValue('City not found in state');
    }

    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true`
    );

    if (!res.ok) throw new Error('Failed to fetch city details');

    return (await res.json())['current_weather'];
  } catch (err) {
    return rejectWithValue(
      err instanceof Error ? err.message : 'Unknown error'
    );
  }
});

export const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    selectCity: (state, action: PayloadAction<string>) => {
      state.selectedCityId = action.payload;
    },
    createCity: (state, action: PayloadAction<Omit<City, 'id'>>) => {
      const id = action.payload.name.toLowerCase().replace(/\s+/g, '-');
      state.cities.push({ id, ...action.payload });
      state.citiesMap.map[id] = { id, ...action.payload };
      state.citiesMap.ids.unshift(id);
    },
  },
  selectors: {
    getCities: (state) => state.citiesMap,
    getSelectedCity: (state) => state.citiesMap.map[state.selectedCityId || ''],
    getCityWeather: (state) => state.selectedCityWeather,
    getCityWeatherLoading: (state) => state.isLoading,
    getCityWeatherError: (state) => state.error,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCityWeather.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })

      .addCase(fetchCityWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedCityWeather = action.payload;
      })

      .addCase(fetchCityWeather.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

export const {
  getCities,
  getSelectedCity,
  getCityWeather,
  getCityWeatherLoading,
  getCityWeatherError,
} = citiesSlice.selectors;
export const { selectCity, createCity } = citiesSlice.actions;

export default citiesSlice.reducer;
