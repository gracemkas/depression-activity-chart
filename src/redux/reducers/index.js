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

const store = combineReducers({
  user,
  login,
  dataList
});

export default store;
