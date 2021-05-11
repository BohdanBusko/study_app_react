import {
  LOADING_ORGANIZATIONS,
  ORGANIZATIONS_LOADED,
  SET_ORGANIZATIONS_DATA
} from '../actions/organizations';

const initState = {
  loading: false,
  data: []
}

const organizationsReducer = (state = initState, action) => {
  switch(action.type) {
    case LOADING_ORGANIZATIONS:
    case ORGANIZATIONS_LOADED:
    case SET_ORGANIZATIONS_DATA:
      return { ...state, ...action.payload }
    default:
      return state;
  }
}

export default organizationsReducer;
