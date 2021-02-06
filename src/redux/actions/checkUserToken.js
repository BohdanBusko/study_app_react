const checkToken = () => {
  return (
    {
      type: 'CHECK_USER_TOKEN',
      payload: {
        loggedIn: !!localStorage.getItem('token')
      }
    }
  )
}

export default checkToken;
