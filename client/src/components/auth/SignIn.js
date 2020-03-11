import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { signIn } from "../../actions";
import PropTypes from "prop-types";
import Header from "../UI/Header";
import { Link } from "react-router-dom";
import Spinner from "../UI/Spinner";

function SignIn(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(state => ({ ...state, [name]: value }));
  }

  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);
    await props.signIn(formData);
    setLoading(false);
  }
  return (
    <Fragment>
      <Header />
      <div className="page page--header-single">
        <main className="main">
          <div className="container">
            {(loading && <Spinner />) || (
              <form
                onSubmit={submitHandler}
                className="form form--auth"
                disabled={loading}
              >
                <div className="form__group">
                  <label htmlFor="email" className="form__label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form__input"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    onChange={handleChange}
                    value={formData.email}
                    disabled={loading}
                  />
                </div>
                <div className="form__group">
                  <label htmlFor="password" className="form__label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form__input"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                    onChange={handleChange}
                    value={formData.password}
                    disabled={loading}
                  />
                </div>
                <div className="form__group">
                  <button className="btn btn--primary" disabled={loading}>
                    Log In
                  </button>
                </div>
                <div className="form__group">
                  Don't have an account? <Link to="/signup">Sign Up!</Link>
                </div>
              </form>
            )}
          </div>
        </main>
      </div>
    </Fragment>
  );
}

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired
};

export default connect(null, { signIn })(SignIn);
