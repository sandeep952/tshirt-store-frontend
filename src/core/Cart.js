import React from "react";
import Base from "./Base";
import { useState } from "react";
import { useEffect } from "react";
import { getItemsFromCart, removeItemFromCart } from "./helper";
import ProductCard from "./ProductCard";
const Cart = () => {
  const [values, setValues] = useState({
    products: [],
    total: 0,
    reload:false
  });

  const calculatePrice = (cart_products) => {
    let total = 0;
    cart_products.forEach((product) => {
      total += product.price;
    });
    return total;
  };

  const removeThisItemFromCart = (productId)=>{
    removeItemFromCart(productId)
    setValues({
      ...values,
      reload:true
    })
  }
  useEffect(() => {
    let cart_products = getItemsFromCart();
    setValues({
      products: cart_products,
      total: calculatePrice(cart_products),
      reload:false
    });
  }, [values.reload]);

  return (
    <Base title="Cart Page" description="Manage your cart">
      {console.log(values)}
      <div className="row">
        <div className="col-md-6">
          <div className="row">
            {values.products.map((product) => (
              <ProductCard
                key={product._id}
                {...product}
                removeFromCart={true}
                removeItemFromCart={removeThisItemFromCart.bind(this,product._id)}
                className="col-md-8 offsett-md-2 my-2"
              />
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <div className="text-white">
          <h3 className="display-4">Your total is : {values.total}</h3>
          </div>
        </div>
      </div>
    </Base>
  );
};
export default Cart;
