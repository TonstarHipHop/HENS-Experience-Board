import React, { useState } from "react";
import '../App.css';
import Axios from "axios";

Axios.defaults.withCredentials = true;

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <div className="form">
      <h1>Register</h1>
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
  )
}

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="form">
      <h1>Login</h1>
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
      <button onClick={() => submitLogin(username, password)}>
        Login
      </button>
    </div>
  )
}

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

function submitLogin(username, password) {
  Axios.post('http://localhost:3001/api/login', {
    username: username,
    password: password
  }).then(response => {
    if (typeof response.data === "object") {
      alert("Success");
    } else {
      alert(response.data);
    }
  })
}

function Login() {
  return (
    <div>
      <LoginForm/>
      <RegisterForm/>
    </div>
  );
}

export default Login;