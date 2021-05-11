import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchData from '../../../config/axios';

import * as actions from "../fetchUserData";
import * as mock from "../__mocks__/fetchUserDataMock";
import { LOGIN_USER } from "../loginUser";

jest.mock('../../../config/axios');

const mockStore = configureMockStore([thunk]);

describe('actions', () => {
  const userData = {
    first_name: 'John',
    last_name: 'Doe',
    full_name: 'John Doe'
  };

  const loadingUserDataAction = {
    type: actions.LOADING_USER_DATA,
    payload: {
      loading: true
    }
  };

  const setUserDataAction = {
    type: actions.SET_USER_DATA,
    payload: userData
  };

  const userDataLoadedAction = {
    type: actions.USER_DATA_LOADED,
    payload: {
      loading: false
    }
  };

  const loginUserAction = {
    type: LOGIN_USER,
    payload: {
      loggedIn: true
    }
  }

  describe("loadingUserData", () => {
    it("creates an action which sets loadin true", () => {
      expect(actions.loadingUserData()).toEqual(loadingUserDataAction);
    });
  });

  describe("setUserData", () => {
    it("creates an action which returns user data", () => {
      expect(actions.setUserData(userData)).toEqual(setUserDataAction);
    });
  });

  describe("userDataLoaded", () => {
    it("creates an action which sets loadino false", () => {
      expect(actions.userDataLoaded()).toEqual(userDataLoadedAction);
    });
  });

  describe("fetchUserData", () => {
    it("calls LOADING_USER_DATA, SET_USER_DATA and USER_DATA_LOADED actions when status 2**", () => {
      const expectedActions = [
        loadingUserDataAction, setUserDataAction,
        userDataLoadedAction, loginUserAction
      ];
      const store = mockStore();

      fetchData.get.mockResolvedValue(mock.userInfo);

      return store.dispatch(actions.fetchUserData()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it("calls LOADING_USER_DATA and USER_DATA_LOADED actions when status 4** or 5**", () => {
      const expectedActions = [
        loadingUserDataAction,
        userDataLoadedAction
      ];
      const store = mockStore();

      fetchData.get.mockImplementationOnce(() => Promise.reject(new Error()));

      return store.dispatch(actions.fetchUserData()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  })
});
