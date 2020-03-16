import { GET_ROOMS_SUCCESS } from "../actions/types";

const initialState = {};

const roomsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROOMS_SUCCESS:
      return action.payload.reduce((acc, room) => {
        return Object.assign(acc, { [room.name]: { ...room } });
      }, {});
    default:
      return state;
  }
};

export default roomsReducer;
