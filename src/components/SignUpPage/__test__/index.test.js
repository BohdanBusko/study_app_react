import React from 'react';
import { fireEvent, waitFor, act } from '@testing-library/react';

import fetchData from '../../../config/axios';
import { customRender } from '../../../test_helpers/helpers';
import SignUpPage from '../index';
import * as mock from '../__mocks__/SignUpPageMock';

jest.mock('../../../config/axios');

it("renders correctly", () => {
  const { asFragment } = customRender(<SignUpPage />);

  expect(asFragment(<SignUpPage />)).toMatchSnapshot();
});

describe("with invalid data", () => {
  it("does not submit form when user does not fill all requeired fileds", async () => {
    const { queryByText, getByTestId } = customRender(<SignUpPage />);

    fireEvent.click(getByTestId('signup-button'));

    await waitFor(() => expect(queryByText(/First name can't be blank/i)).toBeTruthy());
    await waitFor(() => expect(queryByText(/Last name can't be blank/i)).toBeTruthy());
    await waitFor(() => expect(queryByText(/Email can't be blank/i)).toBeTruthy());
    await waitFor(() => expect(queryByText(/Password can't be blank/i)).toBeTruthy());
    await waitFor(() => expect(queryByText(/Password confirmation can't be blank/i)).toBeTruthy());
  });

  it("does not submit form if password is to short", async () => {
    const { queryByText, getByTestId } = customRender(<SignUpPage />);
    const passwordInput = getByTestId('password').querySelector('input');

    fireEvent.change(passwordInput, { target: { value: '456' } });

    await act(async () => fireEvent.click(getByTestId('signup-button')));

    await waitFor(() => expect(queryByText(/Password must contain at least 6 characters/i)).toBeTruthy());
  });

  it("does not submit form if password and password confirmation does not match", async () => {
    const { queryByText, getByTestId } = customRender(<SignUpPage />);
    const passwordInput = getByTestId('password').querySelector('input');
    const passwordConfirmationInput = getByTestId('password_confirmation').querySelector('input');

    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.change(passwordConfirmationInput, { target: { value: '112345' } });

    await act(async () => fireEvent.click(getByTestId('signup-button')));

    await waitFor(() => expect(queryByText(/The password does not match/i)).toBeTruthy());
  });
});

describe("with valid data", () => {
  it("successfully sign up", async () => {
    const { getByTestId } = customRender(<SignUpPage />);
    const firstName = getByTestId('first_name').querySelector('input');
    const lastName = getByTestId('last_name').querySelector('input');
    const email = getByTestId('email').querySelector('input');
    const passwordInput = getByTestId('password').querySelector('input');
    const passwordConfirmationInput = getByTestId('password_confirmation').querySelector('input');

    fetchData.post.mockResolvedValue(mock.successSignUp);

    await act(async () => {
      fireEvent.change(firstName, { target: { value: 'John' } });
      fireEvent.change(lastName, { target: { value: 'Doe' } });
      fireEvent.change(email, { target: { value: 'email@gmail.com' } });
      fireEvent.change(passwordInput, { target: { value: '123456' } });
      fireEvent.change(passwordConfirmationInput, { target: { value: '123456' } });
    });

    setTimeout(async () => {
      await act(async () => fireEvent.click(getByTestId('signup-button')));
    }, 1);

    await waitFor(() =>
      expect(localStorage.getItem('token')).toEqual(mock.successSignUp.data.data.attributes.token)
    );
  });
});
