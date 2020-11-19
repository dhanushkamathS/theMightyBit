require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
var Datastore = require('nedb')
var jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const userAuth = require("./routers/userAuth");
const bmi = require("./routers/bmi")

mongoose.connect(process.env.DATABASE,
    {
        useNewUrlParser : true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() => {
    console.log("DB CONNECTED");
})

const app = express();

app.use(cookieParser());
app.use(express.json());

//gaining access to the DB
db = new Datastore({ filename: 'models/datafile', autoload: true });


app.use("/",userAuth);
app.use("/")


//server listening on some port 
app.listen(process.env.PORT,() => {
    console.log(`App running at ${process.env.PORT} ....`)
})