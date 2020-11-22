const express = require("express");
var medRouter = express.Router();
const {addMedicine,updateMedicine,deleteMedicine,allMedicine,oneMedicine} = require("../controller/medicine");


medRouter.post("/addmedicine",addMedicine);


medRouter.post("/updatemedicine",updateMedicine);

medRouter.post("/deletemedicine",deleteMedicine);

medRouter.post("/allmedicine",allMedicine);

medRouter.post("/onemedicine",oneMedicine);




module.exports = medRouter;