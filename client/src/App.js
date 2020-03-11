import React, { useEffect, useState } from "react";
import {
  Switch,
  Redirect,
  withRouter,
  useLocation,
} from "react-router-dom";

import posed, { PoseGroup } from "react-pose";
import { connect } from "react-redux";
import { getClientDetails } from "./actions";
import AuthRoute from "./routing/AuthRoute";
import GuestRoute from "./routing/GuestRoute";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import ChatRoom from "./components/chat/ChatRoom";
import Spinner from "./components/UI/Spinner";

function App({ getClientDetails }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      await getClientDetails();
      setLoading(false);
    })();
  }, [getClientDetails, setLoading]);

  const location = useLocation();
  const RoutesContainer = posed.div({
    enter: { opacity: 1, delay: 50 },
    exit: { opacity: 0.25 }
  });

  return (
    <div className="wrapper">
      {(loading && <Spinner/>) || 
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
      </PoseGroup>}
    </div>
  );
}

export default connect(null, { getClientDetails })(withRouter(App));
