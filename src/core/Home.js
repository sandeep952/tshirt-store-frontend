import React, { useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import ProductCard from "./ProductCard";
import { useState } from "react";
import { getAllProducts, addItemToCart } from "./helper/index";

const Home = () => {
  const [values, setValues] = useState({
    products: [],
    error: "",
    loading: false,
  });

  useEffect(() => {
    setValues({
      ...values,
      loading: true,
    });
    getAllProducts().then((data) => {
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
    });
  }, []);
  return (
    <Base title="The tshiRT store" description="Welcome to tshirt store">
      <div className="row">
        {values.products.map((product) => (
          <ProductCard
            key={product._id}
            {...product}
            addtoCart={true}
            addItemToCart ={addItemToCart.bind(this,product)}
          />
        ))}
        {console.log(values.products)}
      </div>
    </Base>
  );
};

export default Home;
