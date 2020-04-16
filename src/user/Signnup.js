import React, { useState } from "react";
import Base from "../core/Base";
import { signup } from "../auth/helper/index";
import { Link } from "react-router-dom";
const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    success: false,
  });

  const { name, email, password, success } = values;

  const handleChange = (name) => {
    return (event) => {
      setValues({
        ...values,
        [name]: event.target.value,
      });
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    signup({ name, email, password })
      .then((data) => {
        console.log(data);
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
          });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            success: true,
          });
        }
      })
      .catch((error) => {
        console.log("error in signup");
      });
  };

  const successMessage = (
    <div
      className="alert alert-success"
      style={{ display: success ? "block" : "none" }}
    >
      Signup successfull. Login to your account using this
      <Link to="/signin"> link</Link>
    </div>
  );


  const errorMessage= (
    <div
    className="alert alert-danger"
    style={{ display: values.error ? "block" : "none" }}>
    {values.error}
    </div>
  )
  const signUpForm = (
    <div className="row">
      <div className="col-md-4 offset-md-4">
        {successMessage}
        {errorMessage}
        <form>
          <div className="form-group">
            <label className="text-light">Name</label>
            <input
              className="form-control"
              onChange={handleChange("name")}
              value={name}
              type="text"
            ></input>
          </div>

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
              onChange={handleChange("password")}
              value={password}
              type="password"
            ></input>
          </div>
          <button onClick={handleSubmit} className="btn btn-success btn-block">
            Submit
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <Base title="Sign up page" description="A page to register new users">
      {signUpForm}
    </Base>
  );
};

export default Signup;
