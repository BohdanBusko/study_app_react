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
  const { register, handleSubmit } = useForm();
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
            name="email"
            ref={register}
            variant="outlined"
            label="Email"
            margin="normal"
          />
          <TextField
            name="password"
            ref={register}
            variant="outlined"
            label="Password"
            margin="normal"
          />
          <Button variant="contained">
            Sign Up
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}

export default SignUpPage;
