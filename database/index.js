const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'hens'
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.post('/api/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const sqlInsert = "INSERT INTO profiles (username, password) VALUES(?, ?)";
    db.query(sqlInsert, [username, password], (err, result) => {
        if (err)
            res.send("error");
        if (result)
            res.send("success");
    });
})

app.listen(3001, () => {
    console.log("running on port 3001");

})