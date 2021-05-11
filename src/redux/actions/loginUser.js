import fetchData from '../../config/axios';
import {
  loadingUserData,
  setUserData,
  userDataLoaded
} from './fetchUserData';

export const LOGIN_USER = "LOGIN_USER";
export const WRONG_PASS_OR_EMAIL = "WRONG_PASS_OR_EMAIL";

export const loginUser = () => {
  return(
    {
      type: LOGIN_USER,
      payload: {
        loggedIn: true
      }
    }
  );
}

export const wrongPassOrEmail = () => {
  return({
    type: WRONG_PASS_OR_EMAIL,
    payload: {
      wrongPassOrEmail: true
    }
  });
}

export const createSession = (data) => (dispatch) => {
  dispatch(loadingUserData());

  return fetchData.post('/api/v1/sessions', { session: data })
           .then(({data}) => {
             localStorage.setItem('token', data.data.attributes.token);

             dispatch(setUserData(data.data.attributes.user.data.attributes));
             dispatch(userDataLoaded());
             dispatch(loginUser());
           })
           .catch((_) => {
             dispatch(userDataLoaded());
           });
}
