import React, { useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import ProductCard from "./ProductCard";
import { useState } from "react";
import { getAllProducts, addItemToCart } from "./helper/index";
import LoadingSpinner from "./LoadingSpinner";

const Home = () => {
  const [values, setValues] = useState({
    products: [],
    error: "",
    loading: false,
  });

  const { products, error, loading } = values;
  const errorMessage = (
    <div
      className="alert alert-danger"
      style={{ display: error ? "block" : "none" }}
    >
      {error}
    </div>
  );

  useEffect(() => {
    setValues({
      ...values,
      loading: true,
    });
    getAllProducts()
      .then((data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            loading: false,
          });
        } else {
          setValues({
            ...values,
            products: data,
            loading: false,
          });
        }
      })
      .catch((err) => {
        setValues({
          ...values,
          error: err.message,
          loading: false,
        });
      });
  }, []);
  return (
    <Base title="The tshiRT store" description="Welcome to tshirt store">
      <LoadingSpinner loading={values.loading} />
      {errorMessage}
      <div className="row">
        {values.products.map((product) => (
          <ProductCard
            key={product._id}
            {...product}
            addtoCart={true}
            addItemToCart={addItemToCart.bind(this, product)}
          />
        ))}
      </div>
    </Base>
  );
};

export default Home;
