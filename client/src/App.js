import React from "react";
import './App.css';
import Nav from './components/Nav';
import Login from './components/Login';
import Projects from './components/Projects';
import Profiles from './components/Profiles';
import Homepage from './components/Homepage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';



function App() {
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
