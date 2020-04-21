import React, { useState } from "react";
import Base from "../core/Base";
import { getProducts, deleteProduct } from "./helper/adminPanel";
import { useEffect } from "react";
import Product from "../core/Product";
import LoadingMessage from "../core/LoadingSpinner";

const ManageProducts = () => {
  const [values, setValues] = useState({
    products: [],
    error: "",
    loading: false,
  });

  const preloadProducts = () => {
    setValues({
      ...values,
      loading: true,
    });
    
    getProducts()
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          setValues({ ...values, products: data, loading: false });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    preloadProducts();
  }, []);

  const deleteThisProduct = (id) => {
    setValues({ ...values, error: "", loading: true });
    //make delete request

    deleteProduct(id).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        //product deleted from server database
        //So delete product from state
        let products = [...values.products];
        products = products.filter((product) => product._id !== id);
        setValues({
          ...values,
          products,
          loading: false,
        });
      }
    })
    .catch((err)=>{
        console.log(err)
    })
  }
  return (
    <Base
      title="Manage Products"
      description="Manage your products here"
      className="container"
    >
      <LoadingMessage loading={values.loading} />
      <div className="row">
        {values.products.map((product) => {
          return (
            <Product
              key={product._id}
              productId={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              deleteProductHandler={deleteThisProduct.bind(this, product._id)}
            />
          );
        })}
      </div>
    </Base>
  );
};

export default ManageProducts;
