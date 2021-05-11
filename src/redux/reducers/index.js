import { combineReducers } from 'redux';

import authReducer from './authReducer';
import userReducer from './userReducer';
import organizationsReducer from './organizationsReducer';

const mainReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  organizations: organizationsReducer
});

export default mainReducer;
