import React from 'react';
import {BrowserRouter,Route} from "react-router-dom";
import Home from "./core/Home";
const Routes = ()=>{
  return(
    <BrowserRouter>
        <Route exact path="/" component={Home}></Route>
    </BrowserRouter>
  )
}

export default Routes;