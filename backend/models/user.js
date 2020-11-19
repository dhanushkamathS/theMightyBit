const mongoose = require("mongoose");
const uuidv4 = require("uuid/v4");
const crypto = require("crypto")
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

var userSchema = new Schema({
    name : {
        type: String,
        required : true,
        trim : true
    },
    salt : String,
    encryp_password : {
        type : String ,
        required : true
    },
    weight : Number,
    age : Number,
    height : Number,
    medicines : [medicineSchema]
});

userSchema
  .virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = uuidv4();
    this.encry_password = this.securePassword(password);
  })
  .get(function() {
    return this._password;
  });

userSchema.methods = {
  autheticate: function(plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },

  securePassword: function(plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  }
};


module.exports = mongoose.model("User",userSchema);