import React, { useState } from "react";
import '../App.css';
import Axios from "axios";
import Button from '@material-ui/core/Button';

Axios.defaults.withCredentials = true;

// The registeration component, maybe add email?
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
      <Button variant='contained'
        onClick={() => submitRegistration(username, password, confirmPassword)}> 
        Register
      </Button>
      
    </div>
  )
}

// Login component
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

// Called when the registration is clicked, and the input information is sent
function submitRegistration(username, password, confirmPassword) {
  if (password !== confirmPassword) { // Check if 2 passwords match
    alert("Password not matching");
    return;
  }

  // Post request to backend to add the new user to database
  Axios.post('http://localhost:3001/api/register', {
    username: username,
    password: password
  }).then(response => {      // See if it was succesfully entered into database
    if (typeof response.data === "object") { 
      alert("Successfully registered")
    } else {
      alert(response.data);
    }
  })
}

// Called when login button clicked
function submitLogin(username, password) {
  // Post request to backend to see if login information is correct
  Axios.post('http://localhost:3001/api/login', {
    username: username,
    password: password
  }).then(response => {
    if (typeof response.data === "object") { // Worked if user row was returned
      alert("Success");
    } else {  // There was some kind of error
      alert(response.data);
    }
  })
}

// Login page components put together
function Login() {
  return (
    <div>
      <LoginForm/>
      <RegisterForm/>
    </div>
  );
}

export default Login;