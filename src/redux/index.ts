import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import weatherSlice from './features/weatherSlice';
import mainSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    weather: weatherSlice,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(mainSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
