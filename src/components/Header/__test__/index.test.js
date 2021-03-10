import React from 'react';
import { fireEvent } from '@testing-library/react';

import { customRender } from '../../../test_helpers/helpers';
import Header from '../index';

describe("when user is not signed in", () => {
  it("renders correctly", () => {
    const { asFragment } = customRender(<Header />);

    expect(asFragment(<Header />)).toMatchSnapshot();
  });

  it("displays 'Sign In' and 'Sign Up' buttons", () => {
    const { queryByText } = customRender(<Header />);

    expect(queryByText(/Sign In/i)).toBeTruthy();
    expect(queryByText(/Sign Up/i)).toBeTruthy();
  })
});

describe("when user signed in", () => {
  const initialState = () => ({
    auth: {
      loggedIn: true
    },
    user: {
      full_name: 'John Doe'
    }
  });

  it("renders correctly", () => {
    const { asFragment } = customRender(<Header />, initialState);

    expect(asFragment(<Header />)).toMatchSnapshot();
  });

  it("displays user full name and 'Logout' button", () => {
    const { queryByText } = customRender(<Header />, initialState);

    expect(queryByText(/John Doe/i)).toBeTruthy();
    expect(queryByText(/Logout/i)).toBeTruthy();
  });

  it("remove user token when user click logout", () => {
    localStorage.setItem('token', 'token');
    const { queryByText, getByTestId } = customRender(<Header />, initialState);

    expect(queryByText(/John Doe/)).toBeTruthy();
    expect(localStorage.getItem('token')).toBeTruthy();

    fireEvent.click(getByTestId('logout-button'));

    expect(queryByText('/John Doe')).toBeFalsy();
    expect(localStorage.getItem('token')).toBeFalsy();
  });
});
