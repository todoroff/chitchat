import { combineReducers } from "redux";
import clientReducer from "./clientReducer";
import usersReducer from "./usersReducer";
import roomsReducer from "./roomsReducer";
import messagesReducer from "./messagesReducer";

export default combineReducers({
  client: clientReducer,
  users: usersReducer,
  rooms: roomsReducer,
  messages: messagesReducer
});
