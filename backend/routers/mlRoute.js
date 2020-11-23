const express = require("express");
var medRouter = express.Router();
const {getDisease} = require("../controller/mlRoute");

medRouter.get("/getdisease",getDisease);


module.exports = medRouter;