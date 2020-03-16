import { GET_MESSAGES_SUCCESS, RECEIVED_MESSAGE } from "../actions/types";

const initialState = {};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        [action.payload.room]: action.payload.messages
      };
    case RECEIVED_MESSAGE:
      return {
        ...state,
        [action.payload.room]: [...state[action.payload.room]].concat(action.payload)
      };
    default:
      return state;
  }
};

export default messagesReducer;
