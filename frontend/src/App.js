import React, { useEffect } from "react";
import './App.css';
import Nav from './components/Nav';
import Login from './components/Login';
import Projects from './components/Projects';
import Profiles from './components/Profiles';
import Homepage from './components/Homepage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Axios from "axios";
Axios.defaults.withCredentials = true;

function App() {

  useEffect(() => {
    Axios.get("http://localhost:3001/api/login").then((response) => {
      if (response.data.loggedIn === false) {
        console.log(false);
      } else {
        response.data.user[0].password = null;
        console.log(response.data.user[0]);
      }
    })
  }, []);
 
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path = "/" exact component={Homepage}/>
          <Route path = "/login" component={Login}/>
          <Route path = "/profiles" component={Profiles}/>
          <Route path = "/projects" component={Projects}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
