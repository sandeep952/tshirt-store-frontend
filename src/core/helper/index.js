import API from "../../backend";
import React from "react";

export const getAllProducts = () => {
  return fetch(`${API}/products`)
    .then((res) => {
      return res.json();
    })
};

export const getProductPhoto = (productId) => {
  return (
    <img
      src={`${API}/product/photo/${productId}`}
      style={{ maxWidth: "100%", maxHeight: "100%" }}
    />
  );
};

export const addItemToCart = (product) => {
  if (window !== undefined) {
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({
      ...product,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const getItemsFromCart = () => {
  if (window !== undefined) {
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    return cart;
  }
};

export const removeItemFromCart = (productId) => {
  if (window !== undefined) {
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    let updatedCart = cart.filter((product) => product._id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }
};
