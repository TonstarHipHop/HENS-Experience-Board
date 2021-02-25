import React, { useState } from "react";
import '../App.css';
import Axios from "axios";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
Axios.defaults.withCredentials = true;

// The registeration component, maybe add email?
function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [isSaving, setSaving] = useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const saveChanges = () => {
    if (!username || !password || !name) {
      alert("missing fields");
      return;
    } else if (password !== confirmPassword) {
      alert("Passwords not matching");
      return;
    }
    setSaving(true);
    Axios.post('http://localhost:3001/api/register', {
      username: username,
      password: password,
      name: name,
      course: course,
      year: year
    }).then(response => {      // See if it was succesfully entered into database
      handleClose();
      setSaving(false);
      if (typeof response.data === "object") { 
        alert("Successfully registered")
      } else {
        alert(response.data);
      }
    })
  }

  // Loading circle when saving, Check icon when not
  function SaveChangesButton(props) {
    if (isSaving) {
      return (<CircularProgress size={30}/>)
    } else {
      return (
        <Button onClick={saveChanges} color="primary">
          <CheckIcon/>
        </Button>)
    }
  }

  return (
    <div>
      <h1 style={{fontFamily:"Arial", fontSize:"16px"}}>
        New here? <Button onClick={handleClickOpen}>Register</Button>
      </h1>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
        <DialogContent>
        <TextField style={{ margin: 20}} size="small" variant="outlined"
          label="Username" onChange = { (e) => {setUsername(e.target.value)}}
        />
        <TextField style={{ margin: 20}} size="small" variant="outlined"
          label="Name" onChange = { (e) => {setName(e.target.value)}}
        />
        <TextField style={{ margin: 20}} size="small" variant="outlined"
          label="Password" onChange = { (e) => {setPassword(e.target.value)}}
        />
        <TextField style={{ margin: 20}} size = "small" variant="outlined"
          label="Course" onChange = { (e) => {setCourse(e.target.value)}}
        />
        <TextField style={{ margin: 20}} size="small" variant="outlined"
          label="Confirm Password" onChange = { (e) => {setConfirmPassword(e.target.value)}}
        />
        <TextField style={{ margin: 20}} size = "small" variant="outlined"
          label="Year" onChange = { (e) => {setYear(e.target.value)}}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            <DeleteIcon/>
          </Button>
          <SaveChangesButton />
        </DialogActions>
      </Dialog>
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
      <Grid container spacing={1} justify="center" alignItems="center">
        <Grid item xs={12} >
          <TextField id="outlined-basic" label="Username" variant="outlined"
            onChange={(e) => {setUsername(e.target.value)}} size='small'/>
        </Grid>
        <Grid item xs={12}/><Grid item xs={12}/><Grid item xs={12}/>
        <Grid item xs={12}/><Grid item xs={12}/><Grid item xs={12}/>
        <Grid item xs={12}>
          <TextField id="outlined-basic" label="Password" variant="outlined"
            onChange={(e) => {setPassword(e.target.value)}} size='small'/>
        </Grid>
        <Grid item xs={12}/><Grid item xs={12}/><Grid item xs={12}/>
        <Grid item xs={12}/><Grid item xs={12}/><Grid item xs={12}/>
        <Grid item xs={12}/><Grid item xs={12}/>
        <Grid item xs={12}>
          <Button variant='contained'
            onClick={() => submitLogin(username, password)}> 
            Login
          </Button>
        </Grid>
      </Grid>
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