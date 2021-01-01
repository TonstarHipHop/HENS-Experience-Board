import React, { useState, useEffect } from "react";
import '../App.css';
import Axios from "axios";
import {Link} from 'react-router-dom';


function Profiles() {

  useEffect(() => {
    fetchUsers();
  }, []);
  
  const [Users, setUsers] = useState([]);
  function fetchUsers() {
    
    Axios.get('http://localhost:3001/api/profiles').then((response) => {
      setUsers(response.data);
    })
  }

  return (
    <div>
      <h1>Profiles</h1>
      { Users.map(user => (
        <h3 key={user.username}>
          <Link to={`/profiles/${user.username}`}>{user.username}</Link>
        </h3>
      ))}
    </div>
  );
}

export default Profiles;
