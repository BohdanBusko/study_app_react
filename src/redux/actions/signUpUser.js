import fetchData from '../../config/axios';

const signUpUser = (data = {}) => {
  const response = async () => {
    return await fetchData.post('/api/v1/registration', data)
                          .then(({data}) => (data.data.attributes.token))
                          .catch((err) => console.log(err));
  }

  localStorage.setItem('token', response);

  return (
    {
      type: 'SIGN_UP_USER',
      paylod: {
        loggedIn: true
      }
    }
  );
}

export default signUpUser;
