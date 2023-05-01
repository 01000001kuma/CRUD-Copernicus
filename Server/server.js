const express = require('express');
const app = express();

// Connection to MongoDB

const archivoBD = require('./conection');

// Route to get all users

const  userSchema   = require('./route/user');

//import body parser

const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api/user', userSchema)

app.get('/', (req, res) => {
    res.end ('Hello World')
});

//server config

app.listen(5000, function(){
    console.log('server NODE is running on port 5000')
    });

