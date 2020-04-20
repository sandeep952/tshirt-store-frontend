import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategories, createProduct } from "./helper/adminPanel";

const AddProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    loading: false,
    error: "",
    createdProduct: "",
    didRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    loading,
    error,
    createdProduct,
    didRedirect,
    formData,
  } = values;
  const preload = () => {
    getCategories()
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, formData: new FormData(), categories: data });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preload();
  }, []);


  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, createdProduct:"" });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          stock: "",
          price: "",
          loading: false,
          error: "",
          formData:new FormData(),
          createdProduct: data.name,
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value,error:"",createdProduct:"" });
  };
  const successMessage = (
    <div
      className="alert alert-success"
      style={{ display: createdProduct ? "block" : "none" }}
    >
      <p>Product: {createdProduct} created successfully</p> 
     
    </div>
  );


  const errorMessage= (
    <div
    className="alert alert-danger"
    style={{ display: error ? "block" : "none" }}>
    {error}
    </div>
  )

  
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
        Create Product
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
        {createProductForm()}</div>
      </div>
    </Base>
  );
};

export default AddProduct;
