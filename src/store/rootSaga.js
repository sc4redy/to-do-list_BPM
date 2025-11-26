// src/store/rootSaga.js
import { all } from 'redux-saga/effects';
import apiSaga from './sagas/apiSaga';

export default function* rootSaga() {
  yield all([
    apiSaga(),
  ]);
}
