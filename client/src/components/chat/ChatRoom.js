import React, { useState, useEffect, Fragment, useRef } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { getMessages } from "../../actions";
//import PropTypes from "prop-types";
import autosize from "autosize";
import Header from "../UI/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../UI/Spinner";

function ChatRoom({
  getMessages,
  client,
  rooms,
  messages,
  users,
  location,
  history
}) {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const room = location.pathname.split("/")[2];
  const roomList = Object.keys(rooms).map(rm => rooms[rm]);
  const userList = Object.keys(users).map(id => users[id]);
  const onlineUsers = userList.filter(
    user => user.status === "Online" || user.status === "Idle"
  );
  const offlineUsers = userList.filter(user => user.status === "Offline");

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (!rooms[room]) {
        return;
      }
      await getMessages(rooms[room]._id);

      setLoading(false);
    })();
  }, [getMessages, room, rooms]);

  function handleChange(e) {
    const { value } = e.target;
    setMessage(value);
  }
  function handleKeyPress(e) {
    const { charCode, shiftKey } = e;
    if (charCode === 13 && !shiftKey) {
      e.preventDefault();
      handleSubmit(message);
    }
    if (charCode === 13 && shiftKey) {
      setMessage(msg => msg + "\n");
    }
  }

  async function handleSubmit(msg) {
    msg = msg.trim();
    if (!msg) {
      return;
    }
    send("chat", "sendMessage", { text: msg, room: rooms[room]._id });
    setMessage("");
  }

  const inputArea = useRef(null);
  const messageContainer = useRef(null);

  useEffect(() => {
    messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    autosize(inputArea.current);
  }, [inputArea]);
  return (
    <Fragment>
      <Header auth heading={room} />
      <div className="page">
        <div className="sidebar sidebar--left">
          <div className="list">
            {roomList.map(rm => (
              <div className="list__item" key={rm._id}>
                <Link
                  to={rm.name}
                  className={`list__link ${
                    rm.name === room ? "list__link--active" : null
                  }`}
                >
                  <FontAwesomeIcon icon={faHashtag} /> {rm.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <main className="main">
          <div className="chat">
            <div className="chat__messages" ref={messageContainer}>
              {(loading && <Spinner />) || (
                <Fragment>
                  {messages[rooms[room]._id].map(msg => (
                    <div className="message" key={msg._id}>
                      <div className="message__avatar">
                        <div
                          className={`avatar avatar--${users[
                            msg.sender
                          ].status.toLowerCase()}`}
                        >
                          <img
                            src={users[msg.sender].avatar}
                            alt={users[msg.sender].name}
                            className="avatar__image"
                          />
                        </div>
                      </div>
                      <span className="message__sender">
                        {users[msg.sender].name}
                      </span>
                      <span className="message__date">
                        &nbsp;&nbsp;
                        <Moment format="DD/MM/YY - HH:mm">{msg.date}</Moment>
                      </span>
                      <p className="message__content">{msg.text}</p>
                    </div>
                  ))}
                </Fragment>
              )}
            </div>
            <div className="chat__inputs">
              <textarea
                ref={inputArea}
                className="chat__text-input"
                disabled={loading || !rooms[room]}
                rows="1"
                value={message}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
              ></textarea>
              <div className="chat__send-button">
                <button
                  disabled={loading || !rooms[room]}
                  className="btn btn--icon"
                  onClick={() => handleSubmit(message)}
                >
                  <FontAwesomeIcon icon={faPaperPlane} transform="grow2" />
                </button>
              </div>
            </div>
          </div>
        </main>
        <div className="sidebar sidebar--right">
          <div className="sidebar__heading sidebar__heading--small">
            Online — {onlineUsers.length}
          </div>
          <div className="list">
            {onlineUsers.map(usr => (
              <div className="list__item" key={usr._id}>
                <Link to="" className="list__link">
                  <div
                    className={`avatar avatar--${users[
                      usr._id
                    ].status.toLowerCase()}`}
                  >
                    <img
                      src={users[usr._id].avatar}
                      alt=""
                      className="avatar__image"
                    />{" "}
                  </div>
                  <span className="list__username">{users[usr._id].name}</span>
                </Link>
              </div>
            ))}
          </div>
          <div className="sidebar__heading sidebar__heading--small">
            Offline — {offlineUsers.length}
          </div>
          <div className="list">
            {offlineUsers.map(usr => (
              <div className="list__item" key={usr._id}>
                <Link to="" className="list__link">
                  <div
                    className={`avatar avatar--${users[
                      usr._id
                    ].status.toLowerCase()}`}
                  >
                    <img
                      src={users[usr._id].avatar}
                      alt=""
                      className="avatar__image"
                    />{" "}
                  </div>
                  <span className="list__username">{users[usr._id].name}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

//ChatRoom.propTypes = {};

const mapStateToProps = state => ({
  rooms: state.rooms,
  messages: state.messages,
  client: state.client.details,
  users: state.users
});

export default connect(mapStateToProps, { getMessages })(ChatRoom);
