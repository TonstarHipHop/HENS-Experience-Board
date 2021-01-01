import React, { useEffect } from "react";
import './App.css';
import Nav from './components/Nav';
import Login from './components/Login';
import Projects from './components/Projects';
import Profiles from './components/Profiles';
import Homepage from './components/Homepage';
import User from './components/User';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Axios from "axios";
Axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path = "/" exact component={Homepage}/>
          <Route path = "/login" component={Login}/>
          <Route path = "/projects" component={Projects}/>
          <Route path = "/profiles" exact component={Profiles}/>
          <Route path = "/profiles/:user" component = {User}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
