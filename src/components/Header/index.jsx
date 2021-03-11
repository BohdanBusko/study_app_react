import React from 'react';
import {
  AppBar,
  Typography,
  Toolbar,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import logoutUser from '../../redux/actions/logoutUser';

const useStyles = makeStyles((theme) => (
  {
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1
    }
  }
));

const Header = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const user = useSelector((state) => state.user)
  const classes = useStyles();
  const dispatch = useDispatch();

  return(
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <Link to="/">
            My App
          </Link>
        </Typography>
        { !loggedIn &&
          <>
            <Button color="inherit" className={classes.button}>
              <Link to="/login">
                Sign In
              </Link>
            </Button>
            |
            <Button color="inherit" className={classes.button}>
              <Link to="/registration">
                Sign Up
              </Link>
            </Button>
          </>
        }
        { loggedIn &&
          <>
            <Typography>
              <Link to="/profile">
                { user.full_name }
              </Link>
            </Typography>
            |
            <Button
              color="inherit"
              onClick={() => dispatch(logoutUser())}
              data-testid="logout-button"
            >
              Logout
            </Button>
          </>
        }
      </Toolbar>
    </AppBar>
  );
}

export default Header;
