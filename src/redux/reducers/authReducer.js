const initState = {
  loggedIn: false,
}

const authReducer = (state = initState, action) => {
  switch(action.type) {
    case 'LOGIN_USER':
      return { ...state, ...action.payload };
    case 'LOGOUT_USER':
      return { ...state, ...action.payload };
    case 'SIGN_UP_USER':
      return { ...state, ...action.payload };
    case 'CHECK_USER_TOKEN':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export default authReducer;
