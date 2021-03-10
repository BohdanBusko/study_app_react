import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchData from '../../../config/axios';

import signUpUser from '../signUpUser';
import {
  LOADING_USER_DATA,
  SET_USER_DATA,
  USER_DATA_LOADED
} from '../fetchUserData';
import { LOGIN_USER } from '../loginUser';
import * as mock from '../__mocks__/signUpUserMock';

jest.mock('../../../config/axios');

const mockStore = configureMockStore([thunk]);

describe("actions", () => {
  const initState = {
    auth: {
      loggedIn: false
    },
    user: {
      loading: false
    }
  };

  const loadingUserDataAction = {
    type: LOADING_USER_DATA,
    payload: {
      loading: true
    }
  };

  const setUserDataAction = {
    type: SET_USER_DATA,
    payload: {
      first_name: 'John',
      last_name: 'Doe',
      full_name: 'John Doe'
    }
  };

  const userDataLoadedAction = {
    type: USER_DATA_LOADED,
    payload: {
      loading: false
    }
  };

  const loginUserAction = {
    type: LOGIN_USER,
    payload: {
      loggedIn: true
    }
  };

  describe("with valid params", () => {
    it("sign up and login user", () => {
      const expectedActions = [
        loadingUserDataAction, setUserDataAction, userDataLoadedAction, loginUserAction
      ]
      const store = mockStore(initState);

      fetchData.post.mockResolvedValue(mock.registrationInfo);

      return store.dispatch(signUpUser({})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(localStorage.getItem('token')).toEqual(mock.registrationInfo.data.data.attributes.token);
      });
    });
  });

  describe("with invalid params", () => {
    it("does not signup user", () => {
      const expectedActions = [
        loadingUserDataAction, userDataLoadedAction
      ]
      const store = mockStore(initState);

      fetchData.post.mockImplementationOnce(() => Promise.reject(new Error()));

      return store.dispatch(signUpUser({})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
