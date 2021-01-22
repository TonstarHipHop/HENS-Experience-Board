import React, { useEffect, useState} from "react";
import Axios from 'axios';
import '../App.css';

function User({ match }) {
  const [user, setUser] = useState({});
  useEffect(() => {
    // // Everytime page refreshes, check if the user is still logged in
    // Axios.get("http://localhost:3001/api/login").then((response) => {
    //   if (response.data.loggedIn === false) {
    //     console.log(false);
    //   } else {
    //     response.data.user[0].password = null;
    //     console.log(response.data.user[0]);
    //   }
    // })

    // Retrieve data about the user to display
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
  }, []);

  return (
    <div>
      <h1>{match.params.user}</h1>
      <ul>
        <li> Name: {(user.name) ? user.name : "Unknown"}</li>
        <li> Course: {(user.course) ? user.course : "Unknown"}</li>
        <li> Year: {(user.year) ? user.year : "Unknown"}</li>
      </ul>
    </div>
  );
}

export default User;
