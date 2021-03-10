import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import mainReducer from '../redux/reducers';

export const customRender = (component, initialState = null) => {
  const store = createStore(initialState || mainReducer, applyMiddleware(thunk));

  return(render(
    <Provider store={store}>
      <Router>
        {component}
      </Router>
    </Provider>
  ));
}
