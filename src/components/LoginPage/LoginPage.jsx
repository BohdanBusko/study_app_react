import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  TextField,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { createSession } from '../../redux/actions/loginUser';

const useStyles = makeStyles({
  root: {
    paddingTop: '20px',
  },
})

const LoginPage = () => {
  const { register, handleSubmit, errors, reset } = useForm();
  const [wrongPassOrEmail, setWrongPassOrEmail] = useState(false)
  const dispatch = useDispatch();
  const classes = useStyles();

  const onSubmit = async (data) => {
    await dispatch(createSession(data));

    if(!localStorage.getItem('token')) {
      setWrongPassOrEmail(true)
    } else {
      setWrongPassOrEmail(false)
    }

    reset({email: data.email});
  }

  return(
    <Grid
      container
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction="column" spacing={2}>
          { wrongPassOrEmail &&
            <div className="error-label">
              Wrong password or email
            </div>
          }
          <TextField
            name="email"
            type="email"
            inputRef={register({required: "Email can't be blank"})}
            variant="outlined"
            label="Email"
            margin="normal"
            inputProps={{
              "data-testid": 'email'
            }}
          />
          { errors.email &&
            <label className="error-label">
              {errors.email.message}
            </label>
          }
          <TextField
            name="password"
            type="password"
            inputRef={register({required: "Password can't be blank"})}
            variant="outlined"
            label="Password"
            margin="normal"
            inputProps={{
              "data-testid": 'password'
            }}
          />
          { errors.password &&
            <label className="error-label">
              {errors.password.message}
            </label>
          }
          <Button
            variant="contained"
            type="submit"
            data-testid="login-button"
          >
            Login
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}

export default LoginPage;
