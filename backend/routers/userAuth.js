const express = require("express");
var userAuth = express.Router();
const {login,signup} = require("../controller/userAuth");

//signin route
userAuth.post("/login",login);

//signup route 
userAuth.post("/signup",signup);

module.exports = userAuth;