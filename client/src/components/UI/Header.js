import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { signOut } from "../../actions";
import {
  faHashtag,
  faCog,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

function Header(props) {
  const authContent = (
    <Fragment>
      <div className="header__section header__section--left">
        <Link to="/" className="header__logo">
          ChitChat
        </Link>
      </div>
      <div className="header__section header__section--right">
        <div className="header__heading">
          {props.heading ? (
            <Fragment>
              <FontAwesomeIcon icon={faHashtag} /> {props.heading}
            </Fragment>
          ) : null}
        </div>
        <div className="header__controls">
          <div className="header__control">
            <Link className="btn btn--icon" to="/settings">
              <FontAwesomeIcon icon={faCog} transform="grow-3" />
            </Link>
          </div>
          <div className="header__control">
            <button className="btn btn--icon" onClick={props.signOut}>
              <FontAwesomeIcon icon={faSignOutAlt} transform="grow-3" />
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );

  const guestContent = (
    <Fragment>
      <div className="header__section header__section--single">
        <Link to="/" className="header__logo">
          ChitChat
        </Link>
      </div>
    </Fragment>
  );

  const content = props.auth ? authContent : guestContent;

  return <header className="header">{content}</header>;
}

Header.propTypes = {
  auth: PropTypes.bool,
  heading: PropTypes.string,
  signOut: PropTypes.func.isRequired
};

export default connect(null, { signOut })(Header);
