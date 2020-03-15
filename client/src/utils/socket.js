import io from "socket.io-client";
import store from "../store";

const socket = io("https://localhost:8443");

export function send(route, method, payload) {
  return new Promise((resolve, reject) => {
    async function onResponse(response = {}) {
      if (response.error) {
        console.log(response);
        //if missing logged in session, set loggedIn state to false
        if (response.error.type === "authorizationError") {
          await store.dispatch({ type: "AUTH_FAILURE" });
        }
        reject(response.error);
      } else {
        resolve(response);
      }
    }
    socket.emit(route, { method, payload }, onResponse);
  });
}

export default socket;
