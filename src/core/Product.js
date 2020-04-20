import React from "react";
import { Link } from "react-router-dom";

const Product = ({ name, description, price, deleteProductHandler }) => (
  <div className="col-lg-4 col-md-6">
    <div className="card m-4">
      <img className="card-img-top" alt="img" src="..." />
      <div className="card-body">
        <h2 className="card-title" style={{ overflow: "hidden" }}>
          {name}
        </h2>
        <p className="card-text">{description}</p>
        <h5 className="display-5 ">$ {price}</h5>
        <button className="btn btn-success p-2 m-2">
          <Link className="text-white" to="admin/products/update">Update</Link>
        </button>
        <button
          className="btn btn-danger p-2 m-2"
          onClick={deleteProductHandler}>
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default Product;
