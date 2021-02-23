import fetchData from '../../config/axios';
import {
  loadingUserData,
  setUserData,
  userDataLoaded
} from './fetchUserData';

const signUpUser = (data) => (dispatch) => {
  dispatch(loadingUserData());

  fetchData.post('/api/v1/registration', { registration: data })
           .then(({data}) => {
             dispatch(setUserData(data.data.attributes.user.data.attributes));
             dispatch(userDataLoaded());
           })
           .catch((_) => null);
}

export default signUpUser;
