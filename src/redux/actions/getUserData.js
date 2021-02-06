const getUserData = (data) => {
  return({
    type: 'GET_USER_DATA',
    payload: data
  });
}

export default getUserData;
