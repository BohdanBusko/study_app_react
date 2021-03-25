import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route, Redirect
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../Header';
import Home from '../Home';
import LoginPage from '../LoginPage';
import SignUpPage from '../SignUpPage';
import Profile from '../Profile';
import PageNotFound from '../PageNotFound';
import { fetchUserData } from '../../redux/actions/fetchUserData';

import './app.scss';

const PrivateRoute = ({path, component}) => {
  const loggedIn = useSelector((state) => (state.auth.loggedIn));

  return(
    <Route path={path}>
      {loggedIn ? component : <Redirect to="/404" />}
    </Route>
  );
}

const AuthRoute = ({path, component}) => {
  const loggedIn = useSelector((state) => (state.auth.loggedIn));

  return(
    <Route path={path}>
      {loggedIn ? <Redirect to="/" /> : component}
    </Route>
  );
}

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
          <Route exact path="/" component={Home} />

          <AuthRoute path="/login" component={<LoginPage />} />
          <AuthRoute path="/registration" component={<SignUpPage />} />

          <PrivateRoute path="/profile" component={<Profile />} />

          <Route path="/404" component={PageNotFound} />
          <Route path="*">
            <Redirect to="/404" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
