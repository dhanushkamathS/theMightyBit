var Datastore = require("nedb")
db = new Datastore({ filename: '../models/datafile', autoload: true });


exports.postBMI = (req,res) => {
    var username = req.body.username;
    //console.log(username);
    res.send("found");
    var userId ;
    db.find({ username: `${username}` }, function (err, docs) {
        if (err){
            res.status(400).json({err : `error occured ${err}`});
        }
       userId= docs[0]._id ;

       db.update({_id : `${userId}`},{$set : { age : `${req.body.age}`, weight : `${req.body.weight}`,height : `${req.body.height}`}},(err,updatedDocs) => {
        if (err){
            res.status(400).json({
                err : `error occured ${err}`
            })
        }
    });


       
      });
    
    /*
    db.update({username : `${username}`},{$set : { age : `${req.body.age}`, weight : `${req.body.weight}`,height : `${req.body.height}`}},(err,updatedDocs) => {
        if (err){
            res.status(400).json({
                err : `error occured ${err}`
            })
        }
    });
    */
    
};