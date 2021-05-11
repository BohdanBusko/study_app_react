import fetchData from '../../config/axios';

export const LOADING_ORGANIZATIONS = 'LAODING_ORGANIZATIONS';
export const ORGANIZATIONS_LOADED = 'ORGANIZATIONS_LOADED'
export const SET_ORGANIZATIONS_DATA = 'SET_ORGANIZATIONS_DATA'

const loadingOrganizations = () => {
  return({
    type: LOADING_ORGANIZATIONS,
    payload: {
      loading: true
    }
  })
}

const organizationsLoaded = () => {
 return({
   type: ORGANIZATIONS_LOADED,
   payload: {
     loading: false
   }
 });
}

const setOrganizationsData = (data) => {
  return({
    type: SET_ORGANIZATIONS_DATA,
    payload: {
      data: data
    }
  })
}

export const fetchOrganizations = () => (dispatch) => {
  dispatch(loadingOrganizations());

  return fetchData.get('/api/v1/account/organizations')
                  .then(({data}) => {
                    dispatch(setOrganizationsData(data.data));
                    dispatch(organizationsLoaded());
                  })
                  .catch((_) => {
                    dispatch(organizationsLoaded());
                  });
}
