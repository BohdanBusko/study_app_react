import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Grid, TextField, Button } from '@material-ui/core';

import { updateUserProfile } from '../../redux/actions/profile';

const Profile = () => {
  const { handleSubmit, register, errors } = useForm();
  const userData = useSelector((state) => (state.user));
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(updateUserProfile(data));
  }

  return(
    <Grid
      container
      alignItems="center"
      justify="center"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        { userData.loading ?
          <>
            <h1>Loading...</h1>
          </> :
          <Grid container direction="column" spacing={2}>
            <TextField
              name="first_name"
              variant="outlined"
              margin="normal"
              inputRef={register({
                required: "First name can't be blank"
              })}
              defaultValue={userData.first_name}
              inputProps={{
                "data-testid": 'first_name'
              }}
            />
            { errors.first_name &&
              <label className="error-label">
                {errors.first_name.message}
              </label>
            }
            <TextField
              name="last_name"
              variant="outlined"
              margin="normal"
              inputRef={register({
                required: "Last name can't be blank"
              })}
              defaultValue={userData.last_name}
              inputProps={{
                "data-testid": 'last_name'
              }}
            />
            { errors.last_name &&
              <label className="error-label">
                {errors.last_name.message}
              </label>
            }
            <TextField
              name="email"
              variant="outlined"
              margin="normal"
              inputRef={register({
                required: "Email can't be blank"
              })}
              defaultValue={userData.email}
              inputProps={{
                "data-testid": 'email'
              }}
            />
            { errors.email &&
              <label className="error-label">
                {errors.email.message}
              </label>
            }
            <Button
              variant="contained"
              type="submit"
              data-testid="update-profile-button"
            >
              Save
            </Button>
          </Grid>
        }
      </form>
    </Grid>
  );
}

export default Profile;
