// src/store/sagas/apiSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { fetchApiRequested, fetchApiSucceeded, fetchApiFailed } from '../apiSlice';

// worker saga
function* handleFetchApi(action) {
  try {
    // contoh: ambil waktu dari worldtimeapi
    // bisa ganti dengan API lain sesuai selera
    const response = yield call(
      axios.get,
      'https://worldtimeapi.org/api/timezone/Asia/Jakarta'
    );

    yield put(fetchApiSucceeded(response.data));
  } catch (error) {
    yield put(fetchApiFailed(error.message || 'Failed to fetch API'));
  }
}

// watcher saga
export default function* apiSaga() {
  yield takeLatest(fetchApiRequested.type, handleFetchApi);
}
