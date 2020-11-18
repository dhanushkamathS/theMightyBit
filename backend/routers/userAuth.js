const express = require("express");
var userAuth = express.Router();
const {login,signup , isSignedUp} = require("../controller/userAuth");

//signin route
userAuth.post("/login",login);

//signup route 
userAuth.post("/signup",isSignedUp, signup);

module.exports = userAuth;