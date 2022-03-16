import {takeLatest} from 'redux-saga/effects';
import fetchCurrentSaga from './weather/fetchCurrent';
import fetchWeeklySaga from './weather/fetchWeekly';

function* mainSaga() {
  yield takeLatest('weather/fetchCurrent', fetchCurrentSaga);
  yield takeLatest('weather/fetchWeekly', fetchWeeklySaga);
}

export default mainSaga;
