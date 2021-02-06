const loginUser = () => {
  return(
    {
      type: 'LOGIN_USER',
      payload: {
        loggedIn: true
      }
    }
  )
}

export default loginUser;
