const express = require("express");
var medicine = express.Router();
const {addMedicine,deleteMedicine} = require("../controller/medicine")

medicine.post("/addMedicine",addMedicine)
medicine.post("/deleteMedicine",deleteMedicine)

module.exports = medicine

