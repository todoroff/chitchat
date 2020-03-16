import React, { useEffect, useState } from "react";
import { Switch, Redirect, withRouter, useLocation } from "react-router-dom";

import posed, { PoseGroup } from "react-pose";
import { connect } from "react-redux";
import {
  getClientDetails,
  getUsers,
  getRooms,
  receivedMessage,
  updatedUser
} from "./actions";
import AuthRoute from "./routing/AuthRoute";
import GuestRoute from "./routing/GuestRoute";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import ChatRoom from "./components/chat/ChatRoom";
import Spinner from "./components/UI/Spinner";
import socket from "./utils/socket";

function App({
  client,
  getClientDetails,
  getUsers,
  getRooms,
  receivedMessage,
  updatedUser
}) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      await getClientDetails();
      setLoading(false);
    })();
  }, [getClientDetails, setLoading]);

  useEffect(() => {
    if (client.isLoggedIn) {
      (async () => {
        setLoading(true);
        await getUsers();
        await getRooms();
        socket.on("message", msg => {
          receivedMessage(msg);
        });
        socket.on("updatedUser", usr => {
          updatedUser(usr);
        });
        setLoading(false);
      })();
    }
  }, [getUsers, getRooms, receivedMessage, client.isLoggedIn]);

  const location = useLocation();
  const RoutesContainer = posed.div({
    enter: { opacity: 1, delay: 50 },
    exit: { opacity: 0.25 }
  });

  return (
    <div className="wrapper">
      {(loading && <Spinner />) || (
        <PoseGroup>
          <RoutesContainer key={location.key || Date.now()}>
            <Switch location={location}>
              <GuestRoute exact path="/">
                <Redirect to="/signin" />
              </GuestRoute>
              <GuestRoute exact path="/signup" component={SignUp} />
              <GuestRoute exact path="/signin" component={SignIn} />
              <AuthRoute exact path="/chat/:room" component={ChatRoom} />
            </Switch>
          </RoutesContainer>
        </PoseGroup>
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  client: state.client
});

export default connect(mapStateToProps, {
  getClientDetails,
  getUsers,
  getRooms,
  receivedMessage,
  updatedUser
})(withRouter(App));
