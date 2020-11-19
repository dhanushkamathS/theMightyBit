const express = require("express");
var userAuth = express.Router();
const {login,signup,addMedicine} = require("../controller/userAuth");

//signin route
userAuth.post("/login",login);

//signup route 
userAuth.post("/signup",signup);

userAuth.post("/addMedicine",addMedicine);

module.exports = userAuth;