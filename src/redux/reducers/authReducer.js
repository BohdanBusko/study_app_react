import {
  LOGIN_USER,
  WRONG_PASS_OR_EMAIL
} from '../actions/loginUser';
import { LOGOUT_USER } from '../actions/logoutUser';

const initState = {
  loggedIn: false,
  wrongPassOrEmail: false
}

const authReducer = (state = initState, action) => {
  switch(action.type) {
    case LOGIN_USER:
    case WRONG_PASS_OR_EMAIL:
    case LOGOUT_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export default authReducer;
