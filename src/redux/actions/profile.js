import fetchData from '../../config/axios';
import {
  loadingUserData,
  setUserData,
  userDataLoaded
} from './fetchUserData';

export const updateUserProfile = (data) => (dispatch) => {
  dispatch(loadingUserData());

  return fetchData.patch('/api/v1/account/profile', { user: data })
                  .then(({data}) => {
                    dispatch(setUserData(data.data.attributes))
                    dispatch(userDataLoaded());
                  })
                  .catch((_) => {
                    dispatch(userDataLoaded());
                  });
}
