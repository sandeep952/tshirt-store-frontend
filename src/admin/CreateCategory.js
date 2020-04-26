import React from "react";
import Base from "../core/Base";
import { useState } from "react";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminPanel";
import LoadingSpinner from "../core/LoadingSpinner";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading,setLoading] = useState(false)
  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true)

    createCategory({ name })
      .then((data) => {
        if (data.error) {
          setSuccess(false);
          setError(data.error);
          setLoading(false)
        } else {
          setName("");
          setError("");
          setSuccess(true);
          setLoading(false)
        }
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false)
      });
  };

  const errorMessage = (
    <div
      className="alert alert-danger"
      style={{ display: error ? "block" : "none" }}
    >
      {error}
    </div>
  );


  
  const successMessage = (
    <div
      className="alert alert-success"
      style={{ display: success ? "block" : "none" }}
    >
      Category added
    </div>
  );

  const addCategoryForm = (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <p className="lead text-white">Enter category name</p>
        <input
          type="text"
          className="form-control my-3"
          value={name}
          onChange={handleChange}
          autoFocus
          required
          placeholder="Ex. New arrivals"
        />
        <input type="submit" className="btn btn-danger" value="Submit" />
      </div>
      <LoadingSpinner loading={loading}/>
    </form>
  );
  return (
    <Base
      title="Create category page"
      description="add new categories here"
      className="container p-4"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {errorMessage}
          {successMessage}
          {addCategoryForm}
          <Link className="btn btn-success my-4" to="/admin/dashboard">
            Admin Home{" "}
          </Link>
        </div>
      </div>
    </Base>
  );
};
export default CreateCategory;
