import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Paper, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { fetchOrganizations } from '../../redux/actions/organizations';

const useStyles = makeStyles((theme) => (
  {
    container: {
      paddding: "20px 20px",
    },
    paper: {
      width: "100%",
      height: "100px",
      fontSize: "24px",
      textAlign: "center"
    }
  }
));

const Organizations = ({organizations = []}) => {
  const classes = useStyles();

  return organizations.map((organization) => {
    return(
      <Grid
        container
        item
        xs={12}
        md={4}
        key={`organization-${organization.id}`}
      >
        <Paper className={classes.paper}>
          {organization.attributes.name}
        </Paper>
      </Grid>
    );
  });
}

const OrganizationsPage = () => {
  const dispatch = useDispatch();
  const organizations = useSelector((state) => state.organizations.data);
  const loading = useSelector((state) => state.organizations.loading);
  const classes = useStyles();

  useEffect(() => {
    if(!organizations.data) {
      dispatch(fetchOrganizations());
    }
  }, [organizations.data, dispatch]);

  return(
    <Container className={classes.container}>
      { loading ? <h1>Loading...</h1> : <div>
          { organizations ? <Grid container spacing={3} className={classes.container}>
              <Organizations organizations={organizations}/>
            </Grid> : <h1>No organizatoins</h1>
          }
        </div>
      }
    </Container>
  )
}

export default OrganizationsPage;
