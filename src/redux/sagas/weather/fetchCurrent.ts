import {put, call} from 'redux-saga/effects';
import {fetchCurrent} from '../../../services/weather';
import {IPayloadCurrent} from '../../features/weatherSlice';

function* fetchCurrentSaga(action: any): any {
  try {
    const response = yield call(fetchCurrent, action.payload);
    const data = response.data;
    const payload: IPayloadCurrent = {
      city: data?.name,
      country: data?.sys?.country,
      weather: {
        weather: data?.weather,
        humidity: data?.main?.humidity,
        temp: parseInt(data?.main?.temp),
        pressure: data?.main?.pressure,
      },
    };
    yield put({type: 'weather/fetchCurrentSuccess', payload});
  } catch (e: any) {
    console.log(e);
    yield put({type: 'weather/fetchCurrentFailure', payload: e.message});
  }
}

export default fetchCurrentSaga;
