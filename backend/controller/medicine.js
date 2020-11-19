<<<<<<< HEAD
console.log("working");
db = new Datastore({ filename: './models/datafile', autoload: true });
=======
var Datastore = require('nedb');
db = new Datastore({ filename: '../models/datafile', autoload: true });


exports.addMedicine = (req,res) => {
    medicine = req.body.medicine
    username = req.body.username
    db.update({username : `${username}`},{$addToSet : {medicines : `${medicine}`}},{},(err)=>{
        if(err){
            return res.status(400).json({
                error : `error ${err} occured`
            })
        }
    })
};

exports.deleteMedicine = (req,res) => {
    medicinename = req.body.medicine.medicinename
    username = req.body.username
    db.update({username : `${username}`},{$pull : {medicines : {medicinename : `${medicinename}`}}},{},(err) => {
        if(err){
            return res.status(400).json({
                error : `error ${err} occured`
            })
        }
    })
}

exports.updateMedicine = (req,res) => {
    medicinename = req.body.medicine.medicinename
    username = req.body.username
    medicine = req.body.medicine
    db.update({username : `${username}`},{$set : {medicines : `${medicine}`}},{},(err)=>{
        if(err){
            return res.status(400).json({
                error : `error ${err} occured`
            })
        }
    })
}
>>>>>>> 50eec8aaafde6458ff825954c86924299db8e1a4
