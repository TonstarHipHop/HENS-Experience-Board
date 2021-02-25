import React, { useState, useEffect } from "react";
import '../App.css';
import Axios from "axios";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import {Link} from 'react-router-dom';
import dp from '../dp.png';


function Profiles() {
  const [Users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get users on refresh
  useEffect(() => {
    fetchUsers();
  }, []);
  
  function fetchUsers() {
    Axios.get('http://localhost:3001/api/profiles').then((response) => {
      setUsers(response.data);
      setIsLoading(false);
    })
  }

  return (
    <div>
      <Backdrop open={isLoading}>
        <CircularProgress />
      </Backdrop>
      <h1>Profiles</h1>
      <Grid container spacing={3}>
        { Users.map(user => (
          <Grid item xs={3}>
            <Card>
              <CardHeader avatar={
                <Avatar alt={user.username} src={dp} />
                }
                title={<Link to={`/profiles/${user.username}`}>{user.username}</Link>}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
  
}

export default Profiles;
