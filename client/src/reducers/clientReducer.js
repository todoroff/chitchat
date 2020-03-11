import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  SIGNOUT_REQUEST,
  SIGNOUT_SUCCESS,
  GET_CLIENT_DETAILS_REQUEST,
  GET_CLIENT_DETAILS_SUCCESS,
  GET_CLIENT_DETAILS_FAILURE
} from "../actions/types";

const initialState = {
  details: null,
  isLoggedIn: false,
  error: null
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNOUT_REQUEST:
    case SIGNIN_REQUEST:
    case SIGNUP_REQUEST:
    case GET_CLIENT_DETAILS_REQUEST:
      return {
        ...state,
        error: null
      };
    case SIGNIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        error: null
      };
    case GET_CLIENT_DETAILS_SUCCESS:
      return {
        ...state,
        details: action.payload,
        isLoggedIn: true,
        error: null
      };
    case SIGNOUT_SUCCESS:
    case SIGNUP_FAILURE:
    case SIGNIN_FAILURE:
    case GET_CLIENT_DETAILS_FAILURE:
      return {
        ...state,
        details: null,
        isLoggedIn: false,
        error: action.error || null
      };

    default:
      return state;
  }
};

export default clientReducer;
