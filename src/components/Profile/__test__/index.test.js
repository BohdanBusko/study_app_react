import React from 'react';

import { customRender } from '../../../test_helpers/helpers';
import Profile from '../index';

it("renders correctly", () => {
  const { asFragment } = customRender(<Profile />)

  expect(asFragment(<Profile />)).toMatchSnapshot();
});
