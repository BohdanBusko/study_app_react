import React from 'react';
import { waitFor } from '@testing-library/react';

import fetchData from '../../../config/axios';
import { customRender } from '../../../test_helpers/helpers';
import App from '../index';
import * as mock from '../__mocks__/AppMock';

jest.mock('../../../config/axios');


describe("with token", () => {
  beforeEach(() => {
    localStorage.setItem('token', 'token');

    fetchData.get.mockResolvedValue(mock.userInfo);
  });

  it("renders correctly", () => {
    const { asFragment } = customRender(<App />);

    expect(asFragment(<App />)).toMatchSnapshot();
  });

  it("login user", async () => {
    const { queryByText } = customRender(<App />);

    setTimeout(() => {
      expect(queryByText(/John Doe/)).toBeTruthy();
    }, 1);
  });
});

describe("without token", () => {
  it("renders correctly", () => {
    const { asFragment } = customRender(<App />);

    expect(asFragment(<App />)).toMatchSnapshot();
  });
});
