import React from 'react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { customRender } from '../../../test_helpers/helpers';
import Header from '../index';

describe("Header", () => {
  describe("when user is not signed in", () => {
    it("displays 'Sign In' and 'Sign Up' buttons", () => {
      const { queryByText } = customRender(<Header />);

      expect(queryByText(/Sign In/i)).toBeInTheDocument();
      expect(queryByText(/Sign Up/i)).toBeInTheDocument();
    });
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

    beforeEach(() => {
      localStorage.setItem('token', 'token');
    });

    it("displays user full name and 'Logout' button", () => {
      const { queryByText } = customRender(<Header />, initialState);

      expect(queryByText(/John Doe/i)).toBeInTheDocument();
      expect(queryByText(/Logout/i)).toBeInTheDocument();
    });

    it("remove user token when user click logout", () => {
      const { queryByText, getByTestId } = customRender(<Header />, initialState);

      expect(queryByText(/John Doe/)).toBeInTheDocument();
      expect(localStorage.getItem('token')).toEqual('token');

      userEvent.click(getByTestId('logout-button'));

      expect(queryByText('/John Doe')).not.toBeInTheDocument();
      expect(localStorage.getItem('token')).toBeNull();
    });
  });
});
