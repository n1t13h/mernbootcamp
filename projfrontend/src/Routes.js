import React from 'react';
import {BrowserRouter,Route} from "react-router-dom";
import Home from "./core/Home";
import Signup from './user/Signup';
import Signin from './user/Signin';

const Routes = ()=>{
  return(
    <BrowserRouter>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/signup" component={Signup}></Route>
        <Route exact path="/signin" component={Signin}></Route>
    </BrowserRouter>
  )
}

export default Routes;