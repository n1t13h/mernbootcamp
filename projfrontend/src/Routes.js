import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from './user/Signup';
import Signin from './user/Signin';
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
const Routes = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/signup" component={Signup}></Route>
      <Route exact path="/signin" component={Signin}></Route>
      <PrivateRoute exact path="/user/dashboard" component={UserDashBoard}></PrivateRoute>
      <AdminRoute exact path="/admin/dashboard" component={AdminDashBoard}></AdminRoute>
    </BrowserRouter>
  )
}

export default Routes;