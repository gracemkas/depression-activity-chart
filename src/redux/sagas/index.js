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
  yield takeEvery('FIND_THERAPIST', findTherapist)
  yield takeEvery('UPDATE_THERAPIST', updateTherapist)
  yield takeEvery('CHANGE_DATE', changeDate)
  yield takeEvery('ADD_THERAPIST', addTherapist)
  yield takeEvery('GET_PATIENT_LIST', getPatientList)
  yield takeEvery('DELETE_PATIENT', deletePatient)
  yield takeEvery('THERAPIST_PATIENT_GRAPH', therapistPatientGraph)
  yield takeEvery('CHANGE_THERAPIST_DATE', changeTherapistDate)
  yield takeEvery('GET_THERAPIST_NAME', getTherapistRegister)
  
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
    yield dispatch({
      type: 'GET_DATA'
    })
  } catch (error) {
    console.log(error);
  }
}

function* addTherapist(action){
  try{
    console.log('in addTherapist saga', action.payload);
    yield call(axios.post, '/api/depression/addtherapist', action.payload);
    yield dispatch({
      type: 'GET_CURRENT_THERAPIST'
    })
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

function* getPatientList() {
  try {
    console.log('getPatientList saga');
    const patientList = yield call(axios.get, '/api/depression/patientlist')
    console.log('patientList', patientList)
    yield dispatch({
      type: 'SHOW_PATIENT_LIST',
      payload: patientList.data
    })
  } catch (err) {
    yield console.log(err);
  }
}

function* getTherapistRegister() {
  try {
    console.log('getTherapistRegister saga');
    const therapistRegister = yield call(axios.get, '/api/depression/therapistregister')
    yield dispatch({
      type: 'THERAPIST_NAME_REGISTER',
      payload: therapistRegister.data
    })
  } catch (err) {
    yield console.log(err);
  }
}

function* findTherapist(action) {
  try {
    console.log('findTherapist saga');
    const therapistFind = yield call(axios.put, `/api/depression/find/${action.payload}`, action.payload)  
    yield dispatch({
      type: 'THERAPIST_FOUND',
      payload: therapistFind.data
    })
  } catch (err) {
    yield console.log(err);
  }
}

function* therapistPatientGraph(action) {
  try {
    console.log('therapistPatientGraph saga');
    yield dispatch({
      type: 'THERAPIST_PATIENT_DATA_ID',
      payload: action.payload
    })
    const therapistPatientGraph = yield call(axios.put, `/api/depression/therapistpatientgraph/${action.payload}`, action.payload)  
    yield dispatch({
      type: 'THERAPIST_PATIENT_DATA',
      payload: therapistPatientGraph.data
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
    yield call(axios.put, `/api/depression/${action.payload.id}`, action.payload);
    yield dispatch({
      type: 'GET_DATA'
    })
  } catch (err) {
    yield console.log(err);
  }
}

function* changeDate(action) {
  try {
    console.log('changeDate saga');
    const newDate = yield call(axios.put, `/api/depression/date/${action.payload}`, action.payload);
    yield dispatch({
      type: 'STORE_NEW_DATE',
      payload: newDate.data
    })
  } catch (err) {
    yield console.log(err);
  }
}


function* changeTherapistDate(action) {
  try {
    console.log('changeDate saga');
    const newTherapistDate = yield call(axios.put, `/api/depression/therapistdate`, action.payload);
    yield dispatch({
      type: 'STORE_NEW_THERAPIST_DATE',
      payload: newTherapistDate.data
    })
  } catch (err) {
    yield console.log(err);
  }
}

function* updateTherapist(action) {
  try {
    console.log('updateTherapist saga', action.payload);
    yield call(axios.put, `/api/depression/therapist/${action.payload.id}`, action.payload);
    yield dispatch({
      type: 'GET_CURRENT_THERAPIST'
    })
    yield dispatch({
      type: 'REMOVE_UPDATE_THERAPIST'
    })
  } catch (err) {
    yield console.log(err);
  }
}

function* deleteLog(action) {
  console.log('deleteItem', action.payload);

  try {
    yield call(axios.delete, `/api/depression/${action.payload}`);
    yield dispatch({
      type: 'GET_DATA'
    })
  } catch (err) {
    yield console.log(err);

  }
}

function* deletePatient(action) {
  console.log('deletePatient', action.payload);
  try {
    yield call(axios.delete, `/api/depression/patientdelete/${action.payload}`);
    yield dispatch({
      type: 'GET_PATIENT_LIST'
    })
  } catch (err) {
    yield console.log(err);

  }
}