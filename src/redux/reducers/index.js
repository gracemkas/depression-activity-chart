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
  default:
  return state;
}
  
}

const store = combineReducers({
  user,
  login,
  dataList,
  updatedData
});

export default store;
