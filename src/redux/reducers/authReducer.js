const initState = {
  loggedIn: false,
  wrongPassOrEmail: false
}

const authReducer = (state = initState, action) => {
  switch(action.type) {
    case 'LOGIN_USER':
    case 'LOGOUT_USER':
    case 'SIGN_UP_USER':
    case 'WRONG_PASS_OR_EMAIL':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export default authReducer;
