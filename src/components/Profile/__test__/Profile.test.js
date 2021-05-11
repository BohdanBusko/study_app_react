import React from 'react';
import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { customRender } from '../../../test_helpers/helpers';
import Profile from '../index';
import fetchData from '../../../config/axios';
import * as mock from '../__mocks__/ProfileMock';

jest.mock('../../../config/axios');

describe("Profile", () => {
  const initState = () => {
    return(
      {
        user: {
          first_name: 'Jack',
          last_name: 'Jackson',
          full_name: 'Jack Jackson',
          email: 'jack.jackson@email.com',
          loading: false
        }
      }
    )
  };

  describe("with valid data", () => {
    it("updates user info", async () => {
      const { getByTestId } = customRender(<Profile />, initState);
      const firstName = getByTestId('first_name');
      const lastName = getByTestId('last_name');
      const email = getByTestId('email');

      fetchData.patch.mockImplementationOnce(() => Promise.resolve(mock.profileInfo));

      expect(firstName.value).toEqual('Jack');
      expect(lastName.value).toEqual('Jackson');
      expect(email.value).toEqual('jack.jackson@email.com');

      userEvent.clear(firstName);
      userEvent.type(firstName, 'John');
      userEvent.clear(lastName);
      userEvent.type(lastName, 'Doe');
      userEvent.clear(email);
      userEvent.type(email, 'john.doe@email.com');

      await act(async () => userEvent.click(getByTestId('update-profile-button')));

      expect(firstName.value).toEqual('John');
      expect(lastName.value).toEqual('Doe');
      expect(email.value).toEqual('john.doe@email.com');
    });
  });

  describe("with invalid data", () => {
    it("does not update user info", async () => {
      const { getByTestId, findByText } = customRender(<Profile />, initState);
      const firstName = getByTestId('first_name');
      const lastName = getByTestId('last_name');
      const email = getByTestId('email');

      userEvent.clear(firstName);
      userEvent.clear(lastName);
      userEvent.clear(email);

      expect(firstName.value).toEqual('');
      expect(lastName.value).toEqual('');
      expect(email.value).toEqual('');

      await act(async () => userEvent.click(getByTestId('update-profile-button')));

      expect(await findByText(/First name can't be blank/)).toBeInTheDocument();
      expect(await findByText(/Last name can't be blank/)).toBeInTheDocument();
      expect(await findByText(/Email can't be blank/)).toBeInTheDocument();
    });
  });
});
