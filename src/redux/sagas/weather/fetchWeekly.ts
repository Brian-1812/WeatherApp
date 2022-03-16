import {put, call} from 'redux-saga/effects';
import {fetchWeekly} from '../../../services/weather';
import {IPayloadWeekly} from '../../features/weatherSlice';

function* fetchWeeklySaga(action: any): any {
  try {
    const response = yield call(fetchWeekly, action.payload);
    const data = response.data;

    // const weather: any[] = data.list;
    // for (let i = 0; i < 5; i++) {
    //   weather.push({
    //     data: data.list.slice(i * 8, i * 8 + 8),
    //     label: `Day ${i + 1}`,
    //   });
    // }
    const payload: IPayloadWeekly = {
      city: data.city.name,
      country: data.city.country,
      data: data.list,
    };
    yield put({type: 'weather/fetchWeeklySuccess', payload});
  } catch (e: any) {
    console.log(e);
    yield put({type: 'weather/fetchWeeklyFailure', payload: e.message});
  }
}

export default fetchWeeklySaga;
