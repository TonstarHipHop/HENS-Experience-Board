import React, { useState } from "react";
import '../App.css';
import Axios from "axios";

function submitRegistration(username, password, confirmPassword) {
  if (password !== confirmPassword) {
    alert("Password not matching");
    return;
  }

  Axios.post('http://localhost:3001/api/register', {
    username: username,
    password: password
  }).then(response => {
    if (response.data === "error") {
      alert("Username taken")
    } else {
      alert("Successfully registered")
    }
  })
}

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div>
      <h1>Login</h1>
      <div className="form">
        <label>Username</label>
        <input type="text" name="username"/>
        <label>Password</label>
        <input type="text" name="password"/>
      </div>

      <h1>Register</h1>
      <div className="form">
        <label>Username</label>
        <input 
          type="text" name="username"
          onChange={(e) => {setUsername(e.target.value)}}
        />
        <label>Password</label>
        <input 
          type="text" name="password"
          onChange={(e) => {setPassword(e.target.value)}}
        />
        <label>Confirm Password</label>
        <input 
          type="text" name="confirmPassword"
          onChange={(e) => {setConfirmPassword(e.target.value)}}
        />
        <button onClick={() => submitRegistration(username, password, confirmPassword)}>
          Register
        </button>
      
      </div>
    </div>
  );
}

export default Login;