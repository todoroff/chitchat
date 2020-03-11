import React from "react";
import { Route, Redirect } from "react-router";
import { connect } from "react-redux";

const GuestRoute = ({
  component: Component,
  client: { isLoggedIn },
  ...rest
}) => {
if (isLoggedIn) {
    return <Redirect to="/chat/general" />;
  } else {
    return <Route render={props => <Component {...props} />} {...rest} />;
  }
};

const mapStateToProps = state => ({
  client: state.client
});

export default connect(mapStateToProps, null)(GuestRoute);
