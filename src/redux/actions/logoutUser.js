const logoutUser = () => {
  localStorage.removeItem('token');

  return(
    {
      type: 'LOGOUT_USER',
      payload: {
        loggedIn: false
      }
    }
  );
}

export default logoutUser;
