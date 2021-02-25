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
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../App.css';


function User({ match }) {
  const [user, setUser] = useState({});
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [isSaving, setSaving] = useState(false);
  const [isLoading, setLoading] = useState(true);
  
  // Fetch profile details on refresh
  useEffect(() => {
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
      setLoading(false);
      if (response.data.length > 0) { // Worked if user row was returned
        setUser(response.data[0]);
      } else {  // There was some kind of error
        alert(response.data);
      }
    })
  }, [match.params.user])
  


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveChanges = () => {
    setSaving(true);
    if (name) user.name = name;
    if (course) user.course = course;
    if (year) user.year = year;
    Axios.post('http://localhost:3001/api/user', {
      username: match.params.user,
      user: user
    }).then(response => {
      handleClose();
      setSaving(false);
      alert(response.data)
    })

  }

  // Profile page layout
  return (
    <div>
      <h1>{match.params.user}</h1>
      <table>
        <tr>
          <td>Name</td>
          <td><Details info={user.name} /></td>
        </tr>
        <tr>
          <td>Course</td>
          <td><Details info={user.course} /></td>
        </tr>
        <tr>
          <td>Year</td>
          <td><Details info={user.year} /></td>
        </tr>
      </table>
      {(isMyProfile) ? EditProfile() : null}
    </div>
  );

  // Edit Profile Pop Up that only appears if user is logged in
  function EditProfile() {
    return (
    <form>
      <IconButton color="primary" aria-label="edit profile"
        onClick = {handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
        <DialogContent>
        <TextField style={{ margin: 20}} size="small" variant="outlined"
          label="Name" defaultValue={user.name}
          onChange = { (e) => {setName(e.target.value)}}
        />
        <TextField style={{ margin: 20}} size = "small" variant="outlined"
          label="Course" defaultValue={user.course}
          onChange = { (e) => {setCourse(e.target.value)}}
        />
        <TextField style={{ margin: 20}} size = "small" variant="outlined"
          label="Year" defaultValue={user.year}
          onChange = { (e) => {setYear(e.target.value)}}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            <DeleteIcon/>
          </Button>
          <SaveChangesButton />
        </DialogActions>
      </Dialog>
    </form>
    )
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

  // Singular profile detail component (shows loading circle if not loaded)
  function Details(props) {
    if (isLoading) {
      return (<CircularProgress size={20} />)
    } else if (props.info) {
      return props.info;
    } else {
      return "Unknown";
    }
  }
}



export default User;
