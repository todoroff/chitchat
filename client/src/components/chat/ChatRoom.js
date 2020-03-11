import React, { useState, useEffect, Fragment, useRef } from "react";
import PropTypes from "prop-types";
import autosize from "autosize";
import Header from "../UI/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../UI/Spinner";

function ChatRoom(props) {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  function handleChange(e) {
    const { value } = e.target;
    setMessage(value);
  }
  function handleKeyPress(e) {
    const { charCode, shiftKey } = e;
    if (charCode == 13 && !shiftKey) {
      e.preventDefault();
      handleSubmit(message);
    }
    if (charCode == 13 && shiftKey) {
      setMessage(msg => msg + "\n");
    }
  }

  function handleSubmit(msg) {
    if (!msg.trim()) {
      return;
    }
    console.log("submitted: " + msg.trim());
    setMessage("");
  }
  useEffect(() => {
    new Promise((res, rej) => setTimeout(() => res(), 1000)).then(() =>
      setLoading(false)
    );
  }, [setLoading]);

  const inputArea = useRef(null);
  useEffect(() => {
    autosize(inputArea.current);
  }, [autosize, inputArea]);

  return (
    <Fragment>
      <Header auth heading="General" />
      <div className="page">
        <div className="sidebar sidebar--left">
          <div className="list">
            <div className="list__item">
              <a href="#" className="list__link list__link--active">
                <FontAwesomeIcon icon={faHashtag} /> General
              </a>
            </div>
            <div className="list__item">
              <a href="#" className="list__link">
                <FontAwesomeIcon icon={faHashtag} /> Math
              </a>
            </div>
            <div className="list__item">
              <a href="#" className="list__link">
                <FontAwesomeIcon icon={faHashtag} /> Fitness
              </a>
            </div>
          </div>
        </div>
        <main className="main">
          <div className="chat">
            <div className="chat__messages">
              {(loading && <Spinner />) || (
                <Fragment>
                  <div className="message">
                    <div className="message__avatar">
                      <div className="avatar avatar--offline">
                        <img
                          src="./img/avatar2.png"
                          alt=""
                          className="avatar__image"
                        />
                      </div>
                    </div>
                    <span className="message__sender">Ruth</span>
                    <span className="message__date">12/07/23 16:00</span>
                    <p className="message__content">
                      That sounds like a horrible mentor.
                    </p>
                  </div>
                  <div className="message">
                    <div className="message__avatar">
                      <div className="avatar avatar--online">
                        <img
                          src="./img/avatar.png"
                          alt=""
                          className="avatar__image"
                        />
                      </div>
                    </div>
                    <span className="message__sender">Mihail</span>
                    <span className="message__date">12/07/23 16:00</span>
                    <p className="message__content">
                      It's more integreated and unlike exericsm, it's not really
                      about writing code the best way, so once you solve an
                      exercise and look at the top answers you see so many crazy
                      one-liners But because of that you do really get to see
                      some other perspectives on how to solve something, which
                      is great
                    </p>
                  </div>
                  <div className="message">
                    <div className="message__avatar">
                      <div className="avatar avatar--offline">
                        <img
                          src="./img/avatar2.png"
                          alt=""
                          className="avatar__image"
                        />
                      </div>
                    </div>
                    <span className="message__sender">Ruth</span>
                    <span className="message__date">12/07/23 16:00</span>
                    <p className="message__content">
                      i've been on the Ruby track for a while... decided to do
                      some js exercise from exercism today and i couldn't get
                      the test to pass... after like an hour of debugging, i
                      looked up js syntax and discoverd i was doing
                    </p>
                  </div>
                  <div className="message">
                    <div className="message__avatar">
                      <div className="avatar avatar--online">
                        <img
                          src="./img/avatar.png"
                          alt=""
                          className="avatar__image"
                        />
                      </div>
                    </div>
                    <span className="message__sender">Mihail</span>
                    <span className="message__date">12/07/23 16:00</span>
                    <p className="message__content">
                      I wonder if it's because I've got an AMD graphics card and
                      not nvidia. I really don't know.
                    </p>
                  </div>
                  <div className="message">
                    <div className="message__avatar">
                      <div className="avatar avatar--offline">
                        <img
                          src="./img/avatar2.png"
                          alt=""
                          className="avatar__image"
                        />
                      </div>
                    </div>
                    <span className="message__sender">Ruth</span>
                    <span className="message__date">12/07/23 16:00</span>
                    <p className="message__content">
                      Tried searching for why I would be getting this
                      notification and do not see anything or if I have to do
                      anything. [jland47/my_first_rails_app] Bump puma from
                      3.12.2 to 3.12.3 (#2)
                    </p>
                  </div>
                  <div className="message">
                    <div className="message__avatar">
                      <div className="avatar avatar--offline">
                        <img
                          src="./img/avatar2.png"
                          alt=""
                          className="avatar__image"
                        />
                      </div>
                    </div>
                    <span className="message__sender">Ruth</span>
                    <span className="message__date">12/07/23 16:00</span>
                    <p className="message__content">
                      That sounds like a horrible mentor.
                    </p>
                  </div>
                  <div className="message">
                    <div className="message__avatar">
                      <div className="avatar avatar--online">
                        <img
                          src="./img/avatar.png"
                          alt=""
                          className="avatar__image"
                        />
                      </div>
                    </div>
                    <span className="message__sender">Mihail</span>
                    <span className="message__date">12/07/23 16:00</span>
                    <p className="message__content">
                      It's more integreated and unlike exericsm, it's not really
                      about writing code the best way, so once you solve an
                      exercise and look at the top answers you see so many crazy
                      one-liners But because of that you do really get to see
                      some other perspectives on how to solve something, which
                      is great
                    </p>
                  </div>
                  <div className="message">
                    <div className="message__avatar">
                      <div className="avatar avatar--offline">
                        <img
                          src="./img/avatar2.png"
                          alt=""
                          className="avatar__image"
                        />
                      </div>
                    </div>
                    <span className="message__sender">Ruth</span>
                    <span className="message__date">12/07/23 16:00</span>
                    <p className="message__content">
                      i've been on the Ruby track for a while... decided to do
                      some js exercise from exercism today and i couldn't get
                      the test to pass... after like an hour of debugging, i
                      looked up js syntax and discoverd i was doing
                    </p>
                  </div>
                  <div className="message">
                    <div className="message__avatar">
                      <div className="avatar avatar--online">
                        <img
                          src="./img/avatar.png"
                          alt=""
                          className="avatar__image"
                        />
                      </div>
                    </div>
                    <span className="message__sender">Mihail</span>
                    <span className="message__date">12/07/23 16:00</span>
                    <p className="message__content">
                      I wonder if it's because I've got an AMD graphics card and
                      not nvidia. I really don't know.
                    </p>
                  </div>
                  <div className="message">
                    <div className="message__avatar">
                      <div className="avatar avatar--offline">
                        <img
                          src="./img/avatar2.png"
                          alt=""
                          className="avatar__image"
                        />
                      </div>
                    </div>
                    <span className="message__sender">Ruth</span>
                    <span className="message__date">12/07/23 16:00</span>
                    <p className="message__content">
                      Tried searching for why I would be getting this
                      notification and do not see anything or if I have to do
                      anything. [jland47/my_first_rails_app] Bump puma from
                      3.12.2 to 3.12.3 (#2)
                    </p>
                  </div>
                  <div className="message">
                    <div className="message__avatar">
                      <div className="avatar avatar--offline">
                        <img
                          src="./img/avatar2.png"
                          alt=""
                          className="avatar__image"
                        />
                      </div>
                    </div>
                    <span className="message__sender">Ruth</span>
                    <span className="message__date">12/07/23 16:00</span>
                    <p className="message__content">
                      That sounds like a horrible mentor.
                    </p>
                  </div>
                  <div className="message">
                    <div className="message__avatar">
                      <div className="avatar avatar--online">
                        <img
                          src="./img/avatar.png"
                          alt=""
                          className="avatar__image"
                        />
                      </div>
                    </div>
                    <span className="message__sender">Mihail</span>
                    <span className="message__date">12/07/23 16:00</span>
                    <p className="message__content">
                      It's more integreated and unlike exericsm, it's not really
                      about writing code the best way, so once you solve an
                      exercise and look at the top answers you see so many crazy
                      one-liners But because of that you do really get to see
                      some other perspectives on how to solve something, which
                      is great
                    </p>
                  </div>
                  <div className="message">
                    <div className="message__avatar">
                      <div className="avatar avatar--offline">
                        <img
                          src="./img/avatar2.png"
                          alt=""
                          className="avatar__image"
                        />
                      </div>
                    </div>
                    <span className="message__sender">Ruth</span>
                    <span className="message__date">12/07/23 16:00</span>
                    <p className="message__content">
                      i've been on the Ruby track for a while... decided to do
                      some js exercise from exercism today and i couldn't get
                      the test to pass... after like an hour of debugging, i
                      looked up js syntax and discoverd i was doing
                    </p>
                  </div>
                  <div className="message">
                    <div className="message__avatar">
                      <div className="avatar avatar--online">
                        <img
                          src="./img/avatar.png"
                          alt=""
                          className="avatar__image"
                        />
                      </div>
                    </div>
                    <span className="message__sender">Mihail</span>
                    <span className="message__date">12/07/23 16:00</span>
                    <p className="message__content">
                      I wonder if it's because I've got an AMD graphics card and
                      not nvidia. I really don't know.
                    </p>
                  </div>
                  <div className="message">
                    <div className="message__avatar">
                      <div className="avatar avatar--offline">
                        <img
                          src="./img/avatar2.png"
                          alt=""
                          className="avatar__image"
                        />
                      </div>
                    </div>
                    <a href="#" className="message__sender">
                      Ruth
                    </a>
                    <span className="message__date">12/07/23 16:00</span>
                    <p className="message__content">
                      Tried searching for why I would be getting this
                      notification and do not see anything or if I have to do
                      anything. [jland47/my_first_rails_app] Bump puma from
                      3.12.2 to 3.12.3 (#2)
                    </p>
                  </div>{" "}
                </Fragment>
              )}
            </div>
            <div className="chat__inputs">
              <textarea
                ref={inputArea}
                className="chat__text-input"
                disabled={loading}
                rows="1"
                value={message}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
              ></textarea>
              <div className="chat__send-button">
                <button
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
            Online — 1
          </div>
          <div className="list">
            <div className="list__item">
              <a href="#" className="list__link">
                <div className="avatar avatar--online">
                  <img
                    src="./img/avatar.png"
                    alt=""
                    className="avatar__image"
                  />{" "}
                </div>
                <span className="list__username">Mihail</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

ChatRoom.propTypes = {};

export default ChatRoom;
