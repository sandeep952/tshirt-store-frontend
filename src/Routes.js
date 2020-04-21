import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home"
import Signup from "./user/Signnup";
import Signin from "./user/Signin";
import AdminRoute from "./auth/helper/AdminRoute";
import PrivateRoute from "./auth/helper/PrivateRoute";
import AdminDashboard from "./user/AdminDashboard";
import UserDashboard from "./user/UserDashboard";
import CreateCategory from "./admin/CreateCategory";
import ManageCategories from "./admin/ManageCategories";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";

export default function Routes() {
  
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup"  component={Signup} />
          <Route path="/signin"  component={Signin} />
          <AdminRoute path="/admin/dashboard"  component={AdminDashboard} />
          <PrivateRoute path="/user/dashboard"  component={UserDashboard} />
          <PrivateRoute path="/admin/category/create"  exact component={CreateCategory} />
          <PrivateRoute path="/admin/categories"  exact component={ManageCategories} />
          <PrivateRoute path="/admin/product/create"  exact component={AddProduct} />
          <PrivateRoute path="/admin/products"  exact component={ManageProducts} />
          <PrivateRoute path="/admin/product/update/:productId"  exact component={UpdateProduct} />

        </Switch>
      </BrowserRouter>
    </div>
  );
}
