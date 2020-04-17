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
          <PrivateRoute path="/admin/category/create"  component={CreateCategory} />

        </Switch>
      </BrowserRouter>
    </div>
  );
}
