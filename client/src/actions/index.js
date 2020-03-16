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
  GET_CLIENT_DETAILS_FAILURE,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  GET_ROOMS_REQUEST,
  GET_ROOMS_SUCCESS,
  GET_ROOMS_FAILURE,
  GET_MESSAGES_REQUEST,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAILURE,
  RECEIVED_MESSAGE,
  UPDATED_USER
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

export const getUsers = () => async dispatch => {
  dispatch({ type: GET_USERS_REQUEST });
  try {
    const res = await send("user", "getUsers");
    dispatch({ type: GET_USERS_SUCCESS, payload: res });
  } catch (err) {
    dispatch({
      type: GET_USERS_FAILURE
    });
  }
};

// export const getRoom = name => async dispatch => {
//   dispatch({ type: GET_ROOM_REQUEST });

//   try {
//     const res = await send("chat", "getRoom", { name });
//     dispatch({
//       type: GET_ROOM_SUCCESS,
//       payload: { name: res.name, _id: res._id }
//     });
//   } catch (err) {
//     dispatch({ type: GET_ROOM_FAILURE });
//   }
// };

export const getRooms = () => async dispatch => {
  dispatch({ type: GET_ROOMS_REQUEST });

  try {
    const res = await send("chat", "getRooms");
    dispatch({
      type: GET_ROOMS_SUCCESS,
      payload: res
    });
  } catch (err) {
    dispatch({ type: GET_ROOMS_FAILURE });
  }
};

export const getMessages = roomId => async dispatch => {
  dispatch({ type: GET_MESSAGES_REQUEST });

  try {
    const res = await send("chat", "getMessages", { room: roomId });
    dispatch({
      type: GET_MESSAGES_SUCCESS,
      payload: { room: roomId, messages: res }
    });
  } catch (err) {
    dispatch({ type: GET_MESSAGES_FAILURE });
  }
};

export const receivedMessage = msg => async dispatch => {
  dispatch({ type: RECEIVED_MESSAGE, payload: msg });
};

export const updatedUser = usr => async dispatch => {
  console.log(usr);
  dispatch({ type: UPDATED_USER, payload: usr });
};
