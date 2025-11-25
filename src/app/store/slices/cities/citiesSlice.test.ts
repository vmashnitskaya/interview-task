import { makeStore } from '../../../tests/mocks/redux/store';
import {
  selectCity,
  createCity,
  fetchCityWeather,
  getCities,
  getSelectedCity,
  getCityWeather,
  getCityWeatherLoading,
  getCityWeatherError,
  CityWeather,
} from './citiesSlice';
import { citiesConfig } from '../../../config';

const MOCK_CITY_WEATHER: CityWeather = {
  interval: 0,
  temperature: 22,
  windspeed: 5,
  winddirection: 180,
  weathercode: 1,
  is_day: 1,
};

describe('citiesSlice', () => {
  let store: ReturnType<typeof makeStore>;

  beforeEach(() => {
    store = makeStore();

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            current_weather: MOCK_CITY_WEATHER,
          }),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should have initial state', () => {
    const state = store.getState().cities;
    expect(state.cities).toEqual(citiesConfig);
    expect(state.selectedCityId).toBeUndefined();
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeUndefined();
  });

  it('should select a city', () => {
    const cityId = citiesConfig[0].id;
    store.dispatch(selectCity(cityId));

    const state = store.getState().cities;
    expect(state.selectedCityId).toBe(cityId);
  });

  it('should create a new city', () => {
    const testCity = {
      name: 'New City',
      latitude: 1,
      longitude: 2,
      country: 'NC',
      description: 'A new city',
      imageLargeUrl: 'http://example.com/large.jpg',
      imageUrl: 'http://example.com/small.jpg',
      population: 100000,
    };

    store.dispatch(createCity(testCity));

    const state = store.getState().cities;
    const newCity = state.cities.find((c) => c.name === testCity.name);
    expect(newCity).toBeDefined();
  });

  it('should fetch city weather successfully', async () => {
    const cityId = citiesConfig[0].id;
    store.dispatch(selectCity(cityId));

    await store.dispatch(fetchCityWeather());

    const state = store.getState().cities;
    expect(state.isLoading).toBe(false);
    expect(state.selectedCityWeather?.temperature).toBe(22);
    expect(state.error).toBeUndefined();
  });

  it('should handle fetch city weather failure', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
      })
    );

    const cityId = citiesConfig[0].id;
    store.dispatch(selectCity(cityId));

    await store.dispatch(fetchCityWeather());

    const state = store.getState().cities;
    expect(state.isLoading).toBe(false);
    expect(state.selectedCityWeather).toBeUndefined();
    expect(state.error).toBeDefined();
  });

  it('selectors should return correct data', () => {
    const cityId = citiesConfig[0].id;
    store.dispatch(selectCity(cityId));

    const state = store.getState().cities;

    expect(getCities({ cities: state })).toEqual(state.citiesMap);
    expect(getSelectedCity({ cities: state })).toEqual(
      state.citiesMap.map[cityId]
    );
    expect(getCityWeather({ cities: state })).toEqual(
      state.selectedCityWeather
    );
    expect(getCityWeatherLoading({ cities: state })).toBe(state.isLoading);
    expect(getCityWeatherError({ cities: state })).toBe(state.error);
  });
});
