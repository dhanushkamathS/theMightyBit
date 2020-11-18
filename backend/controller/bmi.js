var Datastore = require("nedb")
db = new Datastore({ filename: '../models/datafile', autoload: true });


exports.postBMI = (res,req) => {
    var username = req.username
    db.update({username : `${username}`},{$set : { age : `${req.age}`, weight : `${req.weight}`,height : `${req.height}`}},{},(err,updatedDocs) => {
        if (err){
            res.status(400).json({
                err : `error occured ${err}`
            })
        }
    });
};