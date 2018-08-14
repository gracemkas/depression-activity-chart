// import { all } from 'redux-saga/effects';
// import userSaga from './userSaga';
// import loginSaga from './loginSaga';

import { all, takeEvery, call, put as dispatch } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import axios from '../../../node_modules/axios';


export default function* rootSaga() {
  yield takeEvery('POST_LOG', postLog)
  yield takeEvery('GET_DATA', getData)
  
  
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