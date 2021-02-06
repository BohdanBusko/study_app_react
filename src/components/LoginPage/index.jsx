import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
  Grid,
  TextField,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import fetchData from '../../config/axios';

import loginUser from '../../redux/actions/loginUser';
import getUserData from '../../redux/actions/getUserData';

const useStyles = makeStyles({
  root: {
    paddingTop: '20px',
  },
})

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const classes = useStyles();

  const onSubmit = (data) => {
    fetchData.post('/api/v1/sessions', { session: data })
             .then(({data}) => {
               localStorage.setItem('token', data.data.attributes.token)
               dispatch(loginUser());
               dispatch(getUserData(data.data.attributes.user.data.attributes))
             })
             .catch((err) => console.log(err));
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
            inputRef={register}
            variant="outlined"
            label="Email"
            margin="normal"
          />
          <TextField
            name="password"
            inputRef={register}
            variant="outlined"
            label="Password"
            margin="normal"
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}

export default LoginPage;
