require("dotenv").config();
var Datastore = require('nedb');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
db = new Datastore({ filename: './models/datafile', autoload: true });

//checks if the user aready exists before adding him to the DB
exports.isSignedUp = (req,res,next)=>{
  var user = req.body;
  console.log(typeof(user.username));
  db.find({username:`${user.username}`},function (err,docs){
    if(err) return res.send("err found");
    if(docs.length >0) res.send(`${user.username} already exist`);
    else next();
  });
}

//user signup route
exports.signup= (req,res)=>{
  var username = req.body.username;
  var name = req.body.name;
  var planePassword = req.body.password;
  console.log(name);
  // hash the plainPassword and stores hashedPassword in DB 
  bcrypt.hash(planePassword, saltRounds, function(err, hashedPassword) {
    if (err) {
      console.log(err);
      return res.send("something went wrong. try again");
    }
    
    var user ={
        name :`${name}`,
        username :`${username}`,
        hashedPassword :`${hashedPassword}`,
        age:null,
        height:null,
        weight:null,
        medicine :{}
    };

    //insert the user into the DB
    db.insert(user , function (err){
      if (!err) return res.send("added to db");
      return res.send("could not add");
      });  
  });
};



//login route
exports.login = (req,res)=>{
  const username = req.body.username;
  const plainPassword = req.body.password;

  db.find({username:`${username}`},function (err,docs){
    if(err) return res.send("err found");
    if(docs.length ==0) return res.send("user does not exist");

    bcrypt.compare(plainPassword, docs[0].hashedPassword, function(err, result) {
      if (err)  return res.send("something went wrong");
      
      if(result){
        const user = {id :docs[0]._id};
        jwt.sign(user,secret,(err,token)=>{
          if(!err) return res.json({token :token});
          else return res.send("something went wrong");
        })
        
      }
      else return res.send("user and password does not match");    
      });
  });
  
};

exports.isSignedIn = (req,res,next)=>{
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token,secret,(err,decoded)=>{
        if (!err) {
          req.userId = decoded.id;
          next()}
        else return res.send("not authorized");
  });
}


