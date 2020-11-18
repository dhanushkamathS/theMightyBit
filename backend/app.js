require("dotenv").config();
const express = require("express");
var Datastore = require('nedb')
var jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const userAuth = require("./routers/userAuth");


const app = express();

app.use(cookieParser());
app.use(express.json());

//gaining access to the DB
db = new Datastore({ filename: 'models/datafile', autoload: true });


app.use("/",userAuth);


//server listening on some port 
app.listen(process.env.PORT,() => {
    console.log(`App running at ${process.env.PORT} ....`)
})