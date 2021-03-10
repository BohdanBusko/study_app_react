import React from 'react';
import { fireEvent, waitFor, act } from '@testing-library/react';

import fetchData from '../../../config/axios';
import { customRender } from '../../../test_helpers/helpers';
import LoginPage from '../index';
import * as mock from '../__mocks__/LoginPageMock';

jest.mock('../../../config/axios');

it("renders correctly", () => {
  const { asFragment } = customRender(<LoginPage/>);

  expect(asFragment(<LoginPage />)).toMatchSnapshot();
});

describe("with invalid data", () => {
  it("does not submit form when user does not enter email and password", async () => {
    const { queryByText, getByTestId } = customRender(<LoginPage/>);

    fireEvent.click(getByTestId('login-button'));

    await waitFor(() => expect(queryByText(/Email can't be blank/i)).toBeTruthy());
    await waitFor(() => expect(queryByText(/Password can't be blank/i)).toBeTruthy());
  });

  it("displays message 'Wrong password or email' if user enter wrong password or email and reset password field", async () => {
    const { queryByText, getByTestId } = customRender(<LoginPage/>);
    const emailInput = getByTestId('email').querySelector('input');
    const passwordInput = getByTestId('password').querySelector('input');

    fetchData.post.mockImplementationOnce(() => Promise.reject(new Error()));

    fireEvent.change(emailInput, { target: { value: 'email@email.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    await act(async () => fireEvent.click(getByTestId('login-button')));

    await waitFor(() => expect(queryByText(/Wrong password or email/i)).toBeTruthy());
    await waitFor(() => expect(passwordInput.value).toBeFalsy());
  });
})

describe("with valid data", () => {
  it("seves user token to localStorage", async () => {
    const { getByTestId } = customRender(<LoginPage />);
    const emailInput = getByTestId('email').querySelector('input');
    const passwordInput = getByTestId('password').querySelector('input');

    fetchData.post.mockResolvedValue(mock.successLogin);

    fireEvent.change(emailInput, { target: { value: 'email@email.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    await act(async () => fireEvent.click(getByTestId('login-button')));

    await waitFor(() =>
      expect(localStorage.getItem('token')).toEqual(mock.successLogin.data.data.attributes.token)
    );
  });
});
