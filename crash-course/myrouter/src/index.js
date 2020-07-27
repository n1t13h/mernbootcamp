import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import User from './User';
import Visit from './Visit';
import NotFound from './notfound';
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";

const routing = (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/User">User</Link></li>
        <li><Link to="/Visit">Visit</Link></li>
        
      </ul>
    </div>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/user" component={User} />
      <Route path="/Visit" component={Visit} />
      <Route component={NotFound} />
    </Switch>
  </Router>
)
ReactDOM.render(
  routing,
  document.getElementById('root')
);


