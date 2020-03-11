import io from "socket.io-client";

const socket = io("https://localhost:8443");

export function send(route, method, payload) {
  return new Promise((resolve, reject) => {
    function onResponse(response = {}) {
      if (response.error) {
        reject(response.error);
      } else {
        resolve(response);
      }
    }
    console.log('sent')
    socket.emit(route, { method, payload }, onResponse);
  });
}

export default socket;
