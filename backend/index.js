const express = require('express');
const bodyParser = require('body-parser');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
require('dotenv').config();

const saltRounds = 10; // Password encryption configuration

// Connecting to the mysql database
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'hens'
})

//Dependencies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(session({
    key: "user",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60*60*24*3,
    }
}
))

// Handling registration post requests
app.post('/api/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const sqlInsert = `INSERT INTO profiles (username, password) VALUES(?, ?)`;

    // Encrypting the password from registration as hash
    bcrypt.hash(password, saltRounds, (err, hash) => { 
        if (err) {
            res.send("error");
        }
        // Try to insert the username and hash into database
        db.query(sqlInsert, [username, hash], (err, result) => {
            if (err)
                res.send("error");
            if (result)
                res.send("success");
        });
    })
})

// Handling login post requests
app.post('/api/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // Finding the profile of our login
    const sqlFindUser = `SELECT * FROM profiles WHERE username = ?`;
    db.query(sqlFindUser, [username], (err, result) => {
        if (err) {
            console.log("error" + err);
        } if (result.length > 0) {  // Make sure result wasn't null
            // Authenticating the password
            bcrypt.compare(password, result[0].password, (error, response) => {
                if (response) {
                    req.session.user = result;
                    res.send(result);
                } else {    // password was wrong
                    res.send("Wrong combination");
                }
            })
        } else {    // Result was null
            res.send("User doesn't exist")
        }
    })
})

// A GET request to check if the user is still logged in based on cookie expiry
app.get('/api/login', (req, res) => {
    if (req.session.user) {
        res.send({
            loggedIn: true,
            user: req.session.user  // Contains the user row information
        })
    } else {
        res.send({ loggedIn: false })
    }
})


app.get('/api/profiles', (req, res) => {
    const sqlGetProfiles = 'SELECT * FROM profiles ORDER BY username';
    db.query(sqlGetProfiles, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

app.post('/api/user', (req, res) => {
    const username = req.body.username;
    const sqlGetUser = 'SELECT * FROM profiles WHERE username = ?';
    db.query(sqlGetUser, [username], (err, result) => {
        if (err) {
            console.log("error" + err);
        } else {
            res.send(result);
        }
    })
})

app.listen(3001, () => {
    console.log("running on port 3001");

})