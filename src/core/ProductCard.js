import React from "react";
import { getProductPhoto } from "./helper";

const ProductCard = ({
  _id,
  description,
  name,
  addtoCart = false,
  removeFromCart = false,
  price,
  addItemToCart,
  removeItemFromCart,
  className="col-md-4 my-2"
}) => {
  return (
    <div className={className}>
      <div className="card">
        {getProductPhoto(_id)}
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{description}</p>
          <h2>$ {price}</h2>
          <div
            className="btn btn-outline-success"
            style={{ display: addtoCart ? "block" : "none" }}
            onClick={addItemToCart}
          >
            Add to Cart
          </div>
          <div
            className="btn btn-outline-danger"
            style={{ display: removeFromCart ? "block" : "none" }}
            onClick={removeItemFromCart}
          >
            Remove from Cart
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
