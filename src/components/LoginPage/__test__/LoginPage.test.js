import React from 'react';
import { act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import fetchData from '../../../config/axios';
import { customRender } from '../../../test_helpers/helpers';
import LoginPage from '../index';
import * as mock from '../__mocks__/LoginPageMock';

jest.mock('../../../config/axios');

describe("LoginPage", () => {
  describe("with invalid data", () => {
    it("does not submit form when user does not enter email and password", async () => {
      const { findByText, getByTestId } = customRender(<LoginPage/>);

      userEvent.click(getByTestId('login-button'));

      expect(await findByText(/Email can't be blank/i)).toBeInTheDocument();
      expect(await findByText(/Password can't be blank/i)).toBeInTheDocument();
    });

    it("displays message 'Wrong password or email' if user enter wrong password or email and reset password field", async () => {
      const { findByText, getByTestId } = customRender(<LoginPage/>);
      const emailInput = getByTestId('email');
      const passwordInput = getByTestId('password');

      fetchData.post.mockImplementationOnce(() => Promise.reject(new Error()));

      userEvent.type(emailInput, 'email@email.com');
      userEvent.type(passwordInput, '123456');

      await act(async () => userEvent.click(getByTestId('login-button')));

      expect(await findByText(/Wrong password or email/i)).toBeTruthy();
      expect(passwordInput.value).toBeFalsy();
    });
  })

  describe("with valid data", () => {
    it("seves user token to localStorage", async () => {
      const { getByTestId } = customRender(<LoginPage />);
      const emailInput = getByTestId('email');
      const passwordInput = getByTestId('password');

      fetchData.post.mockResolvedValue(mock.successLogin);

      userEvent.type(emailInput, 'email@email.com');
      userEvent.type(passwordInput, '123456');

      await act(async () => userEvent.click(getByTestId('login-button')));

      await waitFor(() =>
        expect(localStorage.getItem('token')).toEqual(mock.successLogin.data.data.attributes.token)
      );
    });
  });
});
