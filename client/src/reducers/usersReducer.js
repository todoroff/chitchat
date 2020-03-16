import { GET_USERS_SUCCESS, UPDATED_USER } from "../actions/types";

const initialState = {};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return action.payload.reduce((acc, user) => {
        return Object.assign(acc, { [user._id]: { ...user } });
      }, {});
    case UPDATED_USER:
      return {
        ...state,
        [action.payload._id]: action.payload
      };
    default:
      return state;
  }
};

export default usersReducer;
