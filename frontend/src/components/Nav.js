import React from "react";
import { Link } from 'react-router-dom';
import '../App.css';


function Nav() {

  const navStyle = { color: "white"};
  return (
    <nav>
        <h3>Logo</h3>
        <ul className="nav-links">
          <Link style={navStyle} to='/'>
            <li>Home</li>
          </Link>
          <Link style={navStyle} to='/login'>
            <li>Login</li>
          </Link>
          <Link style={navStyle} to='/profiles'>
            <li>Profiles</li>
          </Link>
          <Link style={navStyle} to='/projects'>
            <li>Projects</li>
          </Link>
        </ul>
    </nav>
  );
}

export default Nav;