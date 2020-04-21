import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategories, updateProduct, getProduct } from "./helper/adminPanel";

const UpdateProduct = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categoryId:"",
    loading: false,
    error: "",
    updatedProduct: "",
    formData: new FormData(),
  });

  const [categories,setCategories] = useState([])

  const {
    name,
    description,
    price,
    stock,
    categoryId,
    loading,
    error,
    updatedProduct,
    formData,
  } = values;


  const preloadCategories = () => {
    console.log("[preload categories]")
    getCategories()
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setCategories([...data]);
        }
      })
      .catch((err) => console.log(err));
  };

  const preloadProduct = (productId) => {
    console.log("[preload prod]")
    setValues({ ...values, error: "", loading: true });
    getProduct(productId)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          console.log(data)
          let productFormData = new FormData()
          productFormData.set("name",data.name)
          productFormData.set("description",data.description)
          productFormData.set("price",data.price)
          productFormData.set("stock",data.stock)
          
          setValues({
            ...values,
            name: data.name,
            description: data.description,
            stock: data.stock,
            price: data.price,
            categoryId: data.category._id,
            formData: productFormData,
            loading: false,
          });

        }
      })
      .catch((err) => {
        console.log(err);
        setValues({ ...values, error: err, loading: false });
      });
  };

  useEffect(() => {
    preloadProduct(match.params.productId);
    preloadCategories()
  }, []);


  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateProduct(match.params.productId,formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, updatedProduct: "" });
      } else {
        console.log(data)
        setValues({
          ...values,
          name: "",
          description: "",
          stock: "",
          price: "",
          loading: false,
          error: "",
          formData: new FormData(),
          updatedProduct: data.name,
          categoryId:""
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, error: "", updatedProduct: "" });
  };

  const successMessage = (
    <div
      className="alert alert-success"
      style={{ display: updatedProduct ? "block" : "none" }}
    >
      <p>Product: {updatedProduct} updated successfully</p>
    </div>
  );

  const errorMessage = (
    <div
      className="alert alert-danger"
      style={{ display: error ? "block" : "none" }}
    >
      {error}
    </div>
  );

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>

      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories.map((category) => (
            <option value={category._id} key={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Update Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add a product here!"
      description="Welcome to product creation section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white ">
        <div className="col-md-8 offset-md-2">
          {errorMessage}
          {successMessage}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateProduct;
