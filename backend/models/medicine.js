const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var medicineSchema = new Schema({
    medicine_name : {
        type: String,
        required : true,
        trim : true
    },
    pills_no : Number,
    times : [Date]
})

module.exports = mongoose.model("Medicine",medicineSchema);