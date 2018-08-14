// import { all } from 'redux-saga/effects';
// import userSaga from './userSaga';
// import loginSaga from './loginSaga';

import { all, takeEvery, call, put as dispatch } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import axios from '../../../node_modules/axios';


export default function* rootSaga() {
  yield takeEvery('POST_LOG', postLog)
  
  
  yield all([
    userSaga(),
    loginSaga(),
    // watchIncrementAsync()
  ]);
}

function* postLog(action){
  try{
    console.log('in post saga', action.payload);

    yield call(axios.post, '/api/depression', action.payload)
    // yield put ({
    //   type: 'GET_ITEM',  
    // })
  } catch (error) {
    console.log(error);
  }
}