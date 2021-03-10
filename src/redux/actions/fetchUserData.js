import fetchData from '../../config/axios';
import { loginUser } from './loginUser';

export const LOADING_USER_DATA ='LOADING_USER_DATA';
export const SET_USER_DATA ='SET_USER_DATA';
export const USER_DATA_LOADED ='USER_DATA_LOADED';

export const loadingUserData = () => {
  return ({
    type: LOADING_USER_DATA,
    payload: {
      loading: true
    }
  });
}

export const setUserData = (data) => {
  return({
    type: SET_USER_DATA,
    payload: data
  });
}

export const userDataLoaded = () => {
  return({
    type: USER_DATA_LOADED,
    payload: {
      loading: false
    }
  });
}

export const fetchUserData = () => (dispatch) => {
  dispatch(loadingUserData());

  return fetchData.get('/api/v1/account/profiles')
           .then(({data}) => {
             dispatch(setUserData(data.data.attributes));
             dispatch(userDataLoaded());
             dispatch(loginUser());
           });
}
