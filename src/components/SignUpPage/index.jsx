import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
  Grid,
  TextField,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import signUpUser from '../../redux/actions/signUpUser';

const useStyles = makeStyles({
  root: {
    paddingTop: '20px',
  },
})

const SignUpPage = () => {
  const { register, handleSubmit, errors, getValues } = useForm();
  const dispatch = useDispatch();
  const classes = useStyles();

  const onSubmit = (data) => {
    dispatch(signUpUser(data));
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
          <TextField
            name="first_name"
            inputRef={register({required: "First name can't be blank"})}
            variant="outlined"
            label="First name"
            margin="normal"
            data-testid="first_name"
          />
          { errors.first_name &&
            <label className="error-label">
              {errors.first_name.message}
            </label>
          }
          <TextField
            name="last_name"
            inputRef={register({required: "Last name can't be blank"})}
            variant="outlined"
            label="Last name"
            margin="normal"
            data-testid="last_name"
          />
          { errors.last_name &&
            <label className="error-label">
              {errors.last_name.message}
            </label>
          }
          <TextField
            name="email"
            type="email"
            inputRef={register({
              required: "Email can't be blank"
            })}
            variant="outlined"
            label="Email"
            margin="normal"
            data-testid="email"
          />
          { errors.email &&
            <label className="error-label">
              {errors.email.message}
            </label>
          }
          <TextField
            name="password"
            type="password"
            inputRef={register({
              required: "Password can't be blank",
              minLength: {
                value: 6,
                message: 'Password must contain at least 6 characters'
              }
            })}
            variant="outlined"
            label="Password"
            margin="normal"
            data-testid="password"
          />
          { errors.password &&
            <label className="error-label">
              {errors.password.message}
            </label>
          }
          <TextField
            name="password_confirmation"
            type="password"
            inputRef={register({
              required: "Password confirmation can't be blank",
              validate: (value) => {
                const password = getValues('password') || '';
                return(value === password || "The password does not match");
              }
            })}
            variant="outlined"
            label="Password confirmation"
            margin="normal"
            data-testid="password_confirmation"
          />
          { errors.password_confirmation &&
            <label className="error-label">
              {errors.password_confirmation.message}
            </label>
          }
          <Button variant="contained" type="submit" data-testid="signup-button">
            Sign Up
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}

export default SignUpPage;
