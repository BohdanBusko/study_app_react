import React from 'react';

import { customRender } from '../../../test_helpers/helpers';
import Home from '../index';

it("renders correctly", () => {
  const { asFragment } = customRender(<Home />);

  expect(asFragment(<Home />)).toMatchSnapshot();
});
