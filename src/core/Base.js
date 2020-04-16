import React from "react";
import Nav from "./Nav";
const Base = ({
  title = "My title",
  description = "My description",
  className = " bg-dark text-white p-4 my-4",
  children
}) => (
  <div>
    <Nav />

    <div className="container-fluid">
      <div className="jumbotron bg-dark text-white text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description} </p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer className="footer bg-dark mt-auto py-4 text-center">
      <div className="container-fluid bg-success text-white p-3">
        <h4>If you have any questions</h4>
        <button className="btn btn-danger btn-lg">Contact Us</button>
      </div>

      <div className="container">
        <span className="text-muted ">
          An amazing <span className="text-white">MERN</span> Bootcamp
        </span>
      </div>
    </footer>
  </div>
);

export default Base;
