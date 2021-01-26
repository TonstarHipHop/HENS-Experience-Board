import React, { useState, useEffect } from "react";
import Axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import '../App.css';

function User({ match }) {
  const [user, setUser] = useState({});
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [open, setOpen] = useState(false);

  // Fetch profile details on refresh
  useEffect(() => {
    console.log("hi");
    // Check if we are on our own profile and if we're logged in
    Axios.get("http://localhost:3001/api/login").then((response) => {
      if (response.data.loggedIn) {
        if (response.data.user[0].username === match.params.user) {
          setIsMyProfile(true);
        }
      }
    })

    //Retrieve data about the user to display
    Axios.post('http://localhost:3001/api/user', {
      username: match.params.user,
    }).then(response => {
      if (response.data.length > 0) { // Worked if user row was returned
        setUser(response.data[0]);
        delete user.username; // Hide sensitive information
        delete user.password;
      } else {  // There was some kind of error
        alert(response.data);
      }
    })
  }, [match.params.user, user.password, user.username])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function EditProfile() {
    return (
    <div>
      <IconButton color="primary" aria-label="edit profile"
        onClick = {handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Hello</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            <DeleteIcon/>
          </Button>
          <Button onClick={handleClose} color="primary">
            <CheckIcon/>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
  }

  return (
    <div>
      <h1>{match.params.user}</h1>
      <table>
        <tr>
          <td>Name</td>
          <td>{(user.name) ? user.name : "Unknown"}</td>
        </tr>
        <tr>
          <td>Course</td>
          <td>{(user.course) ? user.course : "Unknown"}</td>
        </tr>
        <tr>
          <td>Year</td>
          <td>{(user.year) ? user.year : "Unknown"}</td>
        </tr>
      </table>
      {(isMyProfile) ? EditProfile() : null}
    </div>
  );
}


export default User;
