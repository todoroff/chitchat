import { send } from "../utils/socket";
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  SIGNOUT_REQUEST,
  SIGNOUT_SUCCESS,
  SIGNOUT_FAILURE,
  GET_CLIENT_DETAILS_REQUEST,
  GET_CLIENT_DETAILS_SUCCESS,
  GET_CLIENT_DETAILS_FAILURE
} from "./types";

export const signUp = formData => async dispatch => {
  dispatch({
    type: SIGNUP_REQUEST
  });
  try {
    await send("auth", "signUp", formData);
    dispatch({
      type: SIGNUP_SUCCESS
    });
  } catch (err) {
    dispatch({
      type: SIGNUP_FAILURE,
      error: err
    });
    return;
  }
  await dispatch(signIn(formData));
};

export const signIn = formData => async dispatch => {
  dispatch({
    type: SIGNIN_REQUEST
  });
  try {
    await send("auth", "signIn", formData);
    dispatch({
      type: SIGNIN_SUCCESS
    });
    dispatch(getClientDetails());
  } catch (err) {
    dispatch({
      type: SIGNIN_FAILURE,
      error: err
    });
  }
};

export const signOut = () => async dispatch => {
  dispatch({
    type: SIGNOUT_REQUEST
  });
  try {
    await send("auth", "signOut");
    dispatch({
      type: SIGNOUT_SUCCESS
    });
  } catch (err) {
    dispatch({
      type: SIGNOUT_FAILURE,
      error: err
    });
  }
};

export const getClientDetails = () => async dispatch => {
  dispatch({
    type: GET_CLIENT_DETAILS_REQUEST
  });
  try {
    const res = await send("auth", "getLoggedInUser");
    dispatch({
      type: GET_CLIENT_DETAILS_SUCCESS,
      payload: res
    });
  } catch (err) {
    dispatch({
      type: GET_CLIENT_DETAILS_FAILURE
    });
  }
};
