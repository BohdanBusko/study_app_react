import { useEffect } from 'react';
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

import fetchData from '../../config/axios';

import getUserData from '../../redux/actions/getUserData';
import checkUserToken from '../../redux/actions/checkUserToken';

import './app.scss';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserToken());

    fetchData.get('/api/v1/account/profile')
             .then(({data}) => {
               dispatch(getUserData(data.data.attributes));
             });
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
