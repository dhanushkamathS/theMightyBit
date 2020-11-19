require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
var Datastore = require('nedb')
var jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const userAuth = require("./routers/userAuth");
const bmi = require("./routers/bmi");
const medicine = require("./routers/medicine");




mongoose.connect(process.env.DATABASE,
    {
        useNewUrlParser : true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        autoIndex: true,
        useFindAndModify: false
    }
).then(() => {
    console.log("DB CONNECTED");
})

const app = express();

app.use(cookieParser());
app.use(express.json());


app.use("/",userAuth);
app.use("/",bmi);




//server listening on some port 
app.listen(process.env.PORT,() => {
    console.log(`App running at ${process.env.PORT} ....`)
})