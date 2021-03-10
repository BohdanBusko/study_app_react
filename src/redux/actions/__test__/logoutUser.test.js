import logoutUser, { LOGOUT_USER } from '../logoutUser';

describe("actions", () => {
  it("creates an action which sets loggedIn true and remove token from storage", () => {
    const expectedAction = {
      type: LOGOUT_USER,
      payload: {
        loggedIn: false
      }
    }

    localStorage.setItem('token', 'token');

    expect(logoutUser()).toEqual(expectedAction);
    expect(localStorage.getItem('token')).toBeFalsy();
  });
});
