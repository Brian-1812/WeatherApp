import Api from '../config/Api';
import {RapidApiConfig} from '../config';

export const fetchCurrent = async (city: string) => {
  return Api.get('/weather', {
    params: {
      q: city,
    },
    headers: {
      'x-rapidapi-host': RapidApiConfig.host,
      'x-rapidapi-key': RapidApiConfig.key,
    },
  }).catch(err => err.response);
};

export const fetchWeekly = async (city: string) => {
  return Api.get('/forecast', {
    params: {
      q: city,
    },
    headers: {
      'x-rapidapi-host': RapidApiConfig.host,
      'x-rapidapi-key': RapidApiConfig.key,
    },
  }).catch(err => err.response);
};
