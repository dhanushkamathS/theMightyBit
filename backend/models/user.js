const mongoose = require("mongoose");
const uuidv4 = require("uuid");
const crypto = require("crypto")
const Schema = mongoose.Schema;

var medicineSchema = new Schema({
    _id = mongoose.Types.ObjectId,
    medicine_name : {
        type: String,
        required : true,
        trim : true
    },
    pills_no : Number,
    times : [Date]
})

var userSchema = new Schema({
    _id : mongoose.ObjectId,
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
    medicines : []
});

userSchema.virtual("password")
        .set(function(password){
            this._password = password;
            this.salt = uuidv4();
            this.encryp_password = this.securePassword(password)
        })
        .get(function(){
            return this._password;
        });

userSchema.method = {

    authenticate : function(plainpassword){
        return this.securePassword(plainpassword) === this.encryp_password
    },
    securePassword : function(plainPassword){

        if(!plainPassword)
            return "";

        try{
            return crypto.createHmac("sha256",this.salt)
                .update(plainPassword)
                .digest("hex")
        }catch(err){
            return "Error"
        }
        
    }
}

module.exports = mongoose.model("User",userSchema);