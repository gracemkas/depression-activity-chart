import { all, takeEvery, call, put as dispatch } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import axios from '../../../node_modules/axios';

export default function* rootSaga() {
  yield takeEvery('POST_LOG', postLog)
  yield takeEvery('GET_DATA', getData)
  yield takeEvery('UPDATE_LOG_ID', updateLog)
  yield takeEvery('UPDATE_LOG_DEPRESSION', updateLogDepression)
  yield takeEvery('DELETE_LOG', deleteLog)
  yield takeEvery('GET_CURRENT_THERAPIST', getCurrentTherapist)
  
  
  yield all([
    userSaga(),
    loginSaga(),
    // watchIncrementAsync()
  ]);
}

function* postLog(action){
  try{
    console.log('in post saga', action.payload);
    yield call(axios.post, '/api/depression', action.payload);

  } catch (error) {
    console.log(error);
  }
}

function* getData() {
  try {
    console.log('getData saga');

    const dataResponse = yield call(axios.get, '/api/depression')
    yield dispatch({
      type: 'GET_LIST',
      payload: dataResponse.data
    })
  } catch (err) {
    yield console.log(err);
  }
}

function* getCurrentTherapist() {
  try {
    console.log('getCurrentTherapist saga');

    const therapistName = yield call(axios.get, '/api/depression/therapist')
    yield dispatch({
      type: 'SHOW_THERAPIST',
      payload: therapistName.data
    })
  } catch (err) {
    yield console.log(err);
  }
}

function* updateLog(action) {
  try {
    console.log('updateLog saga');
    yield dispatch({
      type: 'UPDATE_ID',
      payload: action.payload
    })

    // const dataResponse = yield call(axios.get, '/api/depression')

  } catch (err) {
    yield console.log(err);
  }
}

function* updateLogDepression(action) {
  try {
    console.log('updateLogDepression saga');
    // yield dispatch({
    //   type: 'UPDATE_DEPRESSION',
    //   payload: action.payload
    // })

    yield call(axios.put, `/api/depression/${action.payload.id}`, action.payload);

  } catch (err) {
    yield console.log(err);
  }
}

function* deleteLog(action) {
  console.log('deleteItem', action.payload);

  try {
    yield call(axios.delete, `/api/depression/${action.payload}`);
    // yield dispatch({
    //   type: 'GET_LIST'
    // })
  } catch (err) {
    yield console.log(err);

  }
}