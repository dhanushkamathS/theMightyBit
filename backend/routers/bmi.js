const express = require("express");
var bmi = express.Router();
const {postBmi} = require("../controller/bmi")

bmi.post('/BMI',postBmi)
module.exports = bmi