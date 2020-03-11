import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signUp, signIn } from "../../actions";
import Header from "../UI/Header";
import { Link } from "react-router-dom";
import Spinner from "../UI/Spinner";

function SignUp(props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });
  const [loading, setLoading] = useState(false);
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(state => ({ ...state, [name]: value }));
  }

  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);
    await props.signUp(formData);
    setLoading(false);
  }
  return (
    <Fragment>
      <Header />
      <div className="page page--header-single">
        <main className="main">
          <div className="container">
            {(loading && <Spinner />) || (
              <form onSubmit={submitHandler} className="form form--auth">
                <div className="form__group">
                  <label htmlFor="name" className="form__label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form__input"
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                    onChange={handleChange}
                    value={formData.name}
                  />
                </div>
                <div className="form__group">
                  <label htmlFor="email" className="form__label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form__input"
                    id="email"
                    name="email"
                    placeholder="your@email.com"
                    required
                    onChange={handleChange}
                    value={formData.email}
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
                    placeholder="Your Password"
                    minlength="6"
                    required
                    onChange={handleChange}
                    value={formData.password}
                    
                  />
                </div>
                <div className="form__group">
                  <label htmlFor="password2" className="form__label">
                    Repeat password
                  </label>
                  <input
                    type="password"
                    className="form__input"
                    id="password2"
                    name="password2"
                    placeholder="Your Password"
                    minlength="6"
                    required
                    onChange={handleChange}
                    value={formData.password2}
                  />
                </div>
                <div className="form__group">
                  <button className="btn btn--primary">Register</button>
                </div>
                <div className="form__group">
                  Already have an account? <Link to="/signin">Sign In!</Link>
                </div>
              </form>
            )}
          </div>
        </main>
      </div>
    </Fragment>
  );
}

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired
};

export default connect(null, { signUp, signIn })(SignUp);
