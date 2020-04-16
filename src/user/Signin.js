import React from "react";
import Base from "../core/Base";
import { useState } from "react";
import { isAuthenticated, signin, authenticate } from "../auth/helper";
import { Link, Redirect } from "react-router-dom";

const Signin = () => {
  const [values, setValues] = useState({
    email: "sandeep@gmail.com",
    password: "12345",
    error: false,
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();
  const handleChange = (name) => {
    return (event) => {
      setValues({
        ...values,
        error: false,
        [name]: event.target.value,
      });
    };
  };

  const loadingMessage = (
    <div
      className="alert alert-info"
      style={{ display: loading ? "block" : "none" }}>
      <div className="text-center">Loading...</div>
    </div>
  );

  const errorMessage = (
    <div
      className="alert alert-danger"
      style={{ display: error ? "block" : "none" }}>
      {error}
    
      </div>
  );

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true });

    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({ ...values, didRedirect: true });
          });
        }
      })
      .catch(() => {
        console.log("sign in request failed");
        setValues({ ...values, loading: false, error: "Something went wrong" });
      });
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <p>redirect to admin</p>;
      } else {
        return <p>redirect to user dashboard</p>;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const signInForm = (
    <div className="row">
      <div className="col-md-4 offset-md-4">
        <form>
          {errorMessage}
          <div className="form-group">
            <label className="text-light">Email</label>
            <input
              className="form-control"
              onChange={handleChange("email")}
              value={email}
              type="text"
            ></input>
          </div>

          <div className="form-group">
            <label className="text-light">Passsword</label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={handleChange("password")}
            />
          </div>
          <button className="btn btn-success btn-block" onClick={onSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <Base title="Sign in page" description="Login to your account">
      {signInForm}
      {performRedirect()}
      {loadingMessage}
    </Base>
  );
};

export default Signin;
