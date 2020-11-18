const { json } = require("express");
const express = require("express");
const app = express()
require("dotenv").config();


app.get('/creators',(req,res) => {
    creators = {
        "Team name" : "theMightyBits",
        "creators"  : {
            "1" : "Abin",
            "2" : "Aditya",
            "3" : "Dhanush",
            "4" : "Sravya",
            "5" : "Udit" 
        }
    }
    res.send(creators)
})

app.listen(process.env.PORT,() => {
    console.log(`App running at ${process.env.PORT} ....`)
})