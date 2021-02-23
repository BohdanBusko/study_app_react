import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  TextField,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import createSession from '../../redux/actions/loginUser';

const useStyles = makeStyles({
  root: {
    paddingTop: '20px',
  },
})

const LoginPage = () => {
  const { register, handleSubmit, errors } = useForm();
  const wrongPassOrEmail = useSelector((state) => state.auth.wrongPassOrEmail);
  const dispatch = useDispatch();
  const classes = useStyles();

  const onSubmit = (data) => {
    dispatch(createSession(data));
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
          />
          { errors.password &&
            <label className="error-label">
              {errors.password.message}
            </label>
          }
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}

export default LoginPage;
