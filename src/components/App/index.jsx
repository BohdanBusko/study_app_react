import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Header from '../Header';
import Home from '../Home';
import LoginPage from '../LoginPage';
import SignUpPage from '../SignUpPage';
import { fetchUserData } from '../../redux/actions/fetchUserData';

import './app.scss';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(fetchUserData());
    }
  });

  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/registration" component={SignUpPage} />
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
