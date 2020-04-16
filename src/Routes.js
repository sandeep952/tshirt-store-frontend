import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home"
import Signup from "./user/Signnup";
import Signin from "./user/Signin";

export default function Routes() {
  
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup"  component={Signup} />
          <Route path="/signin"  component={Signin} />


        </Switch>
      </BrowserRouter>
    </div>
  );
}
