import React from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";

export default function AdminDashboard() {
  const SideBar = (
    <div className="card ">
      <h4 className="card-header text-white bg-dark">Admin nav</h4>
      <ul className="list-group ">
        <li className="list-group-item">
          <Link className="text-success nav-link" to="/admin/category/create">
            Create category
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="text-success nav-link" to="/admin/categories">
            Manage categories
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="text-success nav-link" to="/admin/product/create">
            Create product
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="text-success nav-link" to="/admin/products">
            Manage Product
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="text-success nav-link" to="">
            Manage orders
          </Link>
        </li>
      </ul>
    </div>
  );

  const Main = (
    <div className="card p-3 mb-4">
      <h3>Admin info</h3>
      <ul className="list-group">
        <li className="list-group-item">
          <span className="badge badge-success mr-2">Name :</span>{isAuthenticated().user.name}
        </li>
        <li className="list-group-item">
        <span className="badge badge-success mr-2">Email :</span>{isAuthenticated().user.email}
      </li>
      </ul>
    </div>
  );

  return (
    <Base
      title="Welcome to Admin dashboard"
      description="Manage all your products here!"
    >
      <div className="container bg-success p-4">
        <div className="row">
          <div className="col-md-3">{SideBar}</div>
          <div className="col-md-9">{Main}</div>
        </div>
      </div>
    </Base>
  );
}
