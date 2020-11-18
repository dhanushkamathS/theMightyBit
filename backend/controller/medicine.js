var Datastore = require('nedb');
db = new Datastore({ filename: '../models/datafile', autoload: true });


exports.addMedicine = (req,res) => {
    medicine = req.body
    db.insert(medicine,(err) => {
        if(err){
            return res.status(400).json({
                error : `error ${err} occured`
            })
        }
    })
};

exports.deleteMedicine = (req,res) => {
    medicinename = req.body.medicinename
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

}