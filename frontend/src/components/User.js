import React, {useEffect} from "react";
import Axios from 'axios';
import '../App.css';

function User({ match }) {

  // Everytime page refreshes, check if the user is still logged in
  useEffect(() => {
    Axios.get("http://localhost:3001/api/login").then((response) => {
      if (response.data.loggedIn === false) {
        console.log(false);
      } else {
        response.data.user[0].password = null;
        console.log(response.data.user[0]);
      }
    })
  }, []);
  return (
    <div>
      <h1>{match.params.user}</h1>
    </div>
  );
}

export default User;
