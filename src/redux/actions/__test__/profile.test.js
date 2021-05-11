import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchData from '../../../config/axios';

import * as actions from "../fetchUserData";
import * as mock from "../__mocks__/profileMock";
import { updateUserProfile } from '../profile';

jest.mock('../../../config/axios');

const mockStore = configureMockStore([thunk]);

describe('actions', () => {
  const userData = {
    first_name: 'John',
    last_name: 'Doe',
    full_name: 'John Doe',
    email: 'john.doe@email.com'
  }

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

  describe('updateUserProfile', () => {
    it('updates user info', () => {
      const expectedActions = [
        loadingUserDataAction, setUserDataAction,
        userDataLoadedAction
      ];
      const store = mockStore();

      fetchData.patch.mockResolvedValue(mock.profileInfo);

      return store.dispatch(updateUserProfile(userData)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it("does not update profile info", () => {
      const expectedActions = [
        loadingUserDataAction,
        userDataLoadedAction
      ];
      const store = mockStore();

      fetchData.patch.mockImplementationOnce(() => Promise.reject(new Error()));

      return store.dispatch(updateUserProfile(userData)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
