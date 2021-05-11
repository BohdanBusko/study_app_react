import React from 'react';
import { waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import fetchData from '../../../config/axios';
import { customRender } from '../../../test_helpers/helpers';
import SignUpPage from '../index';
import * as mock from '../__mocks__/SignUpPageMock';

jest.mock('../../../config/axios');

describe("SignUpPage", () => {
  describe("with invalid data", () => {
    it("does not submit form when user does not fill all requeired fileds", async () => {
      const { findByText, getByTestId } = customRender(<SignUpPage />);

      userEvent.click(getByTestId('signup-button'));

      expect(await findByText(/First name can't be blank/i)).toBeInTheDocument()
      expect(await findByText(/Last name can't be blank/i)).toBeInTheDocument();
      expect(await findByText(/Email can't be blank/i)).toBeInTheDocument();
      expect(await findByText(/Password can't be blank/i)).toBeInTheDocument();
      expect(await findByText(/Password confirmation can't be blank/i)).toBeInTheDocument();
    });

    it("does not submit form if password is to short", async () => {
      const { findByText, getByTestId } = customRender(<SignUpPage />);
      const password = getByTestId('password');

      userEvent.type(password, '456');
      userEvent.click(getByTestId('signup-button'));

      expect(await findByText(/Password must contain at least 6 characters/i)).toBeInTheDocument();
    });

    it("does not submit form if password and password confirmation does not match", async () => {
      const { findByText, getByTestId } = customRender(<SignUpPage />);
      const password = getByTestId('password');
      const passwordConfirmation = getByTestId('password_confirmation');

      userEvent.type(password, '123456');
      userEvent.type(passwordConfirmation, '112345');
      userEvent.click(getByTestId('signup-button'));

      expect(await findByText(/The password does not match/i)).toBeTruthy();
    });
  });

  describe("with valid data", () => {
    it("successfully sign up", async () => {
      const { getByTestId } = customRender(<SignUpPage />);
      const firstName = getByTestId('first_name');
      const lastName = getByTestId('last_name');
      const email = getByTestId('email');
      const password = getByTestId('password');
      const passwordConfirmation = getByTestId('password_confirmation');

      fetchData.post.mockResolvedValue(mock.successSignUp);

      await act(async () => {
        userEvent.type(firstName, 'John');
        userEvent.type(lastName, 'Doe');
        userEvent.type(email, 'email@gmail.com');
        userEvent.type(password, '123456');
        userEvent.type(passwordConfirmation, '123456');
      });

      await act(async () => userEvent.click(getByTestId('signup-button')));

      await waitFor(() =>
        expect(localStorage.getItem('token')).toEqual(mock.successSignUp.data.data.attributes.token)
      );
    });
  });
});
