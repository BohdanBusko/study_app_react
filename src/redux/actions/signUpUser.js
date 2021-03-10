import fetchData from '../../config/axios';
import {
  loadingUserData,
  setUserData,
  userDataLoaded
} from './fetchUserData';
import { loginUser } from './loginUser';

const signUpUser = (data) => (dispatch) => {
  dispatch(loadingUserData());

  return fetchData.post('/api/v1/registration', { registration: data })
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

export default signUpUser;
