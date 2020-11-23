const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var medicineSchema = new Schema({
    medicine_name : {
        type: String,
        trim : true
    },
    no_pills : Number,
    times : [String]
})

module.exports = mongoose.model("Medicine",medicineSchema);