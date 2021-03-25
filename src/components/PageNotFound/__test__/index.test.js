import React from 'react';

import { customRender } from '../../../test_helpers/helpers';
import PageNotFound from '../index';

it("renders correctly", () => {
  const { asFragment } = customRender(<PageNotFound />)

  expect(asFragment(<PageNotFound />)).toMatchSnapshot();
});
