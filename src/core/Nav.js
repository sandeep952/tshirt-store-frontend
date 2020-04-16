import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper";

const activeTab = (history, path) => {
  //if active tab
  if (history.location.pathname === path) {
    return { color: " #45CE30" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Nav = ({ history }) => (
  <div>
    <ul className="nav nav-tabs bg-dark">
      <li className="nav-item">
        <Link className="nav-link" style={activeTab(history, "/")} to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link"
          style={activeTab(history, "/dashboard")}
          to="/dashboard">
        
          Dashboard
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link"
          style={activeTab(history, "/cart")}
          to="/cart">
        
          Cart
        </Link>
      </li>
      <li className="nav-item">
        {isAuthenticated() && (
          <span
            className="nav-link text-warning"
            onClick={() =>
              signout(() => {
                history.push("/");
              })
            }>
          
            Signout
          </span>
        )}
      </li>

      {!isAuthenticated() && (
        <Fragment>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={activeTab(history, "/signin")}
              to="/signin">
            
              Signin
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              style={activeTab(history, "/cart")}
              to="/signup">
            
              Sign up
            </Link>
          </li>
        </Fragment>
      )}
    </ul>
  </div>
);
export default withRouter(Nav);
