export const LOGOUT_USER = 'LOGOUT_USER';

const logoutUser = () => {
  localStorage.removeItem('token');

  return(
    {
      type: LOGOUT_USER,
      payload: {
        loggedIn: false
      }
    }
  );
}

export default logoutUser;
