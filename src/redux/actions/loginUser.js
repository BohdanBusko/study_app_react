import fetchData from '../../config/axios';
import {
  loadingUserData,
  setUserData,
  userDataLoaded
} from './fetchUserData';

export const loginUser = () => {
  return(
    {
      type: 'LOGIN_USER',
      payload: {
        loggedIn: true
      }
    }
  );
}

export const wrongPassOrEmail = () => {
  return({
    type: 'WRONG_PASS_OR_EMAIL',
    payload: {
      wrongPassOrEmail: true
    }
  });
}

const createSession = (data) => (dispatch) => {
  dispatch(loadingUserData());

  fetchData.post('/api/v1/sessions', { session: data })
            .then(({data}) => {
              localStorage.setItem('token', data.data.attributes.token);

              dispatch(setUserData(data.data.attributes.user.data.attributes));
              dispatch(userDataLoaded());
              dispatch(loginUser());
            })
            .catch((_) => dispatch(wrongPassOrEmail()));
}

export default createSession;
