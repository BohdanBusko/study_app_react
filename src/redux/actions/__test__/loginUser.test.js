import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchData from '../../../config/axios';

import * as actions from "../loginUser";
import * as mock from "../__mocks__/loginUserMock";
import {
  LOADING_USER_DATA,
  SET_USER_DATA,
  USER_DATA_LOADED
} from '../fetchUserData';

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

  const loginUserAction = {
    type: actions.LOGIN_USER,
    payload: {
      loggedIn: true
    }
  };

  const wrongPassOrEmailAction = {
    type: actions.WRONG_PASS_OR_EMAIL,
    payload: {
      wrongPassOrEmail: true
    }
  }

  const loadingUserDataAction = {
    type: LOADING_USER_DATA,
    payload: {
      loading: true
    }
  }

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

  it("creates an action which sets loggedIn true", () => {
    expect(actions.loginUser()).toEqual(loginUserAction);
  });

  it("creates an action which sets wrongPassOrEmail true", () => {
    expect(actions.wrongPassOrEmail()).toEqual(wrongPassOrEmailAction);
  });

  describe("when user info is valid", () => {
    it("fetch user info and session token", () => {
      const expectedActions = [
        loadingUserDataAction, setUserDataAction,
        userDataLoadedAction, loginUserAction,
      ];
      const store = mockStore(initState);

      fetchData.post.mockResolvedValue(mock.sessionInfo);

      return store.dispatch(actions.createSession({ email: "email@gmails.com", password: "123456" })).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(localStorage.getItem('token')).toEqual(mock.sessionInfo.data.data.attributes.token);
      });
    });
  });

  describe("when user info is invalid", () => {
    it("returns error", () => {
      const expectedActions = [
        loadingUserDataAction, wrongPassOrEmailAction, userDataLoadedAction
      ];
      const store = mockStore(initState);

      fetchData.post.mockImplementationOnce(() => Promise.reject(new Error()));

      return store.dispatch(actions.createSession({ email: "email@gmails.com", password: "123456" })).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
