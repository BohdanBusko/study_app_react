import { combineReducers } from 'redux';

import authReducer from './authReducer';
import userReducer from './userReducer';

const mainReducer = combineReducers({
  auth: authReducer,
  user: userReducer
});

export default mainReducer;
