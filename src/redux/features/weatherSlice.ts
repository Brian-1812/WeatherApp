import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface IPayloadCurrent {
  weather: {
    weather: Array<any>;
    humidity: number;
    pressure: number;
    temp: number;
  };
  city: string;
  country: string | null;
}

export interface IPayloadWeekly {
  data: Array<any>;
  city: string;
  country: string | null;
}

export interface IWeatherCurrent {
  weather: Array<any>;
  humidity: number;
  pressure: number;
  temp: number;
}

interface WeatherState {
  current: IWeatherCurrent | null;
  weekly: Array<any>;
  city: string | null;
  country: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  current: null,
  weekly: [],
  city: null,
  country: null,
  isLoading: false,
  error: null,
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    fetchCurrent: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
    },
    fetchCurrentSuccess: (state, action: PayloadAction<IPayloadCurrent>) => {
      state.current = action.payload.weather;
      state.country = action.payload.country;
      state.city = action.payload.city;
      state.isLoading = false;
      state.error = null;
    },
    fetchCurrentFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchWeekly: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
    },
    fetchWeeklySuccess: (state, action: PayloadAction<IPayloadWeekly>) => {
      state.isLoading = false;
      state.weekly = action.payload.data;
      state.country = action.payload.country;
      state.city = action.payload.city;
      state.error = null;
    },
    fetchWeeklyFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCurrent,
  fetchCurrentSuccess,
  fetchCurrentFailure,
  fetchWeekly,
  fetchWeeklySuccess,
  fetchWeeklyFailure,
} = weatherSlice.actions;

export default weatherSlice.reducer;
