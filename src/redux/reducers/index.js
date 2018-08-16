import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';

const dataList = (state = [], action) => {
  switch (action.type) {
    case 'GET_LIST':
      return action.payload
    default:
      return state;
  }
};

const updatedData = (state = {
  id: '',
  depression_rating: 0,
  activity: ''
}, action) => {
  switch (action.type) {
    case 'UPDATE_ID':
      return {
        id: action.payload
      };
    case 'UPDATE_DEPRESSION':
      return {
        ...state,
        depression_rating: action.payload.depression_rating,
        activity: action.payload.activity
      };
    default:
      return state;
  }
};

const therapistName = (state = '', action) => {
  switch (action.type) {
    case 'SHOW_THERAPIST':
      return action.payload
    default:
      return state;
  }
};

const findTherapist = (state = [], action) => {
  switch (action.type) {
    case 'THERAPIST_FOUND':
      return action.payload
    default:
      return state;
  }
};

const store = combineReducers({
  user,
  login,
  dataList,
  updatedData,
  therapistName,
  findTherapist
});

export default store;
